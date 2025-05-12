const fs = require('fs-extra');
const path = require('path');
const TurndownService = require('turndown');
const { JSDOM } = require('jsdom');
const matter = require('gray-matter');
const gfm = require('turndown-plugin-gfm').gfm;
const { Readability } = require('@mozilla/readability');

// Initialize Turndown service
const turndownService = new TurndownService({
    headingStyle: 'atx', // Use '#' for headings
    codeBlockStyle: 'fenced', // Use ``` for code blocks
    bulletListMarker: '-', // Use '-' for bullet lists
    emDelimiter: '*',
    strongDelimiter: '**',
    linkStyle: 'inlined',
});
turndownService.use(gfm);

// Custom rule to better handle <pre><code> blocks and preserve language
turndownService.addRule('preCode', {
    filter: function (node, options) {
        return (
            node.nodeName === 'PRE' &&
            node.firstChild &&
            node.firstChild.nodeName === 'CODE'
        );
    },
    replacement: function (content, node, options) {
        const codeNode = node.firstChild;
        const className = codeNode.getAttribute('class') || '';
        const language = (className.match(/language-(\S+)/) || [null, ''])[1];
        
        let codeContent = codeNode.textContent || codeNode.innerText || content;
        codeContent = codeContent.replace(/^\n+|\n+$/g, '');

        return `\n\`\`\`${language}\n${codeContent}\n\`\`\`\n\n`;
    }
});

function generateFrontmatter(title, description = '') {
    const fm = { title };
    if (description) {
        fm.description = description;
    }
    // Ensure title is a string and not empty
    if (typeof fm.title !== 'string' || !fm.title.trim()) {
        fm.title = 'Untitled'; // Default title if extraction failed
    }
    return fm;
}

function extractContentForApiDetailPage(dom, sourceHtmlPath) {
    const document = dom.window.document;
    let title, contentHtml;

    // Directly use manual extraction logic based on document.body
    // Try to get title from H1, or fallback to document.title or finally filename
    const h1Element = document.querySelector('h1');
    if (h1Element) {
        title = h1Element.textContent.trim();
    } else if (document.title) {
        title = document.title.trim();
    }
    // Further title refinement will happen after this block

    const bodyClone = document.body.cloneNode(true);
    
    const selectorsToRemove = [
        '.home-link',       // Top link to Siyuan API Docs homepage in original docs
        '.api-header',      // Header div with method/endpoint (e.g., "POST /api/attr/setBlockAttrs")
        '.test-area',       // Online API tester section
        '.nav-links',       // Bottom navigation links (prev/next)
        'script',           // All script tags
        'style'             // All style tags
        // We keep .github-source, .auth-tags, blockquotes, div.note, tables, code blocks etc.
        // The main H1 (if present and used for title) is currently kept in bodyClone.
        // Turndown will convert it. If this results in duplicate H1s (frontmatter vs body),
        // we might reconsider removing it from bodyClone after title extraction.
    ];

    selectorsToRemove.forEach(selector => {
        bodyClone.querySelectorAll(selector).forEach(el => el.remove());
    });

    const tableCells = bodyClone.querySelectorAll('td');
    tableCells.forEach(cell => {
        const brs = cell.querySelectorAll('br');
        brs.forEach(br => br.remove());
    });

    // Pre-processing step: Remove all nested tables as they might be complex for Turndown
    const nestedTables = bodyClone.querySelectorAll('table.nested-table');
    nestedTables.forEach(table => table.remove());

    // Pre-processing step: Clean up content within <td> elements
    const allTableCells = bodyClone.querySelectorAll('td');
    allTableCells.forEach(cell => {
        // Remove <ul> and <ol> from within cells as they are problematic for Turndown in tables
        // and Markdown doesn't have a good representation for lists inside table cells.
        // We can revisit this if specific list content needs to be preserved in a different way.
        cell.querySelectorAll('ul, ol').forEach(list => list.remove());

        // Trim text nodes and remove empty ones
        const childNodes = Array.from(cell.childNodes);
        childNodes.forEach(child => {
            if (child.nodeType === 3) { // Node.TEXT_NODE
                const trimmedText = child.textContent.trim();
                if (trimmedText) {
                    child.textContent = trimmedText; 
                } else {
                    child.remove();
                }
            }
        });
    });

    contentHtml = bodyClone.innerHTML;

    if (!contentHtml && title) { 
        console.warn(`Content body for ${sourceHtmlPath} resulted in empty HTML after removals, but title was found. Proceeding with empty content.`);
    } else if (!contentHtml && !title) {
        console.warn(`Content body for ${sourceHtmlPath} is empty and no title was found. Markdown will likely be empty or just frontmatter with filename as title.`);
    }
    
    // Existing title cleaning logic
    if (title) {
        title = title.replace(/\s*思源笔记\s*API\s*文档$/i, '').trim();
        title = title.replace(/\s*思源笔记\s*内核\s*API$/i, '').trim();
        title = title.replace(/\s*思源笔记\s*API$/i, '').trim();
        title = title.replace(/\s*API\s*文档$/i, '').trim();
        title = title.replace(/\s*API$/i, '').trim(); 
        title = title.replace(/\s*-\s*$/i, '').trim(); 
    }

    if (!title) { 
        title = path.basename(sourceHtmlPath, '.html');
        // console.warn(`No title extracted for ${sourceHtmlPath}, using filename: ${title}`);
    }
    
    return { title, contentHtml: contentHtml || '', type: 'detail' };
}

