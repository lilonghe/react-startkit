# react-startkit
基于 webpack5 为 react 提供的脚手架。

## build
build 目录下存放 webpack 配置文件，会逐渐把 webpack 配置抽离出来到 config.js 配置。


# Question
当 import /routes/Dashboard 时，如果其下的 Index.js 首字母大写，webpack 会检测到更改，但无法检测到是这个文件更改，然后返回了缓存到文件。  
验证方式：名字为 Index.js 时，编辑 Index.js 后查看编译输出信息无此文件，刷新页面也无法得到新的内容，切换配置中的 cache 为 false，编辑后输出信息包含此文件，且 HRM 自动加载出内容，或者改成 import /routes/Dashboard/Index 时也无问题。  
名字为 index.js 时，HMR 自动加载出新内容。
---
使用不存在的变量不会报错
```
// import Pineapple from '../../assets/pineapple.png';
img src={Pineapple} />
```


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