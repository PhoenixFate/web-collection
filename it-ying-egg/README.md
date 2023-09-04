# egg.js
## 通过脚手架创建项目
- npm i egg-init -g
- egg-init egg-example --type=simple
- cd egg-example
- npm install

## egg 中使用ejs
1. 安装
- npm i egg-view-ejs --save

2. config/plugin.js 中配置ejs插件
```
    export.ejs={
        enable:true,
        package:'egg-view-ejs'
    };
```

3. config/config.default.js 中配置默认模板后缀名
```
    exports.view ={
        mapping:{
            '.ejs':'ejs'
        }
    }
```

