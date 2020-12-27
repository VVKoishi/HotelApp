// sql语句
var sqlMap = {
  // 用户
  user: {
    add: "",
    delete: "",
    alter: "",
    login: "select user_id, admin_level from user where user_name=? and user_password=?;",
    info: "select user_name, user_phone, user_description, admin_level, admin_hotel_id from user where user_id=?;",
    quit: ""
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
    select: "select user_id, hotel_id, room_id, order_id, start_date, leave_date, amount, payment, create_date, room_name, hotel_name\
      from (`orders` left join room_type using(room_id)) left join hotel using(hotel_id)\
      where user_id=? order by create_date desc;",
    insert: "insert into `orders` values (?,?,date(?),date(?),?,?,date(now()));",
    select_hotel: "select user_id, hotel_id, room_id, order_id, start_date, leave_date, amount, payment, create_date, room_name, hotel_name\
      from (`orders` left join room_type using(room_id)) left join hotel using(hotel_id)\
      where hotel_id=? order by create_date desc;"
  }
};

module.exports = sqlMap;
