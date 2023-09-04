'use strict';

const Controller = require('egg').Controller;

//egg是一个mvc框架
/**
 * view 视图模板页面的展示
 * Controller 负责业务逻辑的处理
 * modek 模型 和数据打交道（查询数据库 请求数据）
 */
class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hi, egg';
  }
  async news(){
    const {ctx}=this;
    ctx.body='this is news page';
  }
}

module.exports = HomeController;
