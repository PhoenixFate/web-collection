'use strict'
const Controller=require('egg').Controller;

class AdminController extends Controller {
    async index(){
        //egg基于koa
        //koa中的返回信息
        //ctx.body="koa return"
        //在egg中ctx绑定在this上 所以
        console.log(this)
        this.ctx.body='admin index page'
    }

}

module.exports=AdminController