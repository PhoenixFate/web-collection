# 无人点餐 静态页
## 安装Sass和Compass 环境
> sass基于Ruby语言开发而成，因此安装sass前需要安装Ruby
### 安装ruby
1. ruby -v 查看是否安装成功
2. 替换国内源
```
gem update --system //该命令请翻墙一下
gem -v
//删除替换原gem源
gem sources --add https://gems.ruby-china.com/ --remove https://rubygems.org/
//打印是否替换成功
gem sources -l
 
```

### sass/compass
```
//安装如下(如mac安装遇到权限问题需加 sudo gem install sass)
gem install sass
gem install compass
```
- 查看是否正确安装
sass -v
compass -v

### 编译sass
```
//单文件转换命令
sass input.scss output.css

//单文件监听命令
sass --watch input.scss:output.css

//如果你有很多的sass文件的目录，你也可以告诉sass监听整个目录：
sass --watch app/sass:public/stylesheets
```

### 命令行编译配置选项
```
//编译格式
sass --watch input.scss:output.css --style compact

//编译添加调试map
sass --watch input.scss:output.css --sourcemap

//选择编译格式并添加调试map
sass --watch input.scss:output.css --style expanded --sourcemap

//开启debug信息
sass --watch input.scss:output.css --debug-info

--style表示解析后的css是什么排版格式;
sass内置有四种编译格式:nested``expanded``compact``compressed。
--sourcemap表示开启sourcemap调试。开启sourcemap调试后，会生成一个后缀名为.css.map文件。

```