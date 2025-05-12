const fs = require('fs');
const path = require('path');

// SEVERITY will be imported from scriptConfig in the main script and passed if needed,
// or logMessage can be adapted to not depend on it directly if it becomes more generic.
function logMessage(file, node, message, severity = 'error') { // Defaulting severity to string if SEVERITY enum isn't available here
    let location = '';
    if (node && node.position) {
        location = ` (line ${node.position.start.line}, column ${node.position.start.column})`;
    } else if (node) {
        location = ` (near node type: ${node.type})`;
    }
    // Using severity as a string directly here.
    console.log(`[${severity.toUpperCase()}] ${path.relative(process.cwd(), file)}${location}: ${message}`);
}

function getNodeTextContent(node) {
    let text = '';
    if (node) {
        // Check for direct value on text and inlineCode nodes
        if (node.type === 'text' || node.type === 'inlineCode') {
            text += node.value || '';
        }
        
        // Always recurse through children if they exist,
        // as some nodes (like 'strong', 'emphasis', or even 'link' itself) 
        // might have nested 'text' or 'inlineCode' nodes.
        if (node.children && Array.isArray(node.children)) {
            for (const child of node.children) {
                text += getNodeTextContent(child);
            }
        }
    }
    return text.trim();
}

function walkDir(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        isDirectory ?
            walkDir(dirPath, callback) : callback(path.join(dir, f));
    });
}

function convertKebabToCamel(str) {
    return str.replace(/-(\w)/g, (_, c) => c.toUpperCase());
}

module.exports = {
    logMessage,
    getNodeTextContent,
    walkDir,
    convertKebabToCamel,
}; 