import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { fileURLToPath } from "url";
import { componentTagger } from "lovable-tagger";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig(({ mode }) => {
  const isProd = mode === "production";
  const isDev = mode === "development";

  return {
    server: {
      host: "0.0.0.0",
      port: 8081,
    },

    plugins: [
      react(),

      // safer condition handling
      ...(isDev ? [componentTagger()] : []),
    ],

    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },

    optimizeDeps: {
      include: ["react", "react-dom", "react-router-dom"],
    },

    build: {
      target: "es2020",
      cssCodeSplit: true,
      sourcemap: false,
      minify: "esbuild",
      assetsInlineLimit: 8192,

      rollupOptions: {
        onwarn(warning, warn) {
          if (
            warning.message?.includes(
              "overwrites a previously emitted file"
            )
          )
            return;
          warn(warning);
        },

        output: {
          manualChunks: {
            "vendor-react": ["react", "react-dom"],
            "vendor-router": ["react-router-dom"],
          },

          chunkFileNames: "assets/js/[name]-[hash].js",
          entryFileNames: "assets/js/[name]-[hash].js",
          assetFileNames: "assets/[ext]/[name]-[hash].[ext]",
        },
      },

      chunkSizeWarningLimit: 500,
    },
  };
});