function extractContentForIndexPage(dom, sourceHtmlPath) {
    const document = dom.window.document;
    let title = (document.querySelector('h1') || { textContent: '' }).textContent.trim();
    const dirNameForTitle = path.basename(path.dirname(sourceHtmlPath));
    if (title.toLowerCase().includes('index')) {
        title = `${dirNameForTitle.charAt(0).toUpperCase() + dirNameForTitle.slice(1)} API Index`;
    } else if (!title) {
        title = `${dirNameForTitle.charAt(0).toUpperCase() + dirNameForTitle.slice(1)} Index`;
    }

    if (title) {
        title = title.replace(/\s*思源笔记\s*API\s*文档$/i, '').trim();
        title = title.replace(/\s*思源笔记\s*内核\s*API$/i, '').trim();
        title = title.replace(/\s*思源笔记\s*API$/i, '').trim();
        title = title.replace(/\s*API\s*文档$/i, '').trim();
        title = title.replace(/\s*API Index$/i, ' Index').trim(); // For index pages
        title = title.replace(/\s*API$/i, '').trim();
        title = title.replace(/\s*-\s*$/i, '').trim(); // Remove trailing hyphen and spaces
    }
    // If title became empty after trimming, re-evaluate based on dirname
    if (!title && dirNameForTitle) {
         title = `${dirNameForTitle.charAt(0).toUpperCase() + dirNameForTitle.slice(1)} Index`;
    }

    let contentHtml = '';
    const listElement = document.querySelector('body > ul'); 
    if (listElement) {
        contentHtml = listElement.outerHTML;
    }
    return { title, contentHtml, type: 'index' };
}

async function convertHtmlFileToMarkdown(sourceHtmlPath, targetMdPath, targetBaseDir) {
    try {
        const htmlContent = await fs.readFile(sourceHtmlPath, 'utf-8');
        const dom = new JSDOM(htmlContent);
        
        let extractedData;
        const fileName = path.basename(sourceHtmlPath).toLowerCase();

        if (fileName === 'index.html') {
            extractedData = extractContentForIndexPage(dom, sourceHtmlPath);
        } else {
            extractedData = extractContentForApiDetailPage(dom, sourceHtmlPath);
        }

        // let markdownContent = turndownService.turndown(extractedData.contentHtml);
        // Call our own wrapper function to include debug logging for specific files
        let markdownContent = convertHtmlToMarkdown(extractedData.contentHtml, sourceHtmlPath);
        
        // Regex for <a href="filename.html">text</a>, capturing filename and text.
        // Allows for other attributes in the <a> tag.
        const linkRegex = /<a\s+(?:[^>]*?\s+)?href=\"([^\"]+?\.html)\"[^>]*?>([^<]+?)<\/a>/g;

        if (extractedData.type === 'index') {
            markdownContent = markdownContent.replace(linkRegex, (match, hrefValue, linkText) => {
                const oldFileName = path.basename(hrefValue, '.html');
                const newFileName = oldFileName + '.md';
                return `[${linkText}](./${newFileName})`;
            });
        } else { // Detail page
            markdownContent = markdownContent.replace(linkRegex, (match, hrefValue, linkText) => {
                const oldFileName = path.basename(hrefValue, '.html');
                let newLinkTarget = '';
                if (oldFileName.toLowerCase() === 'index') {
                    newLinkTarget = './index.md'; 
                } else {
                    newLinkTarget = './' + oldFileName + '.md';
                }
                return `[${linkText}](${newLinkTarget})`;
            });

            const parentIndexLinkRegex = /<a\s+(?:[^>]*?\s+)?href=\"(\.\.\/index\.html)\"[^>]*?>([^<]+?)<\/a>/g;
            markdownContent = markdownContent.replace(parentIndexLinkRegex, (match, hrefValue, linkText) => {
                 const relativePathToKernelApiIndex = path.relative(path.dirname(targetMdPath), path.join(targetBaseDir, '../index.md')).replace(/\\/g, '/');
                 return `[${linkText}](${relativePathToKernelApiIndex || './index.md'})`;
            });
        }

        const frontmatter = generateFrontmatter(extractedData.title, extractedData.description);
        const finalOutput = matter.stringify(markdownContent, frontmatter);
        await fs.outputFile(targetMdPath, finalOutput);
        return true;
    } catch (error) {
        console.error(`Error converting file ${sourceHtmlPath}: ${error.message}`);
        return false;
    }
}

