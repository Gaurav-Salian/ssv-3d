import react from '@vitejs/plugin-react'
import { transformWithEsbuild } from 'vite'
import glsl from 'vite-plugin-glsl'

export default {
    root: 'src/',
    publicDir: '../public/',
    base: './',
    plugins:
    [
        // React support
        react(),

        // .js file support as if it was JSX
        {
            name: 'load+transform-js-files-as-jsx',
            async transform(code, id)
            {
                if (!id.match(/src\/.*\.js$/))
                    return null

                return transformWithEsbuild(code, id, {
                    loader: 'jsx',
                    jsx: 'automatic',
                });
            },
        },
        glsl(),
    ],
    server:
    {
        host: true, // Open to local network and display URL
        open: !('SANDBOX_URL' in process.env || 'CODESANDBOX_HOST' in process.env) // Open if it's not a CodeSandbox
    },
    build:
    {
        outDir: '../dist', // Output in the dist/ folder
        emptyOutDir: true, // Empty the folder first
        sourcemap: true // Add sourcemap
    },
}















// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';
// import glsl from 'vite-plugin-glsl';
// import { transformWithEsbuild } from 'vite';

// export default defineConfig({
//   root: 'src/',
//   publicDir: '../public/',
//   base: './',
//   plugins: [
//     react(),
//     {
//       name: 'load+transform-js-files-as-jsx',
//       async transform(code, id) {
//         if (!id.match(/src\/.*\.js$/)) return null;
//         return transformWithEsbuild(code, id, {
//           loader: 'jsx',
//           jsx: 'automatic',
//         });
//       },
//     },
//     glsl(),
//   ],
//   server: {
//     host: true,
//     port: 5173,
//     strictPort: false,
//     open: !('SANDBOX_URL' in process.env || 'CODESANDBOX_HOST' in process.env),
//   },
//   build: {
//     outDir: '../dist',
//     emptyOutDir: true,
//     sourcemap: true,
//     rollupOptions: {
//       input: 'index.html',
//     },
//   },
//   esbuild: {
//     sourcemap: true, // Disable source maps to avoid LWOLoader.js.map error
//   },
// });
