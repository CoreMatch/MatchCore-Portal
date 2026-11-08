// 部署时状态快照：构建后探测 arena 健康端点，把结论写进 dist/status.json。
//
// 首页状态芯片是三档：浏览器实时读取（CORS 白名单内）→ 本快照回退 →
// 未知态。实时档失败时浏览器读 /status.json；这份文件就是那一档的证据，
// 因此纪律与芯片一致：**无证据不写 ok:true**。探测失败、超时、响应异常
// 一律写 ok:false——"快照说部署时不通"是保守方向，浏览器实时探测会在
// 用户打开页面时自行纠正，绝不允许快照在无证据时声称在线。
//
// 探测失败不阻断构建：快照只是回退档，缺了它芯片退到"未知"，仍不虚报。

import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const STATUS_URL = 'https://arena.mcnb.dev/api/status';
const TIMEOUT_MS = 5000;
const OUT_DIR = join(dirname(fileURLToPath(import.meta.url)), '..', 'dist');
const OUT_FILE = join(OUT_DIR, 'status.json');

function write(ok, note) {
  mkdirSync(OUT_DIR, { recursive: true });
  const payload = { ok, checked_at: new Date().toISOString() };
  writeFileSync(OUT_FILE, JSON.stringify(payload, null, 2) + '\n');
  console.log(`[status-snapshot] ok=${ok} (${note}) -> ${OUT_FILE}`);
}

try {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  const response = await fetch(STATUS_URL, { cache: 'no-store', signal: controller.signal });
  clearTimeout(timer);
  if (!response.ok) {
    write(false, `endpoint answered HTTP ${response.status}`);
    process.exit(0);
  }
  const body = await response.json();
  if (body && body.success === true) {
    write(true, 'live probe success');
  } else {
    write(false, 'endpoint answered but success !== true');
  }
} catch (error) {
  write(false, `probe failed: ${error?.cause?.code ?? error?.name ?? error}`);
}
