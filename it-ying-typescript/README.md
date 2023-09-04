# 个人学习使用
## typescript 环境
## 安装typescript
- npm install -g typescript
## 编译typescript
- tsc xxx.ts

# visual code 配置typescript自动编译
1. 生成tsconfig.json 
- tsc --init
- 修改tsconfig.json 里面的”outDir":"./js"
2. 点击菜单 任务-运行任务
- 点击tsc:监视-tsconfig.json 