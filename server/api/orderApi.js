var models = require("../db");
var express = require("express");
var router = express.Router();
var mysql = require("mysql");
var $sql = require("../sqlMap");

// 连接数据库
var conn = mysql.createConnection(models.mysql);

conn.connect();
var jsonWrite = function(res, ret) {
  if (typeof ret === "undefined") {
    res.json({
      code: "1",
      msg: "操作失败"
    });
  } else {
    res.json(ret);
  }
};

// 返回订单列表接口
router.post("/selectOrder", (req, res) => {
  var sql = $sql.order.select;
  var params = req.body;
  console.log(params);
  conn.query(sql, [params.user_id], function(err, result) {
    if (err) {
      console.log(err);
    }
    if (result) {
      jsonWrite(res, result);
    }
  });
});

// 返回订单列表接口
router.post("/insertOrder", (req, res) => {
  var sql = $sql.order.insert;
  var params = req.body;
  console.log(params);
  conn.query(sql, [params.order_id, params.room_id, params.start_date, params.leave_date, params.amount, params.payment], function(err, result) {
    if (err) {
      console.log(err);
    }
    if (result) {
      jsonWrite(res, result);
    }
  });
});

// 商家查询订单数据
router.post("/selectHotelOrder", (req, res) => {
  var sql = $sql.order.select_hotel;
  var params = req.body;
  console.log(params);
  conn.query(sql, [params.hotel_id], function(err, result) {
    if (err) {
      console.log(err);
    }
    if (result) {
      jsonWrite(res, result);
    }
  });
});

module.exports = router;
