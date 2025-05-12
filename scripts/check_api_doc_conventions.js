const fs = require('fs');
const path = require('path');
// const matter = require('gray-matter'); // No longer needed directly here, used in markdownFileChecks.js

// Import from new modules
const { 
    VITEPRESS_DOCS_DIR,
    SIYUAN_REPO_PATH,
    ROUTER_GO_PATH,
    KERNEL_API_DOCS_MD_DIR,
    SEVERITY 
} = require('./scriptConfig');

const { 
    logMessage,
    getNodeTextContent, // This is passed to checkFile, so it's needed here to be part of utilities
    walkDir,
    // Removed: convertKebabToCamel,
    // Removed: convertKebabToPascal,
    // COMMON_ABBREVIATIONS // Might not be needed directly here, but good to know it's available
} = require('./scriptUtils');

const { getDefinedApis } = require('./routerGoParser');
const { checkFile } = require('./markdownFileChecks'); // checkFrontmatter removed as it was part of markdownFileChecks

const targetFiles = process.argv.slice(2);

// Function to check API doc structure
async function checkApiMarkdownFileStructure(allDefinedApis, definedApisByCategory, basePath, utils) {
    const { logMessage, SEVERITY, walkDir, convertKebabToCamel } = utils; // Added convertKebabToCamel from utils
    // const foundMarkdownFiles = new Set(); // No longer needed
    const orphanedDocs = [];
    const missingDocs = new Set(allDefinedApis); // Start with all APIs as missing

    if (!fs.existsSync(basePath)) {
        logMessage(basePath, null, `Kernel API docs directory not found: ${basePath}. Skipping structure check.`, SEVERITY.ERROR);
        return { missingDocs: Array.from(missingDocs), orphanedDocs };
    }

    logMessage(basePath, null, `Checking Kernel API Markdown file structure in: ${basePath} (Strict Matching)`, SEVERITY.INFO);

    walkDir(basePath, (filePath) => {
        if (path.extname(filePath).toLowerCase() !== '.md') return;

        const relativePath = path.relative(basePath, filePath);
        let dirFromFile = path.dirname(relativePath).replace(/\\/g, '/'); // e.g., 'ai', 'block'
        const baseName = path.basename(relativePath, '.md'); // This is the raw endpoint name from file

        if (baseName.toLowerCase() === 'index' || baseName.toLowerCase() === 'ainote') {
            // logMessage(filePath, null, `Skipping meta file: ${relativePath}`, SEVERITY.INFO);
            // For AInote.md, we still want to remove it from missingDocs if it matches a convention by chance, but don't treat as orphaned if not.
            // However, router.go will never define an API endpoint named 'AInote', so it's safe to just skip.
            return;
        }

        let matchedApi = null;
        let candidates = [];

        if (dirFromFile && dirFromFile !== '.') { // File is in a subdirectory (category)
            candidates.push(`/api/${dirFromFile}/${baseName}`);
            candidates.push(`/ws/${dirFromFile}/${baseName}`);
        } else { // File is directly under KERNEL_API_DOCS_MD_DIR
            candidates.push(`/api/${baseName}`);
            candidates.push(`/ws/${baseName}`);
        }

        for (const candidate of candidates) {
            if (allDefinedApis.has(candidate)) {
                matchedApi = candidate;
                break;
            }
        }

        if (matchedApi) {
            missingDocs.delete(matchedApi);
        } else {
            // With strict matching, any non-matched non-meta file is an orphan
            orphanedDocs.push({ file: filePath, attemptedName: baseName }); 
        }
    });

    if (missingDocs.size > 0) {
        logMessage(basePath, null, `Missing ${missingDocs.size} Kernel API document(s) for defined APIs:`, SEVERITY.ERROR);
        Array.from(missingDocs).sort().forEach(apiPath => {
            console.error(`  - ${apiPath}`);
        });
    } else {
        logMessage(basePath, null, 'All defined Kernel APIs have corresponding documentation files (Strict Match).', SEVERITY.SUCCESS);
    }

    if (orphanedDocs.length > 0) {
        logMessage(basePath, null, `Found ${orphanedDocs.length} orphaned Kernel API document(s) (Strict Match - filename does not match any API endpoint):`, SEVERITY.WARNING);
        orphanedDocs.sort((a,b) => a.file.localeCompare(b.file)).forEach(doc => {
            console.warn(`  - ${doc.file} (Filename: ${doc.attemptedName})`);
        });
    }

    return { missingDocs: Array.from(missingDocs), orphanedDocs };
}


