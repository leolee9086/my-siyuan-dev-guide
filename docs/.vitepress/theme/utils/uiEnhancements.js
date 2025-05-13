import { nextTick } from 'vue';
import {
    fetchSnippetStatusFromSiyuan,
    handleInstallSnippet,
    handleUninstallSnippet,
    handleToggleSnippetEnable
} from './siyuanApi';
import {
    getSiyuanConfigFromLocalStorage,
    ensureSiyuanConfig
} from './siyuanConfigManager';

// This function renders the interactive buttons within the toolbar of a code block.
function renderSnippetButtons(blockElement, snippetName, cssCode, status, config, snippetIdFromMeta = null) {
    console.log(`[${new Date().toISOString()}] renderSnippetButtons called for "${snippetName}" (ID from meta: ${snippetIdFromMeta}). Status:`, JSON.parse(JSON.stringify(status)));
    let toolbar = blockElement.querySelector('.snippet-toolbar');
    if (!toolbar) {
        console.error(`[${new Date().toISOString()}] Toolbar not found in renderSnippetButtons for "${snippetName}". Aborting render.`);
        return;
    }
    toolbar.innerHTML = ''; 

    function createButton(text, className, title, onClickHandler) {
        const btn = document.createElement('button');
        btn.textContent = text;
        btn.className = `snippet-btn ${className}`;
        if (title) btn.title = title;
        btn.onclick = async (event) => {
            event.stopPropagation();
            const originalText = btn.textContent;
            btn.textContent = '处理中...';
            btn.disabled = true;
            try {
                console.log(`[${new Date().toISOString()}] Button "${text}" (${className}): onClick started.`);
                await onClickHandler();
                console.log(`[${new Date().toISOString()}] Button "${text}" (${className}): onClick finished successfully.`);
                const parentBlock = toolbar.closest('div.language-css');
                if (parentBlock) {
                    console.log(`[${new Date().toISOString()}] Button "${text}" (${className}): Calling enhanceSingleCodeBlock to refresh.`);
                    parentBlock.removeAttribute('data-snippet-enhanced');
                    await enhanceSingleCodeBlock(parentBlock, true);
                    console.log(`[${new Date().toISOString()}] Button "${text}" (${className}): enhanceSingleCodeBlock finished.`);
                } else {
                    console.warn(`[${new Date().toISOString()}] Button "${text}" (${className}): Parent block not found, cannot refresh. Restoring button.`);
                    btn.textContent = originalText;
                    btn.disabled = false;
                }
            } catch (e) {
                console.error(`[${new Date().toISOString()}] Button "${text}" (${className}): onClick caught error:`, e);
                alert(`操作失败: ${e.message}`);
                btn.textContent = originalText;
                btn.disabled = false;
            }
        };
        toolbar.appendChild(btn);
        return btn;
    }

    if (status.error) {
        console.log(`[${new Date().toISOString()}] Rendering error state for "${snippetName}": ${status.error}`);
        const errorSpan = document.createElement('span');
        errorSpan.className = 'snippet-status-error';
        errorSpan.textContent = `获取状态失败: ${status.error.substring(0,100)}${status.error.length > 100 ? '...':''}`;
        errorSpan.title = status.error;
        toolbar.appendChild(errorSpan);
        createButton('重试', 'snippet-btn-retry', '重试获取片段状态', async () => {
            const parentBlock = toolbar.closest('div.language-css');
            if(parentBlock) {
                parentBlock.removeAttribute('data-snippet-enhanced');
                await enhanceSingleCodeBlock(parentBlock, true);
            }
        });
    } else if (!status.exists) {
        console.log(`[${new Date().toISOString()}] Rendering INSTALL button for "${snippetName}".`);
        createButton('安装到思源', 'snippet-btn-install', '将此CSS片段安装到您的思源笔记中', async () => {
            await handleInstallSnippet(config, snippetName, cssCode, snippetIdFromMeta);
        });
    } else {
        console.log(`[${new Date().toISOString()}] Rendering MANAGE buttons for "${snippetName}" (ID: ${status.id}, Enabled: ${status.enabled}).`);
        createButton('卸载', 'snippet-btn-uninstall', `从思源笔记中卸载此CSS片段 (ID: ${status.id})`, async () => {
            if (!confirm(`确定要从思源笔记中卸载（删除）名为 "${snippetName}" 的 CSS 片段吗？`)) {
                throw new Error("用户取消了卸载操作。");
            }
            await handleUninstallSnippet(config, status.id);
        });
        createButton(status.enabled ? '停用' : '启用', 
                     status.enabled ? 'snippet-btn-disable' : 'snippet-btn-enable', 
                     status.enabled ? '停用思源中的此CSS片段' : '启用思源中的此CSS片段',
                     async () => {
            await handleToggleSnippetEnable(config, status.id, snippetName, !status.enabled);
        });
        if (status.content && status.content.trim() !== cssCode.trim()) {
            console.log(`[${new Date().toISOString()}] Rendering SYNC button for "${snippetName}".`);
            createButton('同步到思源', 'snippet-btn-sync', '思源内容与文档不一致。点击同步。 ', async () => {
                if (!confirm(`思源中的片段 "${snippetName}" 内容与文档不一致。确定要用文档中的代码覆盖思源中的版本吗？`)) {
                     throw new Error("用户取消了同步操作。");
                }
                await handleInstallSnippet(config, snippetName, cssCode, status.id, status.enabled);
            });
        }
    }

    createButton('配置思源', 'snippet-btn-config', '打开思源连接配置对话框', async () => {
        try {
            await ensureSiyuanConfig(true);
        } catch (configError) {
            if (!configError.message.toLowerCase().includes("cancelled")) {
                alert(`配置过程中发生错误: ${configError.message}`);
            }
        }
        const parentBlock = toolbar.closest('div.language-css');
        if(parentBlock) {
             console.log(`[${new Date().toISOString()}] Config button: Triggering refresh after config attempt.`);
             parentBlock.removeAttribute('data-snippet-enhanced');
             await enhanceSingleCodeBlock(parentBlock, true);
        }
    });
    console.log(`[${new Date().toISOString()}] renderSnippetButtons finished for "${snippetName}". Toolbar:`, toolbar.innerHTML);
}

