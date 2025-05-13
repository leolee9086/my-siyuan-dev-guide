export const SIYUAN_API_ERROR = 'SiyuanApiError';

export async function fetchSiyuanRequest(config, apiPath, method = 'POST', requestBody = {}) {
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
            const err = new Error(`Siyuan API Error (${apiPath}): ${errorData.msg || response.statusText} (Code: ${errorData.code || response.status})`);
            // err.name = SIYUAN_API_ERROR; // Optionally tag the error
            throw err;
        }
        const result = await response.json();
        if (result.code !== 0) {
            const err = new Error(`Siyuan API Error (${apiPath}): ${result.msg} (Code: ${result.code})`);
            // err.name = SIYUAN_API_ERROR;
            throw err;
        }
        return result.data; // Assuming result.data is the actual payload
    } catch (networkError) {
        console.error(`Network or Fetch Error for ${fullUrl}:`, networkError);
        const err = new Error(`Network error when calling Siyuan API (${apiPath}): ${networkError.message}`);
        // err.name = SIYUAN_API_ERROR; // If you want to categorize all errors from this function
        throw err;
    }
}

export async function fetchSnippetStatusFromSiyuan(config, snippetName, snippetId = null) {
    try {
        const requestPayload = {
            type: "css",
            enabled: 2, 
        };
        if (!snippetId) { // Only use keyword if no ID is present to avoid confusion
            requestPayload.keyword = snippetName; 
        }

        const data = await fetchSiyuanRequest(config, '/api/snippet/getSnippet', 'POST', requestPayload);
        
        const snippets = data && data.snippets ? data.snippets : [];
        let foundSnippet = null;

        if (snippetId) {
            foundSnippet = snippets.find(s => s.id === snippetId && s.type === "css");
        } else {
            foundSnippet = snippets.find(s => s.name === snippetName && s.type === "css");
        }

        if (foundSnippet) {
          return {
            exists: true,
            id: foundSnippet.id,
            enabled: foundSnippet.enabled,
            content: foundSnippet.content, 
            error: null
          };
        } else {
          return { exists: false, error: null };
        }
      } catch (error) {
        console.error(`Error fetching snippet status for "${snippetName}" (ID: ${snippetId || 'N/A'}):`, error);
        return { exists: false, error: error.message || 'Failed to fetch status' }; 
      }
}

export async function handleInstallSnippet(config, snippetName, cssCode, existingId = null, currentEnabledState = true) {
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
        targetIndex = cssSnippets.findIndex(s => s.name === snippetName); 
    }

    if (targetIndex > -1) {
        if (!existingId && !confirm(`已存在名为 "${snippetName}" 的CSS片段。是否要覆盖它？`)) {
             throw new Error("用户取消了覆盖操作。");
        }
        newSnippetData.id = cssSnippets[targetIndex].id; 
        cssSnippets[targetIndex] = newSnippetData;
    } else {
        cssSnippets.push(newSnippetData);
    }
    
    await fetchSiyuanRequest(config, '/api/snippet/setSnippet', 'POST', { snippets: [...jsSnippets, ...cssSnippets] });
}

export async function handleUninstallSnippet(config, snippetIdToUninstall) {
    await fetchSiyuanRequest(config, '/api/snippet/removeSnippet', 'POST', { id: snippetIdToUninstall });
}

export async function handleToggleSnippetEnable(config, snippetId, snippetName, targetEnabledState) {
    let allSnippetsData = await fetchSiyuanRequest(config, '/api/snippet/getSnippet', 'POST', { type: "all", enabled: 2 });
    let allSnippets = (allSnippetsData && allSnippetsData.snippets) ? allSnippetsData.snippets : [];
    
    const snippetIndex = allSnippets.findIndex(s => s.id === snippetId);
    if (snippetIndex > -1) {
        allSnippets[snippetIndex].enabled = targetEnabledState;
        await fetchSiyuanRequest(config, '/api/snippet/setSnippet', 'POST', { snippets: allSnippets });
    } else {
        throw new Error(`片段 "${snippetName}" (ID: ${snippetId}) 未找到，无法切换启用状态。请尝试刷新页面或重试。`);
    }
} 