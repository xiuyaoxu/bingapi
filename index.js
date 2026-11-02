'use strict';

/**
 * 本地独立服务入口：node index.js
 * 仅用于本地自托管（提供 /api 接口与演示页）。
 *
 * 本地策略：不缓存、不落盘（NO_CACHE=1）。每次请求都实时拉取 Bing。
 */
process.env.NO_CACHE = '1';

const http = require('http');
const { handleRequest } = require('./lib/bing');

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  // 错误兜底，避免进程崩溃
  try {
    handleRequest(req, res);
  } catch (e) {
    if (!res.headersSent) {
      res.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8' });
    }
    res.end(JSON.stringify({ error: e.message }));
  }
});

server.on('clientError', (err, socket) => socket.destroy());

server.listen(PORT, () => {
  console.log(`Bing 每日图片 API 已启动： http://localhost:${PORT}`);
  console.log('示例：');
  console.log('  GET /              演示页（HTML）');
  console.log('  GET /api           当天图片 JSON 元数据');
  console.log('  GET /api/image     当天壁纸图片（可直接当 <img src>）');
  console.log('  GET /api/list?n=7  最近 7 天列表');
  console.log('  GET /api/random    随机一天');
});

module.exports = server;