(async () => {
    // Ensure KERNEL_API_DOCS_MD_DIR exists
    if (!fs.existsSync(KERNEL_API_DOCS_MD_DIR)) {
        try {
            fs.mkdirSync(KERNEL_API_DOCS_MD_DIR, { recursive: true });
            logMessage(KERNEL_API_DOCS_MD_DIR, null, `Created directory: ${KERNEL_API_DOCS_MD_DIR}`, SEVERITY.INFO);
        } catch (err) {
            logMessage(KERNEL_API_DOCS_MD_DIR, null, `Failed to create directory: ${KERNEL_API_DOCS_MD_DIR}. Error: ${err.message}`, SEVERITY.ERROR);
            // Exit or handle error appropriately if directory creation fails
            console.error('Exiting due to failure in creating essential directory.');
            process.exit(1);
        }
    }

    const utils = {
        logMessage,
        getNodeTextContent,
        SEVERITY,
        walkDir,
        // Removed: convertKebabToCamel,
        // Removed: convertKebabToPascal
    };

    logMessage(ROUTER_GO_PATH, null, `Attempting to read API definitions from: ${ROUTER_GO_PATH}`, SEVERITY.INFO);
    const { allDefinedApis, definedApisByCategory } = await getDefinedApis(ROUTER_GO_PATH);

    if (allDefinedApis.size > 0) {
        logMessage(ROUTER_GO_PATH, null, `Successfully parsed ${allDefinedApis.size} API definitions from ${Object.keys(definedApisByCategory).length} categories.`, SEVERITY.INFO);
        
        // 2. Perform Kernel API Markdown file structure check
        await checkApiMarkdownFileStructure(allDefinedApis, definedApisByCategory, KERNEL_API_DOCS_MD_DIR, utils);
    } else {
        logMessage(ROUTER_GO_PATH, null, 'No API definitions found or router.go could not be read. Skipping API-specific checks.', SEVERITY.WARNING);
    }

    // 3. Generic Markdown file checks (for files passed as arguments or all in VITEPRESS_DOCS_DIR)
    let filesToCheck = [];
    if (targetFiles.length > 0) {
        targetFiles.forEach(fileArg => {
            const fullPath = path.resolve(fileArg);
            if (fs.existsSync(fullPath)) {
                if (fs.statSync(fullPath).isDirectory()) {
                    logMessage(fullPath, null, `Scanning directory: ${fileArg}`, SEVERITY.INFO);
                    walkDir(fullPath, (filePath) => {
                        if (path.extname(filePath).toLowerCase() === '.md') {
                            filesToCheck.push(filePath);
                        }
                    });
                } else if (path.extname(fullPath).toLowerCase() === '.md') {
                    filesToCheck.push(fullPath);
                } else {
                    logMessage(fullPath, null, `Skipping non-Markdown file: ${fileArg}`, SEVERITY.INFO);
                }
            } else {
                logMessage(fileArg, null, `File not found: ${fileArg}`, SEVERITY.ERROR);
            }
        });
    } else {
        logMessage(VITEPRESS_DOCS_DIR, null, `No specific files provided. Searching for all .md files in ${VITEPRESS_DOCS_DIR}...`, SEVERITY.INFO);
        walkDir(VITEPRESS_DOCS_DIR, (filePath) => {
            if (path.extname(filePath).toLowerCase() === '.md') {
                filesToCheck.push(filePath);
            }
        });
    }

    if (filesToCheck.length === 0) {
        const searchScope = targetFiles.length > 0 ? "provided arguments" : VITEPRESS_DOCS_DIR;
        logMessage(null, null, `No Markdown files found to check based on ${searchScope}.`, SEVERITY.WARNING);
    }

    const utilitiesForCheckFile = {
        logMessage,
        getNodeTextContent,
        SEVERITY
    };
    let totalErrors = 0;
    let totalWarnings = 0;

    for (const filePath of filesToCheck) {
        try {
            // Skip frontmatter title check for AInote.md files
            const skipTitleCheck = path.basename(filePath).toLowerCase() === 'ainote.md';
            const { errors, warnings } = await checkFile(filePath, utilitiesForCheckFile, skipTitleCheck);
            totalErrors += errors;
            totalWarnings += warnings;
        } catch (error) {
            logMessage(filePath, null, `[FATAL] Error processing file ${filePath}: ${error.message}`, SEVERITY.ERROR);
            console.error(error.stack); 
            totalErrors++;
        }
    }
    console.log(`\nMarkdown content convention check finished. Total Errors: ${totalErrors}, Total Warnings: ${totalWarnings}.`);
})(); 