import DefaultTheme from 'vitepress/theme'
import { onMounted, watch, nextTick, createApp, h } from 'vue'
import { useRoute } from 'vitepress'
import SiyuanConfigModal from './components/SiyuanConfigModal.vue'

// Import our main SCSS file that includes Siyuan SCSS.
// Path is relative to this file (.vitepress/theme/index.js)
// SCSS file is at .vitepress/styles/index.scss
import '../styles/index.scss'

// 用于管理动态创建的模态框实例
let modalInstance = null;
let modalContainer = null;

function showConfigModal(initialConfig = {}) {
  return new Promise((resolve, reject) => {
    if (modalInstance) {
      // 如果已有实例，先销毁，或者更新其 props 并重新显示
      // 这里简单处理，直接销毁旧的
      modalInstance.unmount();
      document.body.removeChild(modalContainer);
      modalInstance = null;
      modalContainer = null;
    }

    modalContainer = document.createElement('div');
    document.body.appendChild(modalContainer);

    const app = createApp({
      render() {
        return h(SiyuanConfigModal, {
          visible: true,
          initialUrl: initialConfig.url,
          initialToken: initialConfig.token,
          onConfirm: (data) => {
            resolve(data);
            app.unmount(); // 使用 app.unmount() 而不是 modalInstance.unmount()
            document.body.removeChild(modalContainer);
            modalInstance = null; 
            modalContainer = null;
          },
          onCancel: () => {
            reject(new Error('Config cancelled by user'));
            app.unmount();
            document.body.removeChild(modalContainer);
            modalInstance = null;
            modalContainer = null;
          },
          // 'onUpdate:visible': (val) => { // 如果模态框内部自己处理关闭，需要这个
          //   if (!val) {
          //      app.unmount(); 
          //      document.body.removeChild(modalContainer);
          //      modalInstance = null; 
          //      modalContainer = null;
          //      reject(new Error('Config cancelled by user - visibility update'));
          //   }
          // }
        });
      },
    });
    
    modalInstance = app.mount(modalContainer); // 保存 app 实例的引用，以便 unmount
  });
}

