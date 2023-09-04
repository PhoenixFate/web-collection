'use strict';
const Service = require('egg').Service;

class NewsService extends Service {
    async getNewsList() {
        //获取新闻数据
        console.log("service news:")
        console.log(this.config.api)
        //service之间相互调用
        console.log(this.service.user.getUserInfo())
    }
} 

module.exports = NewsService