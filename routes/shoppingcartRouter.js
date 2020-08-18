const express = require('express');
var router = express();
const pool = require('../pool.js')
router.get('/v1', function (req, res) {
  var uid = req.query.uid
  var cid = req.query.cid
  //查询函数
  function inquire () {
    var sql = `SELECT cid,pid,img,title,price,edtiton,count FROM iumper_shopping_cart WHERE uid=?`
    pool.query(sql, [uid], (err, result) => {
      if (err) throw err;
      res.send(result);
    })
  }
  if (cid) {
    var sql = `DELETE FROM iumper_shopping_cart WHERE cid IN (${cid})`
    pool.query(sql, [uid], (err, result) => {
      if (err) throw err;
      inquire();
    })
  } else {
    inquire()
  }
})
module.exports = router//导出路由器