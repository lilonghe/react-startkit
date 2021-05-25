# react-startkit
基于 webpack5 为 react 提供的脚手架。

## build
build 目录下存放 webpack 配置文件，会逐渐把 webpack 配置抽离出来到 config.js 配置。

# Hack
## CSS URL 不解析指定路径
```
const cssSRC = {
    loader: "css-loader",
    options: {
        modules: {
            localIdentName: "[name]_[local]--[hash:base64:5]",
        },
        esModule: false,
        // 加入以下代码
        url: (url, resourcePath) => {
            if (url.indexOf("/")==0) {
                return false;
            }
            return true;
        },
    },
}
```