import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import compression from "vite-plugin-compression2";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    // ── Gzip + Brotli compression for production builds ──────────────────
    mode === "production" &&
      compression({
        algorithm: "gzip",
        threshold: 1024,
        exclude: [/\.(mp4|webm|png|jpg|webp|ico|woff2?)$/i],
      }),
    mode === "production" &&
      compression({
        algorithm: "brotliCompress",
        threshold: 1024,
        exclude: [/\.(mp4|webm|png|jpg|webp|ico|woff2?)$/i],
      }),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // ── Optimise dependency pre-bundling ─────────────────────────────────────
  optimizeDeps: {
    include: ["react", "react-dom", "react-router-dom"],
  },
  build: {
    // ── Performance-focused build settings ──────────────────────────────
    target: "es2020",
    cssCodeSplit: true,
    sourcemap: false,
    minify: "esbuild",
    // ── Inline small assets (< 8KB) to reduce HTTP requests ────────────
    assetsInlineLimit: 8192,
    rollupOptions: {
      onwarn(warning, warn) {
        // vite-plugin-compression2 can emit the same .gz/.br filename more
        // than once across multiple Rollup output passes – silence it.
        if (warning.message?.includes("overwrites a previously emitted file")) return;
        warn(warning);
      },
      output: {
        // ── Smart chunk splitting ──────────────────────────────────────
        manualChunks: {
          "vendor-react": ["react", "react-dom"],
          "vendor-router": ["react-router-dom"],
        },
        // ── Content-hashed filenames for long-term caching ─────────────
        chunkFileNames: "assets/js/[name]-[hash].js",
        entryFileNames: "assets/js/[name]-[hash].js",
        assetFileNames: "assets/[ext]/[name]-[hash].[ext]",
      },
    },
    // Increase chunk size warning to 500kB (appropriate for this project)
    chunkSizeWarningLimit: 500,
  },
}));
