const fs = require('fs');
const path = require('path');

// 配置 API 文档根目录
const KERNEL_API_DOCS_MD_DIR = path.resolve(__dirname, '../docs/kernel-api');

// 跳过的文件名
const SKIP_FILES = new Set(['index.md', 'AInote.md']);

// 免责声明和赞助信息
const FOOTER = `\n> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/) 中的源码为准。\n> \n> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)\n`;

// 检查是否已存在"# 端点"段落
function hasEndpointSection(content) {
    return /(^|\n)\s*#\s*端点\s*\n/i.test(content);
}

// 解析 frontmatter 结束位置
function getFrontmatterEndIndex(content) {
    if (content.startsWith('---')) {
        const end = content.indexOf('\n---', 3);
        if (end !== -1) {
            return end + 4; // 包含换行
        }
    }
    return 0;
}

// 插入端点段落
function insertEndpointSection(content, endpoint) {
    const fmEnd = getFrontmatterEndIndex(content);
    const before = content.slice(0, fmEnd);
    const after = content.slice(fmEnd);
    // 插入两行空行，避免和 frontmatter/正文粘连
    return `${before}\n# 端点\n\n${endpoint}\n${after}`;
}

// 递归遍历所有分组子目录
function walkDir(dir, cb) {
    fs.readdirSync(dir, { withFileTypes: true }).forEach(entry => {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            walkDir(fullPath, cb);
        } else if (entry.isFile() && entry.name.endsWith('.md') && !SKIP_FILES.has(entry.name)) {
            cb(fullPath, entry.name, path.basename(dir));
        }
    });
}

// 主逻辑
function main() {
    let changed = 0;
    walkDir(KERNEL_API_DOCS_MD_DIR, (filePath, fileName, group) => {
        // group 是分组目录名
        const apiName = fileName.replace(/\.md$/, '');
        const endpoint = `/api/${group}/${apiName}`;
        let content = fs.readFileSync(filePath, 'utf8');
        let modified = false;
        if (!hasEndpointSection(content)) {
            content = insertEndpointSection(content, endpoint);
            modified = true;
        }
        if (!content.includes(FOOTER.trim())) {
            // 末尾追加，确保有换行
            content = content.replace(/\s*$/, '') + FOOTER;
            modified = true;
        }
        if (modified) {
            fs.writeFileSync(filePath, content, 'utf8');
            changed++;
            console.log(`已插入端点和/或免责声明: ${endpoint} -> ${filePath}`);
        }
    });
    console.log(`\n共处理 ${changed} 个 API 文档。`);
}

if (require.main === module) {
    main();
} 