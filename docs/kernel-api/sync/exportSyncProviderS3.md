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
