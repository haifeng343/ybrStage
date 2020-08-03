const webpack = require('webpack');
module.exports = {
    baseUrl: './',
    assetsDir: 'static',
    productionSourceMap: false,
    // devServer: {
    //     proxy: {
    //         '/api':{
    //             target:'http://localhost:8080',
    //             changeOrigin:true,
    //             pathRewrite:{
    //                 '/api':''
    //             }
    //         }
    //     }
    // },
    configureWebpack:{
        plugins:[
            new webpack.ProvidePlugin({
                $:'jquery',
                jQuery:'jQuery',
                "windows.jQuery":'jquery'
            })
        ]
    }
}