export default {
  ...DefaultTheme,
  // You can enhance the app or override components here if needed later
  // enhanceApp({ app, router, siteData }) {
    // ...
  // }
  setup() {
    if (typeof window === 'undefined') {
      return; // 确保只在客户端执行 setup 内容
    }

    const route = useRoute();

    // --- Siyuan Interaction Logic V2 ---
    const SIYUAN_CONFIG_KEY_PREFIX = 'siyuanVitePressConfig_'; // Prefix for multiple configs if ever needed

    function getSiyuanConfigFromLocalStorage(key = 'default') {
      const stored = localStorage.getItem(SIYUAN_CONFIG_KEY_PREFIX + key);
      if (stored) {
        try {
          const config = JSON.parse(stored);
          if (config.url && config.token) {
            return config; // Expected: { url: string, token: string, savePreference: boolean }
          }
        } catch (e) {
          console.error("Error parsing Siyuan config from localStorage for key:", key, e);
          localStorage.removeItem(SIYUAN_CONFIG_KEY_PREFIX + key);
        }
      }
      return null;
    }

    function saveSiyuanConfigToLocalStorage(url, token, shouldSave, key = 'default') {
      if (shouldSave) {
        localStorage.setItem(SIYUAN_CONFIG_KEY_PREFIX + key, JSON.stringify({ url, token, savePreference: true }));
      } else {
        // If user unchecks save, remove the preference from this specific key's config
        // We still store the URL/Token for the session, but mark savePreference as false
        localStorage.setItem(SIYUAN_CONFIG_KEY_PREFIX + key, JSON.stringify({ url, token, savePreference: false }));
      }
    }
    
    async function ensureSiyuanConfig(forcePrompt = false) {
        let config = getSiyuanConfigFromLocalStorage(); // Use default key
        
        if (!forcePrompt && config && config.url && config.token && config.savePreference) {
            return config; // Return stored config if available and preference was to save
        }

        // Prompt circumstances: 
        // 1. forcePrompt is true
        // 2. No config exists
        // 3. Config exists but savePreference was false (meaning user didn't want to auto-use last time)
        try {
            const modalInitialUrl = config ? config.url : (localStorage.getItem('siyuanServerAddress') || ''); // Legacy or previous session
            const modalInitialToken = config ? config.token : (localStorage.getItem('siyuanApiToken') || ''); // Legacy or previous session
            // Let the modal handle its own 'save' checkbox state internally.
            // The modal should emit 'confirm' with {url, token, shouldSaveFromModalCheckbox}
            const modalResult = await showConfigModal({
                url: modalInitialUrl,
                token: modalInitialToken,
                // The SiyuanConfigModal now internally manages its 'saveConfigInBrowser' state
                // and should ideally return this state upon confirmation.
                // For now, we will assume SiyuanConfigModal has been updated to pass back `savePreference`
            });

            // After modal confirmation, modalResult should be { url, token, savePreference (from modal's checkbox) }
            // If SiyuanConfigModal doesn't return savePreference, we might need to peek at localStorage
            // if it sets a specific key for its checkbox, or assume based on whether it saved url/token.
            
            // const userWantsToSave = modalResult.saveConfig === undefined 
            //                           ? (localStorage.getItem('siyuanConfigShouldSave') === 'true') // Fallback to older modal's way
            //                           : modalResult.saveConfig; 
            const userWantsToSave = modalResult.savePreference; // Directly use from the event payload

            saveSiyuanConfigToLocalStorage(modalResult.url, modalResult.token, userWantsToSave);
            return { url: modalResult.url, token: modalResult.token, savePreference: userWantsToSave };

        } catch (error) {
            // Re-throw errors (like user cancellation) to be handled by the caller
            console.warn('ensureSiyuanConfig: Siyuan config modal error or cancelled:', error.message);
            throw error; 
        }
    }

    async function fetchSiyuanRequest(config, apiPath, method = 'POST', requestBody = {}) {
        if (!config || !config.url || !config.token) {
            throw new Error('Siyuan configuration (URL or Token) is missing.');
        }
        const fullUrl = `${config.url.replace(/\/$/, '')}${apiPath}`;
        const headers = {
            'Authorization': `Token ${config.token}`,
            'Content-Type': 'application/json',
        };

        const fetchOptions = {
            method: method,
            headers: headers,
        };

        if (method === 'POST' || method === 'PUT') {
            fetchOptions.body = JSON.stringify(requestBody);
        }

        try {
            const response = await fetch(fullUrl, fetchOptions);
            if (!response.ok) {
                let errorData;
                try {
                    errorData = await response.json();
                } catch (e) {
                    errorData = { msg: response.statusText, code: response.status };
                }
                throw new Error(`Siyuan API Error (${apiPath}): ${errorData.msg || response.statusText} (Code: ${errorData.code || response.status})`);
            }
            const result = await response.json();
            if (result.code !== 0) {
                throw new Error(`Siyuan API Error (${apiPath}): ${result.msg} (Code: ${result.code})`);
            }
            return result.data; // Assuming result.data is the actual payload
        } catch (networkError) {
            // Catch fetch-related errors (network down, CORS, etc.)
            console.error(`Network or Fetch Error for ${fullUrl}:`, networkError);
            throw new Error(`Network error when calling Siyuan API (${apiPath}): ${networkError.message}`);
        }
    }

    async function fetchSnippetStatusFromSiyuan(config, snippetName, snippetId = null) {
      try {
        const requestPayload = {
            type: "css",
            enabled: 2, // Get both enabled and disabled
        };
        // Если есть ID,优先用ID查询，否则用名称 (keyword)
        // 注意：思源的 getSnippet API 没有直接通过 id 数组或单个 id 查询的参数，
        // 它主要是 keyword (name), type, enabled。所以如果提供了 snippetId，
        // 我们仍然需要获取列表然后自己 find。但如果 name 也唯一，可以先用 name 缩小范围。
        // 如果没有 snippetId, keyword 就是 snippetName。
        // 如果有 snippetId, 我们仍然可以用 snippetName 作为 keyword 来初步过滤，然后用 id 精确查找。
        // 或者，如果思源允许 keyword 为空或我们不传 keyword，则获取所有 CSS，然后用 id 查找。
        // 目前，为了简化，如果提供了 snippetId，我们获取所有，然后通过 id 匹配。
        // 如果没有 snippetId，我们用 snippetName 作为 keyword。

        if (snippetId) {
            // No direct way to query by ID, so we might fetch more and filter.
            // For now, let's assume we still use snippetName as a keyword if available, 
            // or fetch all if snippetName isn't reliable without ID.
            // To be safe, if ID is primary, fetch all and filter by ID.
            // However, getSnippet API needs *something* if not keyword. Or does it?
            // Let's try fetching all CSS if ID is present, then filter.
            // requestPayload.keyword = snippetName; // Keep keyword for now, might help server-side
        } else {
            requestPayload.keyword = snippetName; 
        }

        const data = await fetchSiyuanRequest(config, '/api/snippet/getSnippet', 'POST', requestPayload);
        
        const snippets = data && data.snippets ? data.snippets : [];
        let foundSnippet = null;

        if (snippetId) {
            foundSnippet = snippets.find(s => s.id === snippetId && s.type === "css");
            // 如果用 ID 找到了，但名字和我们预期的 snippetName 不一样，也接受，因为 ID 是更强的标识
        } else {
            // Fallback to name if no ID was provided from meta
            foundSnippet = snippets.find(s => s.name === snippetName && s.type === "css");
        }

        if (foundSnippet) {
          return {
            exists: true,
            id: foundSnippet.id,
            enabled: foundSnippet.enabled,
            content: foundSnippet.content, // For future content diffing
            error: null
          };
        } else {
          return { exists: false, error: null };
        }
      } catch (error) {
        // Log the actual error for debugging, but return a user-friendly message part for UI
        console.error(`Error fetching snippet status for "${snippetName}":`, error);
        return { exists: false, error: error.message || 'Failed to fetch status' }; 
      }
    }
    
    function renderSnippetButtons(blockElement, snippetName, cssCode, status, config, snippetIdFromMeta = null) {
        console.log(`[${new Date().toISOString()}] renderSnippetButtons called for "${snippetName}" (ID from meta: ${snippetIdFromMeta}). Status:`, JSON.parse(JSON.stringify(status)));
        let toolbar = blockElement.querySelector('.snippet-toolbar');
        if (!toolbar) { // Should have been created by enhanceSingleCodeBlock
            console.error(`[${new Date().toISOString()}] Toolbar not found in renderSnippetButtons for "${snippetName}". Aborting render.`);
            return;
        }
        toolbar.innerHTML = ''; // Clear previous content (like "loading...")
        console.log(`[${new Date().toISOString()}] Toolbar cleared for "${snippetName}".`);

        function createButton(text, className, title, onClick) {
            const btn = document.createElement('button');
            btn.textContent = text;
            btn.className = `snippet-btn ${className}`;
            if (title) btn.title = title;
            btn.onclick = async (event) => {
                event.stopPropagation(); // Prevent any other clicks
                const originalText = btn.textContent;
                btn.textContent = '处理中...';
                btn.disabled = true;
                try {
                    console.log(`[${new Date().toISOString()}] Button "${text}" (${className}): onClick started.`);
                    await onClick();
                    console.log(`[${new Date().toISOString()}] Button "${text}" (${className}): onClick finished successfully.`);

                    const parentBlock = toolbar.closest('div.language-css');
                    console.log(`[${new Date().toISOString()}] Button "${text}" (${className}): Parent block for refresh:`, parentBlock ? 'found' : 'NOT FOUND');

                    if (parentBlock) {
                        console.log(`[${new Date().toISOString()}] Button "${text}" (${className}): Calling enhanceSingleCodeBlock to refresh.`);
                        await enhanceSingleCodeBlock(parentBlock, true); // Force refresh
                        console.log(`[${new Date().toISOString()}] Button "${text}" (${className}): enhanceSingleCodeBlock finished.`);
                    } else {
                        console.warn(`[${new Date().toISOString()}] Button "${text}" (${className}): Parent block not found, cannot refresh buttons automatically. Restoring button state.`);
                        // Fallback: Restore button state if parentBlock isn't found for refresh
                        btn.textContent = originalText;
                        btn.disabled = false;
                    }
                } catch (e) {
                    console.error(`[${new Date().toISOString()}] Button "${text}" (${className}): onClick caught error:`, e);
                    alert(`操作失败: ${e.message}`);
                    btn.textContent = originalText; // Restore text on failure
                    btn.disabled = false;
                    // Optionally, can re-render buttons even on failure to show previous state
                    // but if the error was in enhanceSingleCodeBlock itself, this might loop or re-trigger error.
                    // For now, just restore the button. The user can manually retry.
                    // const parentBlock = toolbar.closest('div.language-css');
                    // if(parentBlock) await enhanceSingleCodeBlock(parentBlock); // Avoid re-running enhance if it might be the source of error
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
                if(parentBlock) await enhanceSingleCodeBlock(parentBlock, true); // Force refresh on retry
            });
            console.log(`[${new Date().toISOString()}] Error state rendered for "${snippetName}".`);
            return;
        }

        if (!status.exists) {
            console.log(`[${new Date().toISOString()}] Rendering INSTALL button for "${snippetName}".`);
            createButton('安装到思源', 'snippet-btn-install', '将此CSS片段安装到您的思源笔记中', async () => {
                await handleInstallSnippet(config, snippetName, cssCode, snippetIdFromMeta);
            });
        } else {
            console.log(`[${new Date().toISOString()}] Rendering MANAGE buttons for existing snippet "${snippetName}" (ID: ${status.id}, Enabled: ${status.enabled}).`);
            createButton('卸载', 'snippet-btn-uninstall', `从思源笔记中卸载此CSS片段 (ID: ${status.id})`, async () => {
                if (!confirm(`确定要从思源笔记中卸载（删除）名为 "${snippetName}" 的 CSS 片段吗？`)) {
                    throw new Error("用户取消了卸载操作。"); // Throw to stop button state change
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
                console.log(`[${new Date().toISOString()}] Rendering SYNC button for "${snippetName}" due to content mismatch.`);
                createButton('同步到思源', 'snippet-btn-sync', '思源中的片段内容与当前文档不一致。点击用文档代码覆盖思源版本。', async () => {
                    if (!confirm(`思源中的片段 "${snippetName}" 内容与文档不一致。确定要用文档中的代码覆盖思源中的版本吗？`)) {
                         throw new Error("用户取消了同步操作。");
                    }
                    // Sync is essentially an install with a specific ID and current enabled state
                    await handleInstallSnippet(config, snippetName, cssCode, status.id, status.enabled);
                });
            }
        }
        // Add a general Siyuan Config button that is always available
        createButton('配置思源', 'snippet-btn-config', '打开思源连接配置对话框', async () => {
            try {
                await ensureSiyuanConfig(true); // Force prompt for config
                // No specific action needed after config, refresh will be handled by the main button logic
            } catch (configError) {
                if (configError.message.toLowerCase().includes("cancelled")) {
                    // User cancelled config, maybe show a small notification or just do nothing
                    console.log("Siyuan configuration was cancelled.");
                } else {
                    // Other error during config, could alert or log
                    alert(`配置过程中发生错误: ${configError.message}`);
                }
            }
            // Regardless of config outcome, trigger a refresh of this block's buttons
            // to reflect any potential status change (e.g. if config was missing and is now set)
            const parentBlock = toolbar.closest('div.language-css');
            if(parentBlock) {
                 console.log(`[${new Date().toISOString()}] Config button: Triggering refresh for parent block after config attempt.`);
                 blockElement.removeAttribute('data-snippet-enhanced'); // Allow re-processing for status update
                 await enhanceSingleCodeBlock(parentBlock, true); // Force refresh
            }
        });

        console.log(`[${new Date().toISOString()}] renderSnippetButtons finished for "${snippetName}". Toolbar content:`, toolbar.innerHTML);
    }

    async function handleInstallSnippet(config, snippetName, cssCode, existingId = null, currentEnabledState = true) {
        // This function now correctly fetches all snippets, preserves JS, and updates/adds the CSS one.
        console.log(`[${new Date().toISOString()}] handleInstallSnippet called with name: "${snippetName}", id: ${existingId}, enabled: ${currentEnabledState}`);
        let allSnippetsData = await fetchSiyuanRequest(config, '/api/snippet/getSnippet', 'POST', { type: "all", enabled: 2 });
        let allSnippets = (allSnippetsData && allSnippetsData.snippets) ? allSnippetsData.snippets : [];

        const jsSnippets = allSnippets.filter(s => s.type === 'js');
        let cssSnippets = allSnippets.filter(s => s.type === 'css');

        const newSnippetData = {
            id: existingId || "", 
            name: snippetName,
            content: cssCode,
            enabled: currentEnabledState, 
            type: "css"
        };

        let targetIndex = -1;
        if (existingId) {
            targetIndex = cssSnippets.findIndex(s => s.id === existingId);
        } else {
            targetIndex = cssSnippets.findIndex(s => s.name === snippetName); // Match by name if no ID (new install)
        }

        if (targetIndex > -1) {
            // If it's a fresh install (no existingId) and we found by name, ask for confirmation to overwrite
            if (!existingId && !confirm(`已存在名为 "${snippetName}" 的CSS片段。是否要覆盖它？`)) {
                 throw new Error("用户取消了覆盖操作。");
            }
            newSnippetData.id = cssSnippets[targetIndex].id; // Ensure using the correct ID for update
            cssSnippets[targetIndex] = newSnippetData;
        } else {
            // If existingId was provided but not found, or if it's a new snippet by name and not found, add it.
            // If it was an update by ID that wasn't found, it becomes an add with that ID (Siyuan handles this fine)
            cssSnippets.push(newSnippetData);
        }
        
        await fetchSiyuanRequest(config, '/api/snippet/setSnippet', 'POST', { snippets: [...jsSnippets, ...cssSnippets] });
    }

    async function handleUninstallSnippet(config, snippetIdToUninstall) {
        await fetchSiyuanRequest(config, '/api/snippet/removeSnippet', 'POST', { id: snippetIdToUninstall });
    }

    async function handleToggleSnippetEnable(config, snippetId, snippetName, targetEnabledState) {
        let allSnippetsData = await fetchSiyuanRequest(config, '/api/snippet/getSnippet', 'POST', { type: "all", enabled: 2 });
        let allSnippets = (allSnippetsData && allSnippetsData.snippets) ? allSnippetsData.snippets : [];
        
        const snippetIndex = allSnippets.findIndex(s => s.id === snippetId);
        if (snippetIndex > -1) {
            allSnippets[snippetIndex].enabled = targetEnabledState;
            await fetchSiyuanRequest(config, '/api/snippet/setSnippet', 'POST', { snippets: allSnippets });
        } else {
            // This case should ideally not be reached if status was correct
            throw new Error(`片段 "${snippetName}" (ID: ${snippetId}) 未找到，无法切换启用状态。请尝试刷新页面或重试。`);
        }
    }

    async function enhanceSingleCodeBlock(blockElement, forceRefresh = false) {
        // Add a console log to see when this is called and with what forceRefresh value
        console.log(`[${new Date().toISOString()}] enhanceSingleCodeBlock called for CSS block. forceRefresh: ${forceRefresh}`, blockElement);

        const codeGroup = blockElement.closest('.vp-code-group');
        if (!codeGroup) {
            // console.log(`[${new Date().toISOString()}] Not part of a .vp-code-group. Skipping Siyuan integration.`);
            return; // Not a code-group, skip
        }
        const jsonBlock = codeGroup.querySelector('.language-json');
        if (!jsonBlock) {
            console.log(`[${new Date().toISOString()}] Part of .vp-code-group, but no .language-json found. Skipping Siyuan integration for this CSS block.`);
            return; // No json block for meta, skip
        }

        // If already enhanced and not a forceRefresh, skip to prevent re-processing without need
        // (This check should come AFTER we confirm it's a block we want to process)
        if (!forceRefresh && blockElement.dataset.snippetEnhanced === 'true' && blockElement.querySelector('.snippet-toolbar button')) {
            console.log(`[${new Date().toISOString()}] Skipped refresh: already enhanced with buttons and not forced.`);
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
        toolbar.innerHTML = '提取元数据中...'; // Initial status for user

        let snippetName = `CSS片段-${Date.now()}`; // Default name if meta extraction fails
        let snippetIdFromMeta = null;
        let metaError = null;

        const jsonCodeElement = jsonBlock.querySelector('pre code');
        if (jsonCodeElement) {
            try {
                const metaData = JSON.parse(jsonCodeElement.innerText);
                console.log(`[${new Date().toISOString()}] Parsed snippet-meta JSON:`, metaData);
                if (metaData.name && typeof metaData.name === 'string' && metaData.name.trim() !== '') {
                    snippetName = metaData.name.trim();
                    console.log(`[${new Date().toISOString()}] Using name from snippet-meta: "${snippetName}"`);
                } else {
                    console.warn(`[${new Date().toISOString()}] No valid 'name' found in snippet-meta or it was empty. Using default: "${snippetName}"`);
                }
                if (metaData.id && typeof metaData.id === 'string' && metaData.id.trim() !== '') {
                    snippetIdFromMeta = metaData.id.trim();
                    console.log(`[${new Date().toISOString()}] Using id from snippet-meta: "${snippetIdFromMeta}"`);
                } else {
                    console.log(`[${new Date().toISOString()}] No 'id' found in snippet-meta or it was empty.`);
                }
            } catch (e) {
                metaError = `元数据解析失败: ${e.message}. 请检查 [snippet-meta] JSON 结构。`;
                console.error(`[${new Date().toISOString()}] ${metaError}`, jsonCodeElement.innerText);
            }
        } else {
            metaError = '在 .language-json 块内未找到代码元素 (<pre><code>).元数据提取失败。';
            console.warn(`[${new Date().toISOString()}] ${metaError}`);
        }

        if (metaError) {
            toolbar.innerHTML = `<span class="snippet-status-error" title="${metaError}">${metaError.substring(0, 150)}...</span>`;
            const retryButton = document.createElement('button');
            retryButton.textContent = '重试提取';
            retryButton.className = 'snippet-btn snippet-btn-retry';
            retryButton.onclick = () => {
                blockElement.removeAttribute('data-snippet-enhanced'); // Allow re-processing
                enhanceSingleCodeBlock(blockElement, true);
            };
            toolbar.appendChild(retryButton);
            blockElement.dataset.snippetEnhanced = 'true'; // Mark as processed (even if error)
            return;
        }
        
        const codeElement = blockElement.querySelector('pre code');
        if (!codeElement) {
            toolbar.innerHTML = '<span class="snippet-status-error">错误: 未找到CSS代码元素.</span>';
            console.warn('No CSS code element (pre code) found in CSS block:', blockElement);
            blockElement.dataset.snippetEnhanced = 'true';
            return;
        }
        const cssCode = codeElement.innerText;
        
        console.log(`[${new Date().toISOString()}] Meta extraction successful. Name: "${snippetName}", ID: "${snippetIdFromMeta}". Proceeding to Siyuan status check.`);
        toolbar.innerHTML = '正在检查思源状态...';

        try {
            let config = getSiyuanConfigFromLocalStorage();
            if (!config || !config.url || !config.token) {
                config = await ensureSiyuanConfig();
            }
            
            const status = await fetchSnippetStatusFromSiyuan(config, snippetName, snippetIdFromMeta);
            renderSnippetButtons(blockElement, snippetName, cssCode, status, config, snippetIdFromMeta);
            blockElement.dataset.snippetEnhanced = 'true';

        } catch (error) {
            console.error('Error enhancing code block for Siyuan integration:', error);
            if (toolbar) {
                let errorMessage = '操作出错了。';
                if (error.message.toLowerCase().includes("config cancelled")) {
                    errorMessage = '操作已取消 (思源连接未配置)。';
                } else if (error.message.toLowerCase().includes("missing")) { 
                     errorMessage = '思源连接未配置。';
                } else if (error.message) {
                    errorMessage = `错误: ${error.message.substring(0,100)}${error.message.length > 100 ? '...':''}`;
                }
                toolbar.innerHTML = `<span class="snippet-status-error" title="${error.message}">${errorMessage}</span>`;
                
                const retryOrConfigureBtn = document.createElement('button');
                retryOrConfigureBtn.className = 'snippet-btn snippet-btn-retry';
                retryOrConfigureBtn.textContent = error.message.toLowerCase().includes("config cancelled") || error.message.toLowerCase().includes("missing") ? '配置连接' : '重试';
                retryOrConfigureBtn.onclick = async () => {
                    toolbar.innerHTML = '正在处理...';
                    try {
                        // Force re-config if that was the likely issue
                        if (retryOrConfigureBtn.textContent === '配置连接') {
                             await ensureSiyuanConfig(true);
                        }
                        await enhanceSingleCodeBlock(blockElement, true); // Force refresh on retry
                    } catch (e) { /* Further error, already handled by enhanceSingleCodeBlock's own catch */ }
                };
                toolbar.appendChild(retryOrConfigureBtn);
            }
            blockElement.dataset.snippetEnhanced = 'true'; // Mark so we don't fall into an infinite loop if retry also fails immediately
        }
    }

    function enhanceCodeBlocks() {
      if (typeof window === 'undefined') return;
      nextTick(() => {
        document.querySelectorAll('div.language-css').forEach(block => {
          // Removed the problematic if condition that caused the SyntaxError
          // The logic to prevent re-enhancing will be handled within enhanceSingleCodeBlock
          // or by checking a data-attribute on the block.
          enhanceSingleCodeBlock(block); // This function will be fully fleshed out next
        });
      });
    }

    onMounted(() => {
      enhanceCodeBlocks();
      // 也为自定义组件 ApiTester 保存配置提供支持
      // (如果 ApiTester 的配置也用 localStorage)
    });

    watch(
      () => route.path,
      () => {
        enhanceCodeBlocks(); // 页面切换时重新执行
      },
      { immediate: true } // 初始加载时也执行
    );
  }
} 