'user strict'
const Service=require('egg').Service
class UserService extends Service{
    async getUserInfo(){

        return {"username":"tom","age":20};
    }
}

module.exports=UserService