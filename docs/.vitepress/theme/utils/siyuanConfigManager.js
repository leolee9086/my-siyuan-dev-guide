import { createApp, h } from 'vue';
import SiyuanConfigModal from '../components/SiyuanConfigModal.vue';

export const SIYUAN_CONFIG_KEY_PREFIX = 'siyuanVitePressConfig_';

// Used to manage dynamically created modal instances
let modalAppInstance = null; // Renamed from modalInstance to avoid confusion with component instance
let modalContainerElement = null; // Renamed from modalContainer

export function showConfigModal(initialConfig = {}) {
  return new Promise((resolve, reject) => {
    if (modalAppInstance) {
      modalAppInstance.unmount();
      if (modalContainerElement && modalContainerElement.parentNode) {
        modalContainerElement.parentNode.removeChild(modalContainerElement);
      }
      modalAppInstance = null;
      modalContainerElement = null;
    }

    modalContainerElement = document.createElement('div');
    document.body.appendChild(modalContainerElement);

    const app = createApp({
      render() {
        return h(SiyuanConfigModal, {
          visible: true,
          initialUrl: initialConfig.url,
          initialToken: initialConfig.token,
          onConfirm: (data) => {
            resolve(data); // data should be { url, token, savePreference }
            app.unmount();
            if (modalContainerElement && modalContainerElement.parentNode) {
              modalContainerElement.parentNode.removeChild(modalContainerElement);
            }
            modalAppInstance = null; 
            modalContainerElement = null;
          },
          onCancel: () => {
            reject(new Error('Config cancelled by user'));
            app.unmount();
            if (modalContainerElement && modalContainerElement.parentNode) {
              modalContainerElement.parentNode.removeChild(modalContainerElement);
            }
            modalAppInstance = null;
            modalContainerElement = null;
          },
        });
      },
    });
    
    modalAppInstance = app.mount(modalContainerElement);
  });
}

export function getSiyuanConfigFromLocalStorage(key = 'default') {
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

export function saveSiyuanConfigToLocalStorage(url, token, shouldSave, key = 'default') {
  if (shouldSave) {
    localStorage.setItem(SIYUAN_CONFIG_KEY_PREFIX + key, JSON.stringify({ url, token, savePreference: true }));
  } else {
    localStorage.setItem(SIYUAN_CONFIG_KEY_PREFIX + key, JSON.stringify({ url, token, savePreference: false }));
  }
}

export async function ensureSiyuanConfig(forcePrompt = false) {
    let config = getSiyuanConfigFromLocalStorage();
    
    if (!forcePrompt && config && config.url && config.token && config.savePreference) {
        return config;
    }

    try {
        const modalInitialUrl = config ? config.url : (localStorage.getItem('siyuanServerAddress') || '');
        const modalInitialToken = config ? config.token : (localStorage.getItem('siyuanApiToken') || '');
        
        const modalResult = await showConfigModal({
            url: modalInitialUrl,
            token: modalInitialToken,
        });

        // modalResult is { url, token, savePreference }
        saveSiyuanConfigToLocalStorage(modalResult.url, modalResult.token, modalResult.savePreference);
        return { url: modalResult.url, token: modalResult.token, savePreference: modalResult.savePreference };

    } catch (error) {
        console.warn('ensureSiyuanConfig: Siyuan config modal error or cancelled:', error.message);
        throw error; 
    }
} 