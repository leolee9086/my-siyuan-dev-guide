<template>
  <div class="api-tester">
    <!-- 配置区域 -->
    <details class="config-section" open>
        <summary>API 配置</summary>
        <div class="config-content">
            <div class="form-group">
                <label for="siyuan-server-address">思源服务器地址:</label>
                <input id="siyuan-server-address" v-model="siyuanServerAddressInput" placeholder="例如: http://127.0.0.1:6806" />
            </div>
            <div class="form-group">
                <label for="siyuan-api-token">API Token:</label>
                <input id="siyuan-api-token" v-model="apiTokenInput" type="password" placeholder="请输入你的 API Token" />
                 <button @click="toggleTokenVisibility" class="token-toggle-btn">
                     {{ showToken ? '隐藏' : '显示' }}
                 </button>
            </div>
            <button @click="saveConfig" class="save-config-btn">保存配置</button>
            <span v-if="configSaved" class="config-saved-msg">配置已保存!</span>
        </div>
    </details>
   <slot name="warning"></slot>
    <!-- API 测试表单 -->
    <form @submit.prevent="sendRequest" class="test-form">
      <h3>{{ title || 'API 在线测试' }}</h3>
      <!-- 动态参数输入 -->
      <div v-for="param in params" :key="param.name" class="form-group">
        <label :for="`param-${param.name}`">
          {{ param.label || param.name }}
          <span v-if="param.required" class="required">*</span>
        </label>
        <input
          :id="`param-${param.name}`"
          v-model="formValues[param.name]"
          :type="param.type === 'number' ? 'number' : 'text'"
          :placeholder="param.placeholder || ''"
          :required="param.required"
        />
        <small v-if="param.description">{{ param.description }}</small>
      </div>

      <button type="submit" :disabled="isLoading || !isConfigured">
        {{ isLoading ? '发送中...' : '发送请求' }}
      </button>
       <span v-if="!isConfigured" class="config-warning-inline"> (请先保存 API 配置)</span>
    </form>

    <!-- 请求详情 -->
    <div v-if="requestDetails" class="request-details">
      <h4>请求详情</h4>
      <pre>{{ requestDetails }}</pre>
    </div>

    <!-- 响应结果 -->
    <div v-if="responseDetails" class="response-details">
      <h4>响应结果</h4>
      <pre :class="{ 'error': responseIsError }">{{ responseDetails }}</pre>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted, watch } from 'vue'

interface ApiParam {
  name: string
  label?: string
  type: 'string' | 'number' | 'boolean' // 可以根据需要扩展
  required?: boolean
  placeholder?: string
  description?: string
  defaultValue?: any
}

const props = defineProps<{
  title?: string
  endpoint: string
  method?: 'GET' | 'POST' // 默认为 POST
  params: ApiParam[]
}>()

const formValues = reactive<Record<string, any>>({})
const isLoading = ref(false)
const requestDetails = ref<string | null>(null)
const responseDetails = ref<string | null>(null)
const responseIsError = ref(false)
const siyuanServerAddress = ref('')
const apiToken = ref('')
const siyuanServerAddressInput = ref('')
const apiTokenInput = ref('')
const configSaved = ref(false)
const showToken = ref(false)

// 检查和加载配置
onMounted(() => {
  loadConfig()
  // 初始化表单值 - 移到这里
  if (props.params && Array.isArray(props.params)) {
      props.params.forEach(param => {
        formValues[param.name] = param.defaultValue === undefined ? '' : param.defaultValue
      })
  } else {
      console.warn('ApiTester: props.params is undefined or not an array during onMounted. Form values may not be initialized correctly.');
  }
})

function loadConfig() {
  siyuanServerAddress.value = localStorage.getItem('siyuanServerAddress') || window.location.origin
  apiToken.value = localStorage.getItem('siyuanApiToken') || ''
  siyuanServerAddressInput.value = siyuanServerAddress.value
  apiTokenInput.value = apiToken.value
}

function saveConfig() {
  siyuanServerAddress.value = siyuanServerAddressInput.value.trim() || window.location.origin
  apiToken.value = apiTokenInput.value.trim()

  localStorage.setItem('siyuanServerAddress', siyuanServerAddress.value)
  localStorage.setItem('siyuanApiToken', apiToken.value)
  configSaved.value = true
  // 短暂显示保存成功信息
  setTimeout(() => { configSaved.value = false }, 2000)
  console.log('API 配置已保存到 localStorage')
}

// 切换 API Token 可见性
function toggleTokenVisibility() {
    showToken.value = !showToken.value;
    const tokenInput = document.getElementById('siyuan-api-token') as HTMLInputElement | null;
    if (tokenInput) {
        tokenInput.type = showToken.value ? 'text' : 'password';
    }
}

// 监听输入变化，实时更新内部状态（但不保存到localStorage，除非点击保存）
watch(siyuanServerAddressInput, (newVal) => {
    siyuanServerAddress.value = newVal.trim() || window.location.origin;
});
watch(apiTokenInput, (newVal) => {
    apiToken.value = newVal.trim();
});

const isConfigured = computed(() => !!apiToken.value && !!siyuanServerAddress.value)

