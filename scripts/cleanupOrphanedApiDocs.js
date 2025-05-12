const fs = require('fs-extra');
const path = require('path');

const { KERNEL_API_DOCS_MD_DIR, ROUTER_GO_PATH, SIYUAN_REPO_PATH } = require('./scriptConfig');
const { getDefinedApis } = require('./routerGoParser');
const { walkDir } = require('./scriptUtils');

async function cleanupOrphanedDocs() {
    console.log('Starting cleanup of orphaned API Markdown documents...');

    const { allDefinedApis: apiSet, definedApisByCategory } = await getDefinedApis(ROUTER_GO_PATH);
    // ^ Renamed to apiSet to avoid confusion in the next step if we weren't careful.

    const allDefinedApiPathsForMatching = new Set();
    // Store defined APIs in a way that's easy to check against. 
    // Format: category/apiName (e.g., "block/getBlockInfo")
    apiSet.forEach(apiPathString => { // Use the destructured 'apiSet' (which is allDefinedApis from parser)
        // apiPathString is like "/api/block/getBlockInfo" or "/ws/block/getBlockInfo"
        const parts = apiPathString.split('/');
        if (parts.length >= 4) { // e.g., ["", "api", "category", "apiName"]
            const category = parts[2];
            const apiName = parts[3];
            allDefinedApiPathsForMatching.add(`${category}/${apiName}`);
        }
    });

    if (allDefinedApiPathsForMatching.size === 0 && apiSet.size > 0) {
        console.error('Error: No API paths could be parsed for matching. Check API definition parsing logic inside cleanup script.');
        return;
    }
    console.log(`Found ${allDefinedApiPathsForMatching.size} unique API paths from router.go for matching (format: category/apiName).`);

    const orphanedFiles = [];

    await walkDir(KERNEL_API_DOCS_MD_DIR, async (filePath) => {
        if (path.extname(filePath).toLowerCase() !== '.md') {
            return;
        }
        const fileName = path.basename(filePath);
        if (fileName.toLowerCase() === 'index.md' || fileName.toLowerCase() === 'ainote.md') {
            return;
        }
        const relativePath = path.relative(KERNEL_API_DOCS_MD_DIR, filePath);
        const parts = relativePath.split(path.sep);
        if (parts.length < 2) {
            return;
        }
        const category = parts[parts.length - 2];
        const apiNameFromFile = path.basename(fileName, '.md');
        const keyToMatch = `${category}/${apiNameFromFile}`;

        if (!allDefinedApiPathsForMatching.has(keyToMatch)) {
            orphanedFiles.push(filePath);
        }
    });

    if (orphanedFiles.length > 0) {
        console.log(`
Found ${orphanedFiles.length} orphaned API document(s) to delete:`);
        for (const fileToDelete of orphanedFiles) {
            try {
                await fs.remove(fileToDelete);
                console.log(`  DELETED: ${path.relative(process.cwd(), fileToDelete)}`);
            } catch (err) {
                console.error(`  ERROR deleting ${fileToDelete}: ${err.message}`);
            }
        }
        console.log('\nCleanup complete.');
    } else {
        console.log('\nNo orphaned API documents found. Everything looks clean!');
    }
}

cleanupOrphanedDocs().catch(err => {
    console.error('Error during cleanup process:', err);
}); 