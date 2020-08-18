//路由器
const express = require('express');
var router = express(); //创建
const pool = require('../pool.js') //引用
var obj = {
  list: [],
  show: [],
}
router.get('/v1', function (req, res) {
  /*轮播产品数据 */
  var sql = `SELECT herf,img,title,Svolume,Enumber,price  FROM iumper_home_page `;
  pool.query(sql, [], (err, result) => {
    if (err) throw err;
    obj.show = result;
    /*其他列表数据 */
    var sql = `SELECT pid,type_uid,brief FROM iumper_product`
    pool.query(sql, [], (err, result) => {
      if (err) throw err;
      obj.list = result;
      res.send(obj)
    })
  })
});
module.exports = router//导出路由器