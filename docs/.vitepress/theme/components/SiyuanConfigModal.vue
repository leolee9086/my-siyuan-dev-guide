<template>
  <div v-if="visible" class="siyuan-config-modal-overlay" @click.self="handleOverlayClick">
    <div class="siyuan-config-modal">
      <div class="modal-header">
        <h3>配置思源连接参数</h3>
        <button class="close-btn" @click="handleCancel">&times;</button>
      </div>
      <div class="modal-body">
        <div class="form-group">
          <label for="siyuan-url-modal">思源服务器地址:</label>
          <input id="siyuan-url-modal" v-model="siyuanUrl" placeholder="例如: http://127.0.0.1:6806" />
        </div>
        <div class="form-group">
          <label for="siyuan-token-modal">API Token:</label>
          <input id="siyuan-token-modal" v-model="apiToken" type="password" placeholder="请输入你的 API Token" />
           <button @click="toggleTokenVisibility" class="token-toggle-btn-modal">
               {{ showToken ? '隐藏' : '显示' }}
           </button>
        </div>
        <div class="security-warning">
          <p style="color: #e74c3c; font-weight: bold;">⚠️ 安全警告：API Token 拥有操作您整个笔记库的权限！</p>
          <p>请仅在您完全信任的页面（例如本地运行的此页面）或应用中输入。切勿在来源不明的网站或应用中泄露您的 Token！</p>
          <p style="color: #e67e22; margin-top: 5px;">💡 **更安全的建议**：为了避免直接暴露您的主 API Token，可以考虑采用"**临时 Token 模式**"。即在需要执行操作前，手动在思源设置中生成一个临时的 API Token，用这个临时 Token 进行操作。完成后，回到思源设置中将 Token 修改回您常用的主 Token，或删除该临时 Token。</p>
        </div>
        <div class="form-group checkbox-group">
          <input type="checkbox" id="save-config-modal" v-model="saveConfigInBrowser" />
          <label for="save-config-modal">在浏览器中保存此配置 (方便下次使用)</label>
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn-modal btn-cancel" @click="handleCancel">取消</button>
        <button class="btn-modal btn-confirm" @click="handleConfirm" :disabled="!siyuanUrl || !apiToken">
          {{ confirmText }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';

const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
  initialUrl: {
    type: String,
    default: '',
  },
  initialToken: {
    type: String,
    default: '',
  },
  confirmText: {
    type: String,
    default: '确认并继续'
  },
  allowSave: { // 是否允许显示"保存配置"选项
    type: Boolean,
    default: true,
  }
});

const emit = defineEmits(['update:visible', 'confirm', 'cancel']);

const siyuanUrl = ref('');
const apiToken = ref('');
const saveConfigInBrowser = ref(false);
const showToken = ref(false);

onMounted(() => {
  // 优先使用传入的初始值，否则尝试从 localStorage 加载
  siyuanUrl.value = props.initialUrl || (props.allowSave ? localStorage.getItem('siyuanServerAddress') : '') || 'http://127.0.0.1:6806';
  apiToken.value = props.initialToken || (props.allowSave ? localStorage.getItem('siyuanApiToken') : '') || '';
  if (props.allowSave && localStorage.getItem('siyuanConfigShouldSave') === 'true') {
    saveConfigInBrowser.value = true;
  }
});

watch(() => props.visible, (newVal) => {
  if (newVal) {
    // 每次显示时，都重新加载一下配置，确保使用的是最新的（如果外部有修改）
    // 或者保持上次输入的状态，这里我们选择保持，除非有 initial 值
    if (!props.initialUrl) {
        siyuanUrl.value = (props.allowSave && localStorage.getItem('siyuanServerAddress')) || 'http://127.0.0.1:6806';
    } else {
        siyuanUrl.value = props.initialUrl;
    }
    if (!props.initialToken) {
        apiToken.value = (props.allowSave && localStorage.getItem('siyuanApiToken')) || '';
    } else {
        apiToken.value = props.initialToken;
    }
  }
});


function toggleTokenVisibility() {
    showToken.value = !showToken.value;
    // 需要确保 modal 内的 input id 是唯一的，或者通过 ref 操作
    const tokenInput = document.getElementById('siyuan-token-modal');
    if (tokenInput) {
        tokenInput.type = showToken.value ? 'text' : 'password';
    }
}

