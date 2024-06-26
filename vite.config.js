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
        }
    },
    server: {
        open: true,
        host: true,
        proxy: {
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
