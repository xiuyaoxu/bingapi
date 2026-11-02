# Bing 每日图片 API

封装 Bing 每日壁纸（HPImageArchive 接口）的轻量服务：零运行时依赖，自带演示页，支持本地直接运行。

> 📦 **开源项目（GitHub 源码仓库）**  
> 🔗 **在线演示**：`https://bing.aoran.bid`

## 功能特性

- 获取 Bing 每日壁纸元数据（标题、版权、图片地址等）
- 直接代理 / 302 重定向当天壁纸图片（可直接当作 `<img src>` 使用）
- 获取最近 N 天列表、随机一天
- 支持地区市场（`mkt`）、分辨率（`res`）、往前天数（`idx`）
- 自带 HTML 演示页，打开即用，并自动探测接口基地址
- 零依赖（仅用 Node 内置模块）
- 本地运行**不缓存、不落盘**；接口开放 CORS（`Access-Control-Allow-Origin: *`），可被任意前端跨域调用

## 目录结构

| 文件 | 作用 |
| --- | --- |
| `index.js` | 本地独立服务入口（`node index.js`） |
| `lib/bing.js` | 核心逻辑（路由、抓取、缓存开关） |
| `index.html` | 演示页 |
| `package.json` | 项目元信息（无任何依赖） |

## 本地运行

```bash
node index.js
# 默认监听 http://localhost:3000
```

- 浏览器打开 `http://localhost:3000/` 即为演示页。
- 本地默认 `NO_CACHE=1`（不缓存、不写磁盘），每次请求实时拉取 Bing。

> ⚠️ 注意：本 API 需要服务端代理 Bing（其官方接口不开放 CORS），纯静态托管（如 GitHub Pages）只能放演示页、跑不了接口。

## 接口一览

| 路由 | 说明 |
| --- | --- |
| `GET /` | 演示页（HTML） |
| `GET /api` | 当天图片 JSON 元数据 |
| `GET /api/image` | 当天壁纸图片字节（可作 `<img src>`） |
| `GET /api/list?n=7` | 最近 N 天列表（N 为 1–8） |
| `GET /api/random` | 随机一天 |
| `GET /health` | 健康检查 |

### 查询参数

| 参数 | 说明 | 默认 |
| --- | --- | --- |
| `idx` | 从今天往前推的天数（0=今天，1=昨天…） | `0` |
| `n` | `/api/list` 返回条数（1–8） | `8` |
| `mkt` | 地区市场，如 `zh-CN` / `en-US` / `ja-JP` | `zh-CN` |
| `res` | 分辨率，如 `1920x1080` / `1366x768` / `UHD` | `1920x1080` |
| `redirect` | 设为 `1` 时 302 跳转 Bing 原图（不代理字节） | 关闭 |

### `/api` 返回示例

```json
{
  "date": "20261101",
  "enddate": "20261102",
  "title": "写在冰上的未来",
  "copyright": "北极熊和幼崽，哈得孙湾畔，马尼托巴省，加拿大 (© Danita Delimont/Adobe Stock)",
  "copyright_link": "https://www.bing.com/search?q=...",
  "url": "https://www.bing.com/th?id=OHR.HudsonBear_ZH-CN6630706907_1920x1080.jpg&...",
  "urlbase": "https://www.bing.com/th?id=OHR.HudsonBear_ZH-CN6630706907",
  "quiz": "/search?q=Bing+homepage+quiz&...",
  "mkt": "zh-CN"
}
```

## 演示页

打开 `/`（或部署后的域名）即可使用：

- 切换地区市场、分辨率、往前天数；
- 查看「今日 / 随机 / 最近 7 天」；
- 一键复制 `JSON / 图片 / 列表 / 随机` 的接口地址；
- 页面会自动探测可用的接口基地址（优先当前页同域，否则回退 `localhost:3000`），无后端时给出明确提示。

## 许可

本项目以 [MIT 协议](./LICENSE) 开源。Bing 每日图片版权归微软 / 原作者所有，本项目仅作代理展示，不存储图片。

---

- 📦 开源仓库（GitHub）：本仓库即源码主页
- 🔗 在线演示：`https://bing.aoran.bid`

项目由 XY 维护更新
