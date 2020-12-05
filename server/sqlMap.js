// sql语句
var sqlMap = {
  // 用户
  user: {
    add: "insert into user(id, name, age) values (0, ?, ?)",
    delete: "",
    alter: ""
  },
  // 商家
  user_hotel: {
    add: "",
    delete: "",
    alter: ""
  },
  // 酒店
  hotel: {
    select: "select hotel_id, hotel_name, stars, min(sumPrice) as minPrice\
      from (select room_id, hotel_id, sum(price) as sumPrice\
      from (room_type left join room_info using(room_id)) left join hotel using(hotel_id)\
      where date between ? and ?\
      group by room_id having count(date)=?) as A left join hotel using(hotel_id)\
      group by hotel_id order by minPrice;",
  },
  // 房间
  room: {
    select: "select room_id, room_name, min(remain) as remain, sumPrice\
      from (select room_id, hotel_id, sum(price) as sumPrice\
      from (room_type left join room_info using(room_id)) left join hotel using(hotel_id)\
      where date between ? and ? and hotel_id=?\
      group by room_id having count(date)=?) as A left join room_type using(room_id) left join room_info using(room_id)\
      group by room_id order by sumPrice;",
    publish: "",
    delete: "",
    alter: ""
  },
  // 订单
  order: {
    select: "select  hotel_id, room_id, order_id, start_date, leave_date, amount, payment, create_date, room_name, hotel_name\
      from (`orders` left join room_type using(room_id)) left join hotel using(hotel_id) order by create_date desc;",
    insert: "insert into `orders` values (?,?,date(?),date(?),?,?,date(now()));",
    select_hotel: ""
  }
};

module.exports = sqlMap;
