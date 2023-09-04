'use strict'

/**
 * 
 *  定义的 Controller 类，会在每一个请求访问到 server 时实例化一个全新的对象，
 *  而项目中的 Controller 类继承于 egg.Controller，会有下面几个属性挂在 this 上。
    this.ctx: 当前请求的上下文 Context 对象的实例，通过它我们可以拿到框架封装好的处理当前请求的各种便捷属性和方法。
    this.app: 当前应用 Application 对象的实例，通过它我们可以拿到框架提供的全局对象和方法。
    this.service：应用定义的 Service，通过它我们可以访问到抽象出的业务层，等价于 this.ctx.service 。
    this.config：应用运行时的配置项。
    this.logger：logger 对象，上面有四个方法（debug，info，warn，error），
    分别代表打印四个不同级别的日志，使用方法和效果与 context logger 中介绍的一样，但是通过这个 logger 对象记录的日志，
    在日志前面会加上打印该日志的文件路径，以便快速定位日志打印位置。
 * 
 * 
 */


const Controller = require('egg').Controller
class NewsController extends Controller {
    async index() {
        // this.ctx.body = 'news index page'
        var msg="new ejs"
        var list=['111','222','333']
        await this.ctx.render('news/index',{
            msg,
            list
        })
    }
    async content() {
        //egg中获得get传值
        let query = this.ctx.query
        console.log(query)
        this.ctx.body = 'news content page'
    }

    async list(){
        //koa获取动态路由的传值
        //ctx.params
        console.log(this.ctx.params)
        console.log(this.config.api)
        var list=await this.service.news.getNewsList()
        var user=await this.service.user.getUserInfo()
        console.log(user)
        this.ctx.body="news list"
    }
}

module.exports = NewsController