function handleConfirm() {
  if (!siyuanUrl.value || !apiToken.value) return;

  if (props.allowSave && saveConfigInBrowser.value) {
    localStorage.setItem('siyuanServerAddress', siyuanUrl.value.trim());
    localStorage.setItem('siyuanApiToken', apiToken.value.trim());
    localStorage.setItem('siyuanConfigShouldSave', 'true');
  } else if (props.allowSave) {
    // 如果用户取消勾选保存，则清除之前的保存标记
    localStorage.removeItem('siyuanConfigShouldSave');
    // 也可以选择清除已保存的 token 和 url，看产品逻辑
    // localStorage.removeItem('siyuanServerAddress');
    // localStorage.removeItem('siyuanApiToken');
  }
  emit('confirm', {
    url: siyuanUrl.value.trim(),
    token: apiToken.value.trim(),
    savePreference: saveConfigInBrowser.value
  });
  emit('update:visible', false);
}

function handleCancel() {
  emit('cancel');
  emit('update:visible', false);
}

function handleOverlayClick() {
  // 默认点击遮罩层也会关闭
  handleCancel();
}

</script>

<style scoped>
.siyuan-config-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000; /* 比 VitePress 默认组件高一些 */
}

.siyuan-config-modal {
  background-color: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  padding: 25px;
  border-radius: 8px;
  box-shadow: 0 5px 20px rgba(0,0,0,0.2);
  width: 90%;
  max-width: 550px;
  display: flex;
  flex-direction: column;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 1px solid var(--vp-c-divider);
}

.modal-header h3 {
  margin: 0;
  font-size: 1.3em;
  font-weight: 600;
}

.close-btn {
  background: none;
  border: none;
  font-size: 2em;
  line-height: 1;
  cursor: pointer;
  color: var(--vp-c-text-2);
  padding: 0 5px;
}
.close-btn:hover {
  color: var(--vp-c-text-1);
}

.modal-body .form-group {
  margin-bottom: 18px;
}

.modal-body label {
  display: block;
  margin-bottom: 6px;
  font-weight: 500;
  font-size: 0.95em;
}

.modal-body input[type="text"],
.modal-body input[type="password"] {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  font-size: 1em;
  background-color: var(--vp-c-bg-soft); /* Use a slightly different bg for inputs */
  color: var(--vp-c-text-1);
}
.modal-body input[type="text"]:focus,
.modal-body input[type="password"]:focus {
  border-color: var(--vp-c-brand-1);
  outline: none;
  box-shadow: 0 0 0 2px var(--vp-c-brand-soft);
}

.token-toggle-btn-modal {
    padding: 8px 10px;
    font-size: 0.85em;
    margin-left: 8px;
    border: 1px solid var(--vp-c-divider);
    border-radius: 4px;
    background-color: var(--vp-c-bg-mute);
    cursor: pointer;
}
.token-toggle-btn-modal:hover {
    border-color: var(--vp-c-brand-1);
}


.security-warning {
  background-color: var(--vp-c-yellow-soft);
  color: var(--vp-c-text-2);
  border: 1px solid var(--vp-c-yellow-dimm-1);
  padding: 12px 15px;
  border-radius: 6px;
  font-size: 0.85em;
  line-height: 1.5;
  margin-top: 10px;
  margin-bottom: 20px;
}
.security-warning p {
    margin-bottom: 8px;
}
.security-warning p:last-child {
    margin-bottom: 0;
}

.checkbox-group {
  display: flex;
  align-items: center;
}
.checkbox-group input[type="checkbox"] {
  margin-right: 8px;
  width: 16px; /* Custom size */
  height: 16px; /* Custom size */
  accent-color: var(--vp-c-brand-1);
}
.checkbox-group label {
  margin-bottom: 0; /* Reset margin for inline label */
  font-weight: normal;
  font-size: 0.9em;
  color: var(--vp-c-text-2);
}


.modal-footer {
  margin-top: 25px;
  padding-top: 20px;
  border-top: 1px solid var(--vp-c-divider);
  display: flex;
  justify-content: flex-end;
  gap: 12px; /* Space between buttons */
}

.btn-modal {
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.95em;
  font-weight: 500;
  transition: background-color 0.2s ease, opacity 0.2s ease;
}

.btn-confirm {
  background-color: var(--vp-c-brand-1);
  color: white;
}
.btn-confirm:hover {
  background-color: var(--vp-c-brand-2);
}
.btn-confirm:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-cancel {
  background-color: var(--vp-c-gray-soft);
  color: var(--vp-c-text-2);
  border: 1px solid var(--vp-c-divider);
}
.btn-cancel:hover {
  background-color: var(--vp-c-gray-lighter);
  border-color: var(--vp-c-gray-light-1);
}
</style> 