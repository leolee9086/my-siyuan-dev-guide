const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const { convertKebabToCamel } = require('./scriptUtils'); // Import convertKebabToCamel
// scriptUtils and scriptConfig (for SEVERITY) will be required by the main script 
// and their relevant parts (like logMessage, getNodeTextContent, SEVERITY) passed to these check functions.

// Helper function to get text content from a node or its children - will be passed from main script
let getNodeTextContentUtility;
// logMessage function - will be passed from main script
let log;
// SEVERITY enum - will be passed from main script
let SEVERITY_LEVELS;

// Renamed from checkCustomElementsAndConventions for clarity and focus on frontmatter
async function checkFrontmatter(filePath, frontmatter, fileContent, skipTitleCheck = false) {
    let localErrors = 0;
    let localWarnings = 0;
    if (!skipTitleCheck) { // Only check title if not skipped
        if (!frontmatter.title) {
            log(filePath, null, 'Frontmatter is missing a "title".', SEVERITY_LEVELS.WARNING);
            localWarnings++;
        } else if (typeof frontmatter.title !== 'string' || frontmatter.title.trim() === '') {
            log(filePath, null, 'Frontmatter "title" is empty or not a string.', SEVERITY_LEVELS.WARNING);
            localWarnings++;
        }
    }

    if (!frontmatter.description) {
        // log(filePath, null, 'Frontmatter is missing a "description".', SEVERITY_LEVELS.INFO); // This is more of an INFO
    } else if (typeof frontmatter.description !== 'string' || frontmatter.description.trim() === '') {
        log(filePath, null, 'Frontmatter "description" is empty or not a string.', SEVERITY_LEVELS.INFO);
    } else if (frontmatter.description.length < 50 && frontmatter.description.length > 0) { // Only warn if not completely empty
        log(filePath, null, `Frontmatter description is very short (length: ${frontmatter.description.length}). Aim for 50-160 characters.`, SEVERITY_LEVELS.INFO);
    } else if (frontmatter.description.length > 160) {
        log(filePath, null, `Frontmatter description is too long (length: ${frontmatter.description.length}). Aim for 50-160 characters.`, SEVERITY_LEVELS.WARNING);
        localWarnings++;
    }
    return { errors: localErrors, warnings: localWarnings };
}

// New function to check the frontmatter title specifically for Kernel API docs
function checkFrontmatterTitleFormat(filePath, matterData) {
    let localErrors = 0;
    let localWarnings = 0;

    const fileName = path.basename(filePath, '.md');
    // Skip for index.md, AInote.md, or any file not in a subdirectory of kernel-api (heuristic)
    // More precise filtering (e.g. based on KERNEL_API_DOCS_MD_DIR) should happen before calling this.
    if (fileName.toLowerCase() === 'index' || 
        fileName.toLowerCase() === 'ainote' || 
        !filePath.includes(path.sep + 'kernel-api' + path.sep)) { 
        return { errors: localErrors, warnings: localWarnings };
    }

    const expectedApiNameCamel = convertKebabToCamel(fileName);
    const title = matterData.title;

    if (!title || typeof title !== 'string' || !title.trim()) {
        // This case is already covered by the general checkFrontmatter function if !skipTitleCheck
        // but we add it here for completeness if this function is called independently or title becomes mandatory for API docs.
        // log(filePath, null, `Frontmatter 'title' is missing or empty for API doc. Expected format: "中文描述 (${expectedApiNameCamel})".`, SEVERITY_LEVELS.ERROR);
        // localErrors++;
        return { errors: localErrors, warnings: localWarnings }; // Return if no title, basic check handles it
    }

    const titleRegex = /^(.+?)\\s*\\(([^)]+)\\)$/;
    const match = title.match(titleRegex);

    if (match) {
        const chinesePart = match[1].trim();
        const englishPartInTitle = match[2].trim();

        let issueFound = false;
        if (!chinesePart) {
            log(filePath, null, `Frontmatter 'title' "${title}" has an empty Chinese description part. Expected format: "中文描述 (${expectedApiNameCamel})".`, SEVERITY_LEVELS.WARNING);
            localWarnings++;
            issueFound = true;
        }
        if (englishPartInTitle !== expectedApiNameCamel) {
            log(filePath, null, `Frontmatter 'title' "${title}" has an English part "(${englishPartInTitle})" that does not match the expected API name derived from filename "(${expectedApiNameCamel})".`, SEVERITY_LEVELS.WARNING);
            localWarnings++;
            issueFound = true;
        }
        // If no issue was found with the matched format, it's considered good, so no further logging for this case.
    } else {
        if (title.trim() === expectedApiNameCamel) {
            log(filePath, null, `Frontmatter 'title' is "${title}", which seems to be just the API name. It's missing the Chinese description. Expected format: "中文描述 (${expectedApiNameCamel})".`, SEVERITY_LEVELS.WARNING);
            localWarnings++;
        } else {
            // Title is some other format, or just Chinese without the (English) part.
            log(filePath, null, `Frontmatter 'title' is "${title}". Recommended format for API docs: "中文描述 (${expectedApiNameCamel})". This will appear as-is in the sidebar.`, SEVERITY_LEVELS.INFO);
            // Not incrementing localWarnings for this INFO case unless we decide it's a stricter requirement.
        }
    }
    return { errors: localErrors, warnings: localWarnings };
}

