# 通过外部页面部署思源笔记挂件

除了通过标准的打包 `package.zip` 并上架集市的方式，或者手动将挂件文件夹放入 `data/widgets/` 目录外，还可以通过一个外部的 HTML 页面配合 JavaScript 来调用思源笔记的 API，实现挂件的动态部署。

这种方式在以下场景可能非常有用：

*   **开发与调试**：在开发挂件时，可以快速将本地修改的文件部署到思源笔记进行测试，而无需频繁打包或手动复制。
*   **批量部署工具**：如果你管理多个挂件或需要在多个思源实例中部署，可以创建一个统一的部署管理页面。
*   **自定义部署流程**：可以集成更复杂的逻辑，例如部署前进行配置修改、版本检查等。

## 核心原理

这种部署方式的核心是利用思源笔记提供的 `/api/file/putFile` HTTP API 接口。通过向这个接口发送 `POST` 请求，可以将文件上传到思源笔记工作空间的指定路径。对于挂件而言，目标路径通常是 `data/widgets/{挂件名称}/{文件名}`。

## 必要信息

要成功调用 API，前端页面至少需要获取以下两项信息：

1.  **思源笔记实例 URL**: 例如 `http://127.0.0.1:6806`。这是 API 请求的目标地址。
2.  **API Token**: 在思源笔记的"设置 - 关于 - API Token"中找到。这是身份验证凭据。

## 前端实现步骤

以下是前端 JavaScript 实现部署逻辑的主要步骤，思路参考了 `tinySiyuanWidgets/index.html` 项目中的 `deployWidget` 函数：

1.  **获取用户输入**:
    *   提供输入框让用户填写思源笔记实例 URL 和 API Token。
    *   在发起部署前，校验这两个值是否已填写。

2.  **确定挂件文件列表**:
    *   对于要部署的挂件，需要知道它包含哪些文件。
    *   一种方式是，在挂件的目录下维护一个 `file-list.json` 文件，其中以 JSON 数组的形式列出所有需要部署的文件名。前端通过 `fetch` API 读取这个列表。
        ```json
        // 示例：my-widget/file-list.json
        {
          "files": [
            "widget.json",
            "index.html",
            "style.css",
            "script.js",
            "icon.png",
            "preview.png",
            "README.md"
          ]
        }
        ```
    *   如果 `file-list.json` 不存在或无法获取，可以提供一个默认的文件列表，例如 `['widget.json', 'index.html', 'style.css', 'script.js']`。

3.  **遍历并上传每个文件**:
    *   对文件列表中的每一个文件名：
        a.  **读取文件内容**: 使用 `fetch` API 从挂件的相对路径读取该文件的文本内容 (或二进制内容，如图标)。
        
        ```javascript
        const fileResponse = await fetch(`${widgetName}/${filename}`);
        if (!fileResponse.ok) {
            // 处理错误
            continue;
        }
        const fileContent = await fileResponse.text(); // 或 fileResponse.blob() for binary
        ```
        b.  **创建 `Blob` 和 `FormData`**:
            将获取到的文件内容转换为 `Blob` 对象，然后创建一个 `FormData` 对象，用于构建 API 请求体。
        ```javascript
        const fileBlob = new Blob([fileContent], { type: 'application/octet-stream' }); // 根据文件类型调整MIME type
        const formData = new FormData();
        formData.append('path', `data/widgets/${widgetName}/${filename}`); // 目标路径
        formData.append('isDir', 'false'); // 表明是文件
        formData.append('modTime', Date.now().toString()); // 文件修改时间戳
        formData.append('file', fileBlob, filename); // 文件Blob和原始文件名
        ```
        c.  **发送 API 请求**:
            使用 `fetch` API 向思源笔记实例的 `/api/file/putFile` 地址发送 `POST` 请求。
        ```javascript
        const siyuanUrl = 'http://127.0.0.1:6806'; // 从用户输入获取
        const siyuanToken = 'YOUR_API_TOKEN';    // 从用户输入获取

        const apiResponse = await fetch(`${siyuanUrl}/api/file/putFile`, {
            method: 'POST',
            headers: {
                'Authorization': `Token ${siyuanToken}`
            },
            body: formData
        });
        ```
        d.  **处理 API 响应**:
            检查 API 的响应状态。思源 API 成功时通常返回 `code: 0`。
        ```javascript
        if (apiResponse.ok) {
            const result = await apiResponse.json();
            if (result.code === 0) {
                // 文件部署成功
            } else {
                // 文件部署失败，result.msg 包含错误信息
            }
        } else {
            // API 请求本身失败 (如网络错误, 401未授权等)
        }
        ```

4.  **提供状态反馈**:
    在页面的某个区域实时显示部署进度、成功或失败的消息，给用户明确的反馈。

## 安全警告 ⚠️

*   **API Token 的重要性**: API Token 拥有操作整个笔记库的权限。**务必只在完全信任的页面（例如本地运行的此部署页面）或应用中输入。切勿在来源不明的网站或应用中泄露您的 Token！**
*   **更安全的建议**: 考虑使用"临时 Token 模式"。即在需要执行部署操作前，手动在思源设置中生成一个临时的 API Token，用这个临时 Token 在此页面进行部署。部署完成后，回到思源设置中将 Token 修改回您常用的主 Token，或删除该临时 Token。

## 示例参考

具体的实现可以参考开源项目 [思源笔记小挂件集合 (tinySiyuanWidgets)](https://leolee9086.github.io/tinySiyuanWidgets/)。其主页面（通常是 `index.html`，源码可以在其 GitHub 仓库，例如 [leolee9086/tinySiyuanWidgets](https://github.com/leolee9086/tinySiyuanWidgets) 找到）中的 `deployWidget` JavaScript 函数展示了这种部署方式。

通过这种方式，可以极大地简化挂件开发和自定义部署的流程。 