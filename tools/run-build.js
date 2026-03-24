#!/usr/bin/env node
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

spawnSync(process.execPath, ['tools/generate-llms.js'], {
  cwd: root,
  stdio: 'ignore',
});

const viteJs = path.join(root, 'node_modules', 'vite', 'bin', 'vite.js');
const vite = spawnSync(process.execPath, [viteJs, 'build'], {
  cwd: root,
  stdio: 'inherit',
});

process.exit(vite.status === null ? 1 : vite.status);
