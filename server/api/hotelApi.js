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

// 返回酒店列表接口
router.post("/selectHotel", (req, res) => {
  var sql = $sql.hotel.select;
  var params = req.body;
  console.log(params);
  conn.query(sql, [params.startDate, params.endDate, params.days], function(err, result) {
    if (err) {
      console.log(err);
    }
    if (result) {
      jsonWrite(res, result);
    }
  });
});

// 添加酒店
router.post("/addHotel", (req, res) => {
  var sql = $sql.hotel.add;
  var params = req.body;
  console.log(params);
  conn.query(sql, [params.hotel_name, params.hotel_location, params.hotel_location_detail], function(err, result) {
    if (err) {
      console.log(err);
    }
    if (result) {
      jsonWrite(res, result);
    }
  });
});

// 获取酒店信息(通过酒店ID)
router.post("/info", (req, res) => {
  var sql = $sql.hotel.info;
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

// 获取酒店信息(通过酒店名称)
router.post("/infoByName", (req, res) => {
  var sql = $sql.hotel.info_by_name;
  var params = req.body;
  console.log(params);
  conn.query(sql, [params.hotel_name], function(err, result) {
    if (err) {
      console.log(err);
    }
    if (result) {
      jsonWrite(res, result);
    }
  });
});

module.exports = router;