async function sendRequest() {
  if (!isConfigured.value || isLoading.value) return

  // 在处理参数前增加检查
  if (!props.params || !Array.isArray(props.params)) {
      console.error('ApiTester Error: props.params is invalid inside sendRequest. Received:', props.params);
      responseDetails.value = '内部错误：API 参数定义无效，无法发送请求。请检查组件调用。';
      responseIsError.value = true;
      isLoading.value = false; // 确保重置加载状态
      return;
  }

  isLoading.value = true
  responseDetails.value = '等待服务器响应...'
  responseIsError.value = false

  const apiUrl = `${siyuanServerAddress.value}${props.endpoint}`
  const requestMethod = props.method || 'POST'
  const headers: HeadersInit = {
    'Authorization': `Token ${apiToken.value}`,
    'Content-Type': 'application/json'
  }
  let requestBody: string | undefined = undefined

  // 构建请求体 (仅 POST)
  if (requestMethod === 'POST') {
    const bodyData: Record<string, any> = {}
    props.params.forEach(param => {
        // 简单处理，实际可能需要根据 param.type 转换
        if (formValues[param.name] !== '') { // 避免发送空字符串参数，除非明确需要
             bodyData[param.name] = formValues[param.name]
        }
    })
    requestBody = JSON.stringify(bodyData)
  }
  // TODO: 处理 GET 请求参数 (附加到 URL)

  requestDetails.value = `
${requestMethod} ${apiUrl}
Headers:
  Authorization: Token ${apiToken.value.substring(0, 8)}...
  Content-Type: application/json
${requestMethod === 'POST' ? `Body:
${requestBody}` : ''}
  `.trim()

  try {
    const response = await fetch(apiUrl, {
      method: requestMethod,
      headers: headers,
      body: requestBody,
    })

    const responseData = await response.json()
    responseDetails.value = JSON.stringify(responseData, null, 2)
    responseIsError.value = response.status !== 200 || responseData.code !== 0

  } catch (error: any) {
    console.error('API Test Error:', error)
    responseDetails.value = `请求失败:
${error.message}
请检查控制台获取更多信息，并确认思源服务 (${siyuanServerAddress.value}) 可访问。`
    responseIsError.value = true
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
.api-tester {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 1.5rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
  background-color: var(--vp-c-bg-soft);
}

.api-tester h3 {
  margin-top: 0;
  margin-bottom: 1rem;
  font-size: 1.1em;
  font-weight: 600;
}

.config-warning {
  background-color: var(--vp-c-yellow-soft);
  color: var(--vp-c-yellow-darker);
  border: 1px solid var(--vp-c-yellow-dimm-1);
  padding: 0.8rem 1rem;
  border-radius: 4px;
  margin-bottom: 1rem;
  font-size: 0.9em;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  font-size: 0.9em;
}

.form-group .required {
  color: var(--vp-c-red-1);
  margin-left: 0.2em;
}

.form-group input {
  width: 100%;
  padding: 0.6rem 0.8rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  font-size: 0.9em;
  background-color: var(--vp-c-bg);
  color: var(--vp-c-text-1);
}

.form-group input:focus {
  border-color: var(--vp-c-brand-1);
  outline: none;
}

.form-group small {
    display: block;
    font-size: 0.8em;
    color: var(--vp-c-text-2);
    margin-top: 0.3rem;
}


button[type="submit"] {
  background-color: var(--vp-c-brand-1);
  color: var(--vp-c-bg);
  border: none;
  padding: 0.6rem 1.2rem;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;
  transition: background-color 0.2s ease;
}

button[type="submit"]:hover {
  background-color: var(--vp-c-brand-2);
}

button[type="submit"]:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.request-details,
.response-details {
  margin-top: 1.5rem;
}

.request-details h4,
.response-details h4 {
  margin-bottom: 0.8rem;
  font-size: 1em;
  font-weight: 600;
}

pre {
  background-color: var(--vp-code-block-bg);
  padding: 1rem;
  border-radius: 4px;
  overflow-x: auto;
  font-size: 0.85em;
  line-height: 1.6;
}

pre.error {
    border: 1px solid var(--vp-c-red-dimm-1);
    background-color: var(--vp-c-red-soft);
    color: var(--vp-c-red-darker);
}

/* 配置区域样式 */
.config-section summary {
  cursor: pointer;
  font-weight: 600;
  margin-bottom: 1rem;
  list-style: none; /* 隐藏默认的三角箭头 */
  position: relative;
  padding-left: 1.5rem;
}
.config-section summary::-webkit-details-marker { /* Chrome/Safari */
    display: none;
}
.config-section summary::before { /* 自定义箭头 */
    content: '▶';
    position: absolute;
    left: 0;
    top: 0;
    font-size: 0.8em;
    transition: transform 0.2s ease-in-out;
}
.config-section[open] summary::before {
    transform: rotate(90deg);
}


.config-content {
    padding-left: 1.5rem; /* 与 summary 左侧 padding 对齐 */
    border-left: 2px solid var(--vp-c-divider); /* 可选：增加视觉分隔 */
    margin-left: 0.5rem; /* 调整左边距 */
    padding-top: 0.5rem;
}


#siyuan-api-token {
    width: calc(100% - 60px); /* 留出按钮空间 */
    margin-right: 5px;
}

.token-toggle-btn {
    padding: 0.6rem 0.8rem;
    font-size: 0.8em;
    vertical-align: baseline; /* 对齐输入框 */
}

.save-config-btn {
    margin-top: 0.5rem;
    margin-right: 10px;
    background-color: var(--vp-c-green-soft);
    color: var(--vp-c-green-darker);
    border: 1px solid var(--vp-c-green-dimm-1);
}
.save-config-btn:hover {
    background-color: var(--vp-c-green-dimm-1);
}
.config-saved-msg {
    color: var(--vp-c-green-darker);
    font-size: 0.9em;
    margin-left: 10px;
}

/* 测试表单区域 */
.test-form {
    margin-top: 1.5rem;
    padding-top: 1.5rem;
    border-top: 1px solid var(--vp-c-divider);
}
.test-form h3 {
    margin-top: 0;
    margin-bottom: 1rem;
    font-size: 1.1em;
    font-weight: 600;
}


.config-warning-inline {
  color: var(--vp-c-yellow-darker);
  font-size: 0.9em;
  margin-left: 10px;
}

</style> 