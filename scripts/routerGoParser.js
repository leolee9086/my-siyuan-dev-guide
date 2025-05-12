const fs = require('fs');
const path = require('path');

// This module will depend on SIYUAN_REPO_PATH from scriptConfig.js, 
// which should be passed to getDefinedApis or set globally if this script is run standalone.

function cleanApiPath(apiPath) {
    if (!apiPath) return '';
    let cleanedPath = apiPath.trim().replace(/\/:[^/]+/g, '').replace(/\/\*[^/]+/g, '');
    if (cleanedPath.endsWith('/') && cleanedPath.length > 1) {
       cleanedPath = cleanedPath.slice(0, -1);
    }
    if (cleanedPath === '/api' || cleanedPath === '/ws') {
        return '';
    }
    return cleanedPath;
}

async function getDefinedApis(routerGoFilePath, siyuanRepoPath) { // Added siyuanRepoPath for context in error messages
    let content = '';
    let sourceDesc = `local file ${path.basename(routerGoFilePath)}`;
    const allDefinedApis = new Set();
    const definedApisByCategory = {};
    const apiRegex = /^\s*ginServer\.(?:Handle|Any|GET|POST|PUT|DELETE|PATCH)\(s*"[^"]+",\s*"(\/+(?:api|ws)\/[^"' +,]+)"/;

    try {
        content = fs.readFileSync(routerGoFilePath, 'utf-8');
        const lines = content.split('\n');

        for (const line of lines) {
            if (line.trim().startsWith('//') || line.trim() === '') {
                continue;
            }
            const match = line.match(apiRegex);
            if (match && match[1]) {
                const rawApiPath = match[1];
                const cleanedPath = cleanApiPath(rawApiPath);
                if(cleanedPath) {
                    allDefinedApis.add(cleanedPath);
                    const parts = cleanedPath.split('/');
                    let category = 'uncategorized';
                    if (parts.length > 2 && (parts[1] === 'api' || parts[1] === 'ws')) {
                        category = parts[2];
                    } else if (parts.length === 2 && parts[1] === 'ws') {
                        category = 'websocket';
                    }
                    if (category !== 'uncategorized') {
                        if (!definedApisByCategory[category]) {
                            definedApisByCategory[category] = new Set();
                        }
                        definedApisByCategory[category].add(cleanedPath);
                    } else {
                        console.warn(`   INFO: Could not determine category for API path ${cleanedPath}`);
                    }
                }
            }
        }
        console.log(`\n🔍 Found ${allDefinedApis.size} unique valid API/WS definitions from ${sourceDesc}, across ${Object.keys(definedApisByCategory).length} categories.`);
        return { allDefinedApis, definedApisByCategory };
    } catch (err) {
        if (err.code === 'ENOENT') {
             console.error(`  ERROR: router.go file not found at: ${routerGoFilePath}`);
             // Use the passed siyuanRepoPath for a more accurate error message if routerGoFilePath is relative or constructed elsewhere
             console.error(`         Please ensure the 'siyuan' repository is cloned at '${siyuanRepoPath || '(unknown path, check SIYUAN_REPO_PATH)'}' and contains 'kernel/api/router.go'.`);
        } else {
            console.error(`  ERROR reading or parsing ${sourceDesc}:`, err);
        }
        return { allDefinedApis: new Set(), definedApisByCategory: {} };
    }
}

module.exports = {
    cleanApiPath, // Though it's internally used, exporting doesn't hurt if it might be useful elsewhere
    getDefinedApis,
}; 