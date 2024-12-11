import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import eslintPlugin from 'vite-plugin-eslint'
import removeConsole from 'vite-plugin-remove-console'
export default defineConfig({
    define: {
        // enable hydration mismatch details in production build
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'true'
    },
    base: process.env.NODE_ENV === 'production' ? './' : '/',
    lintOnSave: false,
    plugins: [
        vue(),
        eslintPlugin({
            include: ['src/**/*.vue', 'src/*.vue']
        }),
        removeConsole()
    ],
    build: {
        sourcemap: false,
        minify: 'terser',
        chunkSizeWarningLimit: 1500,
        terserOptions: {
            compress: {
                drop_console: true,
                drop_debugger: true
            }
        },
        rollupOptions: {
            output: {
                entryFileNames: 'js/[name]-[hash].js',
                chunkFileNames(val) {
                    if (val.name === 'config') {
                        return 'js/[name].js'
                    }
                    return 'js/[name]-[hash].js'
                },
                assetFileNames(asstInfo) {
                    if (asstInfo.name.endsWith('.css')) {
                        return 'css/[name]-[hash].css'
                    }
                    const imgExts = ['.png', '.jpg', 'jpeg', '.svg', '.gif', '.ico']
                    if (imgExts.some((ext) => asstInfo.name.endsWith(ext))) {
                        return 'images/[name]-[hash][extname]'
                    }
                    return 'assets/[name]-[hash][extname]'
                },
                manualChunks(id) {
                    if (id.includes('src/config/index.js')) {
                        return 'config'
                    }
                }
            }
        }
    },
    server: {
        open: true,
        host: true,
        proxy: {
            '/drsp-dev-login': {
                // 统一登录
                target: 'http://192.168.2.172:48373',
                changeOrigin: true,
                ws: true
                // pathRewrite: { '^/drsp-auth': '' }
            },
            '/drsp-api': {
                // 统一登录
                target: 'http://192.168.2.229:5300',
                changeOrigin: true,
                ws: true
                // pathRewrite: { '^/drsp-auth': '' }
            }
        }
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src')
        }
    },
    css: {
        // postcss: {
        //     plugins: [
        //         require('postcss-pxtorem')({
        //             rootValue: 14,
        //             unitPrecision: 5,
        //             propList: ['*'],
        //             selectorBlackList: [],
        //             replace: true,
        //             mediaQuery: false,
        //             minPixelValue: 0,
        //             exclude: /departmentalAudit/i
        //             // exclude:function(file){
        //             //   return file.indexOf('departmentalAudit') > -1 || file.indexOf('chooseType') > -1|| file.indexOf('login') > -1 ;
        //             // }
        //         })
        //     ]
        // },
        preprocessorOptions: {
            less: {
                javascriptEnabled: true
            }
        }
    }
})