async function batchConvert(sourceDir, targetDir) {
    const entries = await fs.readdir(sourceDir, { withFileTypes: true });
    let successCount = 0;
    let failCount = 0;

    // const isAssetDir = path.basename(sourceDir).toLowerCase() === 'asset'; // Removed for normal operation

    for (const entry of entries) {
        const sourcePath = path.join(sourceDir, entry.name);
        let targetName = entry.name;

        // Removed targeted skipping for normal operation
        // if (isAssetDir && entry.isFile() && entry.name.toLowerCase() !== 'getimageocrtext.html' && entry.name.toLowerCase() !== 'ainote.md') {
        //     continue;
        // }
        // if (isAssetDir && entry.isDirectory()) {
        //     continue;
        // }

        if (entry.name === 'node_modules' || entry.name === 'scripts') continue;
        if (entry.name.toLowerCase() === '.ds_store') continue; // Skip .DS_Store files

        if (entry.isDirectory()) {
            const newTargetDir = path.join(targetDir, targetName);
            await fs.ensureDir(newTargetDir);
            const {success, fail} = await batchConvert(sourcePath, newTargetDir);
            successCount += success;
            failCount += fail;
        } else if (entry.isFile()) {
            if (entry.name.toLowerCase() === 'ainote.md') {
                 // Copy AInote.md directly without conversion
                 const targetMdPath = path.join(targetDir, 'AInote.md');
                 try {
                     await fs.copy(sourcePath, targetMdPath);
                     // console.log(`Copied AInote.md to ${targetMdPath}`);
                     successCount++;
                 } catch (copyError) {
                     console.error(`Error copying AInote.md from ${sourcePath} to ${targetMdPath}: ${copyError.message}`);
                     failCount++;
                 }
            } else if (path.extname(entry.name).toLowerCase() === '.html') {
                targetName = entry.name.replace(/\.html$/i, '') + '.md';
                const targetMdPath = path.join(targetDir, targetName);
                if (await convertHtmlFileToMarkdown(sourcePath, targetMdPath, targetDir)) {
                    successCount++;
                } else {
                    failCount++;
                }
            } else {
                // console.log(`Skipping non-html/non-AInote file: ${sourcePath}`);
            }
        }
    }
    return {success: successCount, fail: failCount};
}