// This is the core function to enhance a single CSS code block
export async function enhanceSingleCodeBlock(blockElement, forceRefresh = false) {
    console.log(`[${new Date().toISOString()}] enhanceSingleCodeBlock for CSS block. forceRefresh: ${forceRefresh}`, blockElement);

    const codeGroup = blockElement.closest('.vp-code-group');
    if (!codeGroup) return;
    const jsonBlock = codeGroup.querySelector('.language-json');
    if (!jsonBlock) {
        console.log(`[${new Date().toISOString()}] CSS block in code-group, but no .language-json. Skipping.`);
        return;
    }

    if (!forceRefresh && blockElement.dataset.snippetEnhanced === 'true' && blockElement.querySelector('.snippet-toolbar button')) {
        console.log(`[${new Date().toISOString()}] Skipped: already enhanced & not forced.`);
        return; 
    }
    
    let toolbar = blockElement.querySelector('.snippet-toolbar');
    if (!toolbar) {
        toolbar = document.createElement('div');
        toolbar.className = 'snippet-toolbar';
        const copyButton = blockElement.querySelector('button.copy');
        if (copyButton && copyButton.parentNode) {
            copyButton.parentNode.insertBefore(toolbar, copyButton.nextSibling);
        } else {
            blockElement.insertBefore(toolbar, blockElement.firstChild); 
        }
    }
    toolbar.innerHTML = '提取元数据中...';

    let snippetName = `CSS片段-${Date.now()}`; 
    let snippetIdFromMeta = null;
    let metaError = null;

    const jsonCodeElement = jsonBlock.querySelector('pre code');
    if (jsonCodeElement) {
        try {
            const metaData = JSON.parse(jsonCodeElement.innerText);
            if (metaData.name && typeof metaData.name === 'string' && metaData.name.trim() !== '') {
                snippetName = metaData.name.trim();
            } else {
                console.warn(`[${new Date().toISOString()}] No valid 'name' in meta. Using default: "${snippetName}"`);
            }
            if (metaData.id && typeof metaData.id === 'string' && metaData.id.trim() !== '') {
                snippetIdFromMeta = metaData.id.trim();
            }
        } catch (e) {
            metaError = `元数据解析失败: ${e.message}.`;
            console.error(`[${new Date().toISOString()}] ${metaError}`, jsonCodeElement.innerText);
        }
    } else {
        metaError = '在 .language-json 内未找到代码元素.';
    }

    if (metaError) {
        toolbar.innerHTML = `<span class="snippet-status-error" title="${metaError}">${metaError.substring(0, 150)}</span>`;
        const retryBtn = document.createElement('button');
        retryBtn.textContent = '重试提取';
        retryBtn.className = 'snippet-btn snippet-btn-retry';
        retryBtn.onclick = () => {
            blockElement.removeAttribute('data-snippet-enhanced');
            enhanceSingleCodeBlock(blockElement, true);
        };
        toolbar.appendChild(retryBtn);
        blockElement.dataset.snippetEnhanced = 'true';
        return;
    }
    
    const codeElement = blockElement.querySelector('pre code');
    if (!codeElement) {
        toolbar.innerHTML = '<span class="snippet-status-error">错误: 未找到CSS代码.</span>';
        blockElement.dataset.snippetEnhanced = 'true';
        return;
    }
    const cssCode = codeElement.innerText;
    
    console.log(`[${new Date().toISOString()}] Meta OK. Name: "${snippetName}", ID: "${snippetIdFromMeta}".`);
    toolbar.innerHTML = '检查思源状态...';

    try {
        let config = getSiyuanConfigFromLocalStorage();
        if (!config || !config.url || !config.token || !config.savePreference) { // ensureSiyuanConfig will prompt if no saved & preferred config
            config = await ensureSiyuanConfig(); 
        }
        
        const status = await fetchSnippetStatusFromSiyuan(config, snippetName, snippetIdFromMeta);
        renderSnippetButtons(blockElement, snippetName, cssCode, status, config, snippetIdFromMeta);
        blockElement.dataset.snippetEnhanced = 'true';
    } catch (error) {
        console.error('Error in Siyuan status check/button rendering phase:', error);
        if (toolbar) {
            let errMsg = '操作出错了。';
            if (error.message.toLowerCase().includes("config cancelled")) {
                errMsg = '操作已取消 (思源连接未配置)。';
            } else if (error.message.toLowerCase().includes("missing")) { 
                 errMsg = '思源连接未配置。';
            } else if (error.message) {
                errMsg = `错误: ${error.message.substring(0,100)}`;
            }
            toolbar.innerHTML = `<span class="snippet-status-error" title="${error.message}">${errMsg}</span>`;
            
            const retryCfgBtn = document.createElement('button');
            retryCfgBtn.className = 'snippet-btn snippet-btn-retry';
            retryCfgBtn.textContent = errMsg.includes('连接未配置') ? '配置连接' : '重试';
            retryCfgBtn.onclick = async () => {
                toolbar.innerHTML = '处理中...';
                blockElement.removeAttribute('data-snippet-enhanced');
                if (retryCfgBtn.textContent === '配置连接') {
                     await ensureSiyuanConfig(true);
                }
                await enhanceSingleCodeBlock(blockElement, true);
            };
            toolbar.appendChild(retryCfgBtn);
        }
        blockElement.dataset.snippetEnhanced = 'true';
    }
}

// Entry function to enhance all relevant code blocks on the page
export function enhanceCodeBlocks() {
  if (typeof window === 'undefined') return;
  nextTick(() => {
    document.querySelectorAll('div.language-css').forEach(block => {
      enhanceSingleCodeBlock(block); 
    });
  });
} 