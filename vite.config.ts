import { execSync } from "node:child_process";
import { createReadStream, cpSync, existsSync, rmSync, statSync } from "node:fs";
import path, { extname } from "node:path";
import { fileURLToPath, URL } from "node:url";
import vue from "@vitejs/plugin-vue";
import { defineConfig, type Plugin } from "vite";
const rootDir = path.dirname(fileURLToPath(import.meta.url));
export default defineConfig({
    base: "./",
    plugins: [
        vue(),
        {
            name: "sb",
            apply: "build",
            closeBundle() {
                const submodules: Record<string, string> = {
                    "claude-thunder": "claude-thunder",
                    "fs-context-docs": "fs-context"
                };
                for (const submodule of Object.keys(submodules)) {
                    execSync("pnpm build", { cwd: path.join(rootDir, `submodules/${submodule}`), stdio: "inherit" });
                }
                for (const [src, dest] of Object.entries(submodules)) {
                    const from = path.join(rootDir, `submodules/${src}/dist`);
                    const to = path.join(rootDir, `dist/${dest}`);
                    rmSync(to, { recursive: true, force: true });
                    cpSync(from, to, { recursive: true });
                }
            }
        } satisfies Plugin,
        {
            name: "devserver",
            apply: "serve",
            configureServer(server) {
                const distMounts: Record<string, string> = Object.fromEntries(["claude-thunder", "fs-context"].map(e => [`/${e}`, e]));
                server.middlewares.use((req, res, next) => {
                    let url: string;
                    try {
                        url = decodeURIComponent((req.url ?? "/").split("?")[0]);
                    } catch {
                        return next();
                    }
                    const prefix = Object.keys(distMounts).find((p) => url === p || url.startsWith(p + "/"));
                    if (!prefix) return next();
                    const base = path.join(rootDir, "dist", distMounts[prefix]);
                    const file = path.resolve(base, url.slice(prefix.length).replace(/^\/+/, ""));
                    if (file !== base && !file.startsWith(base + path.sep)) {
                        res.statusCode = 403;
                        res.end();
                        return;
                    }
                    let target = file;
                    if (existsSync(target) && statSync(target).isDirectory()) {
                        target = path.join(target, "index.html");
                    }
                    if (!existsSync(target) || !statSync(target).isFile()) {
                        res.statusCode = 404;
                        res.end();
                        return;
                    }
                    res.setHeader("Content-Type", {
                        ".html": "text/html; charset=utf-8",
                        ".js": "text/javascript; charset=utf-8",
                        ".mjs": "text/javascript; charset=utf-8",
                        ".css": "text/css; charset=utf-8",
                        ".json": "application/json; charset=utf-8",
                        ".png": "image/png",
                        ".jpg": "image/jpeg",
                        ".jpeg": "image/jpeg",
                        ".gif": "image/gif",
                        ".webp": "image/webp",
                        ".svg": "image/svg+xml",
                        ".ico": "image/x-icon",
                        ".mp3": "audio/mpeg",
                        ".wav": "audio/wav",
                        ".woff": "font/woff",
                        ".woff2": "font/woff2",
                        ".ttf": "font/ttf",
                        ".txt": "text/plain; charset=utf-8",
                        ".md": "text/markdown; charset=utf-8",
                        ".xml": "application/xml"
                    }[extname(target).toLowerCase()] ?? "application/octet-stream");
                    createReadStream(target).pipe(res);
                });
            }
        } satisfies Plugin,
    ],
    resolve: {
        alias: {
            "@": fileURLToPath(new URL("./src", import.meta.url))
        }
    },
    server: {
        port: 25565
    }
});