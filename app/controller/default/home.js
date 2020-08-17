//前台接口
'use strict';

const Controller = require('egg').Controller

class HomeController extends Controller {
    async index() {
        this.ctx.body = 'hello api'
    }
    //获得首页内容
    async getArticleList() {
        let sql = 'SELECT article.id as id,' +
            'article.title as title,' +
            'article.introduce as introduce,' +
            "FROM_UNIXTIME(article.addTime,'%Y-%m-%d %H:%i:%s' ) as addTime," +
            'article.view_count as view_count ,' +
            'type.typeName as typeName ' +
            'FROM article LEFT JOIN type ON article.type_id = type.Id'
        const result = await this.app.mysql.query(sql)

        this.ctx.body = {
            data: result
        }
    }
    //  通过id获得文章详情
    async getArticleById() {
        // 先配置路由的动态传值，然后再接收值
        const id = this.ctx.params.id;
        const sql = 'SELECT article.id as id,' +
            'article.title as title,' +
            'article.introduce as introduce,' +
            'article.article_content as article_content,' +
            "FROM_UNIXTIME(article.addTime,'%Y-%m-%d %H:%i:%s' ) as addTime," +
            'article.view_count as view_count ,' +
            'type.typeName as typeName ,' +
            'type.id as typeId ' +
            'FROM article LEFT JOIN type ON article.type_id = type.Id ' +
            'WHERE article.id=' + id;
        const result = await this.app.mysql.query(sql);
        this.ctx.body = { data: result };
    }
    //获得分类信息
    async getTypeInfo() {
        const result = await this.app.mysql.select('type')
      this.ctx.body = {data:result}
    }
    //根据类别 ID 获取文章列表
    async getListById() {
        let id = this.ctx.params.id
        const sql = 'SELECT article.id as id,'+
        'article.title as title,'+
        'article.introduce as introduce,'+
        "FROM_UNIXTIME(article.addTime,'%Y-%m-%d %H:%i:%s' ) as addTime,"+
        'article.view_count as view_count ,'+
        'type.typeName as typeName '+
        'FROM article LEFT JOIN type ON article.type_id = type.Id '+
        'WHERE type_id='+id
        
        const result = await this.app.mysql.query(sql)
        this.ctx.body = {data: result}
    }
}

module.exports = HomeController