async function main() {
    console.log("Starting HTML to Markdown batch conversion...");
    const kernelApiSourceBase = path.resolve(__dirname, '../../siyuan-dev-guide/kernel-api');
    const kernelApiTargetBase = path.resolve(__dirname, '../docs/kernel-api');

    const entries = await fs.readdir(kernelApiSourceBase, { withFileTypes: true });
    let totalSuccess = 0;
    let totalFail = 0;

    for (const entry of entries) {
        const sourcePath = path.join(kernelApiSourceBase, entry.name);
        if (entry.name === 'scripts' || entry.name === 'node_modules' || entry.name.toLowerCase() === '.ds_store') {
            continue;
        }

        if (entry.isDirectory()) {
            const targetCatDir = path.join(kernelApiTargetBase, entry.name); // Use original category name
            console.log(`Processing category: ${entry.name} -> ${targetCatDir}`);
            await fs.ensureDir(targetCatDir);
            
            // Optional: Clean the target category directory before converting, preserving AInote.md
            // const itemsInTargetCat = await fs.readdir(targetCatDir);
            // for (const item of itemsInTargetCat) {
            //     if (item.toLowerCase() !== 'ainote.md') { 
            //         await fs.remove(path.join(targetCatDir, item));
            //     }
            // }

            const {success, fail} = await batchConvert(sourcePath, targetCatDir);
            totalSuccess += success;
            totalFail += fail;
        } else if (entry.isFile()) {
            if (path.extname(entry.name).toLowerCase() === '.html' && entry.name.toLowerCase() !== 'index.html') {
                // Handle HTML files directly in kernelApiSourceBase (e.g., transactions.html)
                const targetMdName = entry.name.replace(/\.html$/i, '') + '.md';
                const targetMdPath = path.join(kernelApiTargetBase, targetMdName); // Target is kernelApiTargetBase root
                console.log(`Processing root HTML file: ${sourcePath} -> ${targetMdPath}`);
                if (await convertHtmlFileToMarkdown(sourcePath, targetMdPath, kernelApiTargetBase)) {
                    totalSuccess++;
                } else {
                    totalFail++;
                }
            } else if (entry.name.toLowerCase() === 'ainote.md') {
                // Handle AInote.md directly in kernelApiSourceBase if it exists
                const targetMdPath = path.join(kernelApiTargetBase, entry.name);
                 try {
                     await fs.copy(sourcePath, targetMdPath);
                     console.log(`Copied root AInote.md to ${targetMdPath}`);
                     totalSuccess++;
                 } catch (copyError) {
                     console.error(`Error copying root AInote.md from ${sourcePath} to ${targetMdPath}: ${copyError.message}`);
                     totalFail++;
                 }
            }
            // Other files in the root (not dirs, not .html, not AInote.md) are ignored by this loop structure
        }
    }
    
    // Handle the main index.html separately as before (if it wasn't caught above or needs special logic)
    const mainIndexSource = path.join(kernelApiSourceBase, 'index.html');
    if (await fs.pathExists(mainIndexSource)) {
        const mainIndexTarget = path.join(kernelApiTargetBase, 'index.md');
        // Check if it was already processed if entry.name.toLowerCase() could be 'index.html' in the loop
        // For safety, we can just let it process, fs.outputFile will overwrite
        console.log(`Processing main index: ${mainIndexSource} -> ${mainIndexTarget}`);
        if(await convertHtmlFileToMarkdown(mainIndexSource, mainIndexTarget, kernelApiTargetBase)){
            totalSuccess++; // This might double count if index.html was also processed in the loop
        } else {
            totalFail++;
        }
    }

    console.log(`\nHTML to Markdown batch conversion process finished.\nSuccessfully converted: ${totalSuccess} files.\nFailed to convert: ${totalFail} files.\nTotal processed HTML files (attempted): ${totalSuccess + totalFail}`);
}

main().catch(console.error);

// Function to convert a single HTML string to Markdown
function convertHtmlToMarkdown(htmlString, sourceFilePathForDebug) {
    const turndownService = new TurndownService({
        headingStyle: 'atx', // Use '#' for headings
        hr: '--',
        bulletListMarker: '-',
        codeBlockStyle: 'fenced',
    });
    turndownService.use(gfm);

    // Add a rule for <pre><code> to ensure language is preserved if possible
    turndownService.addRule('preservePreCodeLanguage', {
        filter: function (node, options) {
            return (
                node.nodeName === 'PRE' &&
                node.firstChild &&
                node.firstChild.nodeName === 'CODE' &&
                node.firstChild.getAttribute('class') &&
                node.firstChild.getAttribute('class').startsWith('language-')
            );
        },
        replacement: function (content, node, options) {
            const codeNode = node.firstChild;
            const language = codeNode.getAttribute('class').replace('language-', '');
            // Turndown typically escapes content within pre/code, so we might not need to re-escape here.
            // It also handles indentation and newlines reasonably well.
            return `\n\n\`\`\`${language}\n${codeNode.textContent.trim()}\n\`\`\`\n\n`;
        }
    });

    try {
        // ---- START DEBUG LOG ----
        if (sourceFilePathForDebug && sourceFilePathForDebug.includes('getBlockBreadcrumb.html')) {
            console.log(`--- HTML input for Turndown (getBlockBreadcrumb.html) ---`);
            console.log(htmlString);
            console.log(`--- End HTML input for Turndown (getBlockBreadcrumb.html) ---`);
        }
        // ---- END DEBUG LOG ----
        const markdown = turndownService.turndown(htmlString);
        return markdown;
    } catch (e) {
        // console.error(`Error during Turndown conversion for ${sourceFilePathForDebug || 'unknown source'}:`, e);
        // Add the path to the error message to make it easier to find the problematic file
        e.message = `Turndown conversion error for ${sourceFilePathForDebug || 'unknown source'}: ${e.message}`;
        throw e; // Re-throw the enriched error
    }
}

module.exports = {
    convertHtmlFileToMarkdown,
    batchConvert,
    convertHtmlToMarkdown
}; 