async function checkHeadings(filePath, ast, fileContent) {
    const { visit } = await import('unist-util-visit');
    const headings = [];
    visit(ast, 'heading', (node) => {
        headings.push(node);
    });

    if (headings.length === 0) {
        const overallTextContent = getNodeTextContentUtility(ast);
        if (overallTextContent.length > 300) {
            // log(filePath, ast, 'File has substantial content but no headings.', SEVERITY_LEVELS.INFO);
        }
    }

    let lastLevel = 0;
    let localErrors = 0;
    let localWarnings = 0;
    headings.forEach((node) => {
        const level = node.depth;
        if (level > lastLevel + 1 && lastLevel !== 0) {
            log(filePath, node, `Heading level skipped: from H${lastLevel} to H${level}.`, SEVERITY_LEVELS.ERROR);
            localErrors++;
        }
        lastLevel = level;
        const textContent = getNodeTextContentUtility(node);
        if (textContent === '') {
            log(filePath, node, 'Heading is empty.', SEVERITY_LEVELS.ERROR);
            localErrors++;
        }
    });
    return { errors: localErrors, warnings: localWarnings };
}

async function checkLinks(filePath, ast, fileContent) {
    const { visit } = await import('unist-util-visit');
    let localErrors = 0;
    let localWarnings = 0;
    visit(ast, 'link', (node) => {
        const url = node.url;
        if (!url || url.trim() === '' || url.trim() === '#') {
            log(filePath, node, `Link URL is empty or just "#": "${url}"`, SEVERITY_LEVELS.WARNING);
            localWarnings++;
        } else {
            const validPrefixes = ['http://', 'https://', '/', '../', './', '#'];
            const isValidPrefix = validPrefixes.some(prefix => url.startsWith(prefix));
            if (!isValidPrefix && !/^[a-zA-Z0-9_-]+(\.md|\.html)?(#.*)?$/.test(url)) {
                 log(filePath, node, `Link URL "${url}" does not seem to be a valid relative or absolute path.`, SEVERITY_LEVELS.INFO);
            }
        }
        const linkText = getNodeTextContentUtility(node);
        if (linkText === '') {
            log(filePath, node, `Link has no text content for URL: "${url}"`, SEVERITY_LEVELS.WARNING);
            localWarnings++;
            // Log the node structure for debugging
            console.log(`DEBUG: Empty link text for node in ${filePath} with URL ${url}:`, JSON.stringify(node, null, 2));
        }
    });
    return { errors: localErrors, warnings: localWarnings };
}

async function checkCodeBlocks(filePath, ast, fileContent) {
    const { visit } = await import('unist-util-visit');
    let localErrors = 0;
    let localWarnings = 0;
    visit(ast, 'code', (node) => {
        if (!node.lang) {
            log(filePath, node, 'Code block is missing language specification.', SEVERITY_LEVELS.WARNING);
            localWarnings++;
        } else if (node.lang.trim() === '') {
            log(filePath, node, 'Code block language specification is empty.', SEVERITY_LEVELS.WARNING);
            localWarnings++;
        }
        if (!node.value || node.value.trim() === '') {
            log(filePath, node, 'Code block content is empty.', SEVERITY_LEVELS.WARNING);
            localWarnings++;
        }
    });
    return { errors: localErrors, warnings: localWarnings };
}

async function checkImages(filePath, ast, fileContent) {
    const { visit } = await import('unist-util-visit');
    let localErrors = 0;
    let localWarnings = 0;
    visit(ast, 'image', (node) => {
        if (!node.alt || node.alt.trim() === '') {
            log(filePath, node, `Image is missing alt text. URL: "${node.url}"`, SEVERITY_LEVELS.WARNING);
            localWarnings++;
        }
        if (!node.url || node.url.trim() === '') {
            log(filePath, node, 'Image URL is empty.', SEVERITY_LEVELS.ERROR);
            localErrors++;
        }
    });
    return { errors: localErrors, warnings: localWarnings };
}

async function checkTables(filePath, ast, fileContent) {
    const { visit } = await import('unist-util-visit');
    let localErrors = 0;
    let localWarnings = 0;
    visit(ast, 'table', (node) => {
        if (!node.children || node.children.length === 0) {
            log(filePath, node, 'Table has no rows.', SEVERITY_LEVELS.WARNING);
            localWarnings++;
            return;
        }
        let headerChecked = false;
        node.children.forEach((tableRow, rowIndex) => {
            if (!tableRow.children || tableRow.children.length === 0) {
                log(filePath, tableRow, `Table row ${rowIndex + 1} is empty.`, SEVERITY_LEVELS.WARNING);
                localWarnings++;
                return;
            }
            if (!headerChecked && tableRow.type === 'tableRow') {
                headerChecked = true;
            }
            tableRow.children.forEach((cell, cellIndex) => {
                const cellText = getNodeTextContentUtility(cell);
                if (cellText === '') {
                    log(filePath, cell, `Table cell at row ${rowIndex + 1}, column ${cellIndex + 1} is empty.`, SEVERITY_LEVELS.INFO);
                }
            });
        });
    });
    return { errors: localErrors, warnings: localWarnings };
}

async function checkBlockquotes(filePath, ast, fileContent) {
    const { visit } = await import('unist-util-visit');
    let localErrors = 0;
    let localWarnings = 0;
    visit(ast, 'blockquote', (node) => {
        const content = getNodeTextContentUtility(node);
        if (content === '') {
            log(filePath, node, 'Blockquote is empty.', SEVERITY_LEVELS.INFO);
        }
    });
    return { errors: localErrors, warnings: localWarnings };
}

async function checkLists(filePath, ast, fileContent) {
    const { visit } = await import('unist-util-visit');
    let localErrors = 0;
    let localWarnings = 0;
    visit(ast, 'listItem', (node) => {
        const content = getNodeTextContentUtility(node);
        if (content === '' && (!node.children || node.children.filter(c => c.type !== 'text' || c.value.trim() !== '').length === 0) ) {
            let trulyEmpty = true;
            if (node.children && node.children.length > 0) {
                if (node.children.some(child => child.type === 'list' || (child.children && getNodeTextContentUtility(child) !== ''))) {
                    trulyEmpty = false;
                }
            }
            if (trulyEmpty) {
                log(filePath, node, 'List item appears to be empty.', SEVERITY_LEVELS.INFO);
            }
        }
    });
    return { errors: localErrors, warnings: localWarnings };
}

async function checkFile(filePath, utilities, skipTitleCheck = false) {
    log = utilities.logMessage;
    getNodeTextContentUtility = utilities.getNodeTextContent;
    SEVERITY_LEVELS = utilities.SEVERITY;

    log(filePath, null, `Checking file: ${filePath}`, SEVERITY_LEVELS.INFO); // Changed to use log
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data: frontmatter, content: markdownContent } = matter(fileContent);

    const { unified } = await import('unified');
    const remarkParse = (await import('remark-parse')).default;

    let ast;
    let fileErrors = 0;
    let fileWarnings = 0;

    try {
        ast = unified()
            .use(remarkParse)
            .parse(markdownContent);
    } catch (e) {
        log(filePath, null, `Failed to parse Markdown: ${e.message}`, SEVERITY_LEVELS.ERROR);
        fileErrors++;
        return { errors: fileErrors, warnings: fileWarnings }; // Return early if parsing fails
    }

    // Run the new title format check specifically for relevant files
    // The skipTitleCheck parameter for checkFrontmatter handles the basic existence/emptiness for non-API or index files.
    const titleFormatResult = checkFrontmatterTitleFormat(filePath, frontmatter);
    fileErrors += titleFormatResult.errors || 0;
    fileWarnings += titleFormatResult.warnings || 0;

    const checksToRun = [
        checkFrontmatter(filePath, frontmatter, fileContent, skipTitleCheck), // Pass skipTitleCheck
        checkHeadings(filePath, ast, fileContent),
        checkLinks(filePath, ast, fileContent),
        checkCodeBlocks(filePath, ast, fileContent),
        checkTables(filePath, ast, fileContent),
        checkBlockquotes(filePath, ast, fileContent),
        checkLists(filePath, ast, fileContent),
        checkImages(filePath, ast, fileContent)
    ];

    for (const checkPromise of checksToRun) {
        try {
            const result = await checkPromise;
            if (result) { // Ensure result is not undefined
                fileErrors += result.errors || 0;
                fileWarnings += result.warnings || 0;
            }
        } catch (error) {
            log(filePath, null, `Error during a check for ${filePath}: ${error.message}`, SEVERITY_LEVELS.ERROR);
            fileErrors++; // Count it as an error for this file
        }
    }
    return { errors: fileErrors, warnings: fileWarnings };
}

module.exports = {
    checkFile, // Main orchestrator for markdown checks
    checkFrontmatter, // Exporting for potential direct use or testing
    // Individual checks can also be exported if direct use is ever needed, but typically checkFile is the entry point.
    // checkHeadings,
    // checkCustomElementsAndConventions,
    // checkLinks,
    // checkCodeBlocks,
    // checkImages,
    // checkTables,
    // checkBlockquotes,
    // checkLists,
}; 