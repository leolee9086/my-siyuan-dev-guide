---
title: 导出S3同步配置 (exportSyncProviderS3)
---
# 端点

/api/sync/exportSyncProviderS3

# 导出S3同步配置 (exportSyncProviderS3)

POST /api/sync/exportSyncProviderS3

## 认证与权限

需要身份验证 (通过 API Token)。

需要管理员权限。

## 接口描述

此接口用于导出现有的 Amazon S3 云同步服务配置。

导出的配置是一个经过 AES 加密的 JSON 文件，该 JSON 文件被打包在一个 ZIP 压缩包内供用户下载。文件名格式为 `siyuan-s3-YYYYMMDDHHMMSS.json.zip`。

如果当前没有配置 S3 服务，导出的将是一个包含空 S3 配置对象的加密文件。

**注意：**这是一个文件下载接口。成功调用后，浏览器将开始下载一个 ZIP 文件，而不是返回一个 JSON 响应体。

## 请求体参数

该接口不需要请求体参数。

## 请求体示例

```json
{}
```

## 响应体说明

-   **成功时:**
    -   HTTP 状态码: `200 OK`
    -   `Content-Type`: `application/octet-stream`
    -   `Content-Disposition`: `attachment; filename="siyuan-s3-YYYYMMDDHHMMSS.json.zip"`
    -   响应体: ZIP 文件的二进制内容。
-   **失败时 (例如，无法创建临时文件、加密失败等):**
    -   HTTP 状态码: 通常是 `200 OK` (因为 `defer c.JSON` 在 Gin 中可能在 `c.File` 调用前设置了状态码) 或特定错误码。
    -   响应体: 标准的思源笔记 API JSON 错误响应结构：
        
        ```json
        {
            "code": -1, // 非 0 的错误码
            "msg": "具体的错误信息",
            "data": null
        }
        ```
        

## cURL 调用示例

```bash
# 执行此命令会将下载的 zip 文件保存为 output.zip
curl -X POST \
  http://127.0.0.1:6806/api/sync/exportSyncProviderS3 \
  -H 'Authorization: Token YOUR_API_TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{}' \
  -o output-s3-config.zip
```

## JavaScript 调用示例

```javascript
async function exportS3Config() {
    try {
        const response = await fetch('/api/sync/exportSyncProviderS3', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token YOUR_API_TOKEN' // 如果配置了API Token
            },
            body: JSON.stringify({})
        });

        if (response.ok && response.headers.get("Content-Type") === "application/octet-stream") {
            const contentDisposition = response.headers.get('Content-Disposition');
            let filename = 'siyuan-s3-config.zip'; // 默认文件名
            if (contentDisposition) {
                const filenameMatch = contentDisposition.match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/i);
                if (filenameMatch && filenameMatch[1]) {
                    filename = filenameMatch[1].replace(/['"]/g, '');
                }
            }
            
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            a.remove();
            console.log('S3 配置导出成功，下载已开始。');
            document.getElementById('apiResponse').textContent = 'S3 配置导出成功，下载应该已经开始: ' + filename;
        } else {
            // 尝试解析可能的JSON错误响应
            const errorData = await response.json().catch(() => null);
            if (errorData && errorData.msg) {
                console.error('导出S3配置失败:', errorData.msg);
                document.getElementById('apiResponse').textContent = `错误 ${errorData.code}: ${errorData.msg}`;
            } else {
                console.error('导出S3配置失败，响应状态:', response.status);
                document.getElementById('apiResponse').textContent = `导出失败，状态码: ${response.status}`;
            }
        }
    } catch (error) {
        console.error('请求过程中发生错误:', error);
        document.getElementById('apiResponse').textContent = `请求错误: ${error.message}`;
    }
}
```

::: danger 警告：API Token 与 S3 配置安全
请**绝对不要**在任何您不完全信任的网站或第三方工具中输入您的思源笔记 API Token。
API Token 拥有与您账户相同的权限，泄露可能导致数据被恶意访问或修改。

**特别注意**：对于 S3 同步配置，如果您的 API Token 泄露，攻击者可能通过调用此 API 或其他相关 API 获取您的 S3 访问凭证 (Access Key ID 和 Secret Access Key)。这不仅会暴露您存储在 S3 上的笔记数据，还可能被恶意利用产生**大量的 S3 API 调用和流量费用**，造成经济损失。请务必妥善保管您的 API Token。

此文档站点的在线测试功能是在浏览器本地处理 Token 并直接与您的本地思源实例通信，相对安全，但仍需谨慎。
你可以使用一个专门的测试笔记本或者自行编写测试以保证安全。
:::

## 在线测试

导出 S3 同步配置

### 状态:

点击按钮后，此处将显示操作状态。
> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/bazaar.go](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/bazaar.go) 中的源码为准。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
> 本文档非官方出品，主要由 AI 辅助编写，不保证绝对准确。如有疑问，请以 [kernel/api/](https://github.com/siyuan-note/siyuan/blob/master/kernel/api/) 中的源码为准。
> 
> 如果您觉得本文档有帮助，可以考虑赞助支持：[爱发电](https://afdian.com/a/leolee9086?tab=feed)
