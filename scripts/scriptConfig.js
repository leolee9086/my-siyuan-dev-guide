const path = require('path');

const VITEPRESS_DOCS_DIR = path.join(__dirname, '..', 'docs');
const SIYUAN_REPO_PATH = path.resolve(__dirname, '..', '..', 'siyuan'); // e.g., D:\\siyuan\\siyuan
const ROUTER_GO_PATH = path.join(SIYUAN_REPO_PATH, 'kernel', 'api', 'router.go');
const KERNEL_API_DOCS_MD_DIR = path.join(VITEPRESS_DOCS_DIR, 'kernel-api');

const SEVERITY = {
    ERROR: 'error',
    WARNING: 'warning',
    INFO: 'info',
};

module.exports = {
    VITEPRESS_DOCS_DIR,
    SIYUAN_REPO_PATH,
    ROUTER_GO_PATH,
    KERNEL_API_DOCS_MD_DIR,
    SEVERITY,
}; 