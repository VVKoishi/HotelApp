-- phpMyAdmin SQL Dump
-- version 4.7.7
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: 2020-12-28 12:03:36
-- 服务器版本： 5.7.23
-- PHP Version: 7.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `hotel_data`
--

-- --------------------------------------------------------

--
-- 表的结构 `hotel`
--

CREATE TABLE `hotel` (
  `hotel_id` int(11) NOT NULL,
  `hotel_name` varchar(255) DEFAULT NULL,
  `stars` decimal(2,1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

--
-- 转存表中的数据 `hotel`
--

INSERT INTO `hotel` (`hotel_id`, `hotel_name`, `stars`) VALUES
(1, '惠民旅馆', '5.0'),
(2, '风景旅馆', '4.0'),
(3, '商务旅馆', '4.0');

-- --------------------------------------------------------

--
-- 表的结构 `orders`
--

CREATE TABLE `orders` (
  `order_id` int(11) NOT NULL,
  `room_id` int(11) NOT NULL,
  `start_date` date DEFAULT NULL,
  `leave_date` date DEFAULT NULL,
  `amount` int(11) DEFAULT NULL,
  `payment` decimal(10,2) DEFAULT NULL,
  `create_date` date DEFAULT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

--
-- 转存表中的数据 `orders`
--

INSERT INTO `orders` (`order_id`, `room_id`, `start_date`, `leave_date`, `amount`, `payment`, `create_date`, `user_id`) VALUES
(0, 6, '2020-11-14', '2020-11-15', 4, '2000.00', '2020-11-01', 2),
(1, 5, '2020-11-14', '2020-11-16', 2, '2100.00', '2020-11-02', 2),
(2, 1, '2020-11-14', '2020-11-14', 5, '2500.00', '2020-11-03', 2),
(3, 8, '2020-11-14', '2020-11-16', 2, '1296.00', '2020-11-04', 2),
(4, 4, '2020-11-14', '2020-11-16', 2, '2400.00', '2020-11-05', 2);

-- --------------------------------------------------------

--
-- 表的结构 `room_info`
--

CREATE TABLE `room_info` (
  `info_id` int(11) NOT NULL,
  `date` date DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `remain` varchar(255) DEFAULT NULL COMMENT '剩余房源',
  `room_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

--
-- 转存表中的数据 `room_info`
--

INSERT INTO `room_info` (`info_id`, `date`, `price`, `remain`, `room_id`) VALUES
(1, '2020-11-14', '500.00', '5', 1),
(2, '2020-11-15', '500.00', '4', 1),
(3, '2020-11-16', '600.00', '6', 1),
(4, '2020-11-14', '300.00', '6', 2),
(5, '2020-11-15', '300.00', '5', 2),
(6, '2020-11-16', '400.00', '5', 2),
(7, '2020-11-14', '200.00', '4', 3),
(8, '2020-11-15', '200.00', '3', 3),
(9, '2020-11-16', '300.00', '4', 3),
(10, '2020-11-14', '450.00', '5', 4),
(11, '2020-11-15', '300.00', '5', 4),
(12, '2020-11-16', '450.00', '5', 4),
(13, '2020-11-14', '400.00', '2', 5),
(14, '2020-11-15', '250.00', '2', 5),
(15, '2020-11-16', '400.00', '2', 5),
(16, '2020-11-14', '300.00', '1', 6),
(17, '2020-11-15', '200.00', '1', 6),
(18, '2020-11-16', '300.00', '5', 6),
(19, '2020-11-14', '300.00', '2', 7),
(20, '2020-11-15', '250.00', '3', 7),
(21, '2020-11-16', '300.00', '8', 7),
(22, '2020-11-14', '250.00', '1', 8),
(23, '2020-11-15', '200.00', '1', 8),
(24, '2020-11-16', '200.00', '5', 8),
(25, '2020-11-14', '200.00', '2', 9),
(26, '2020-11-15', '150.00', '4', 9),
(27, '2020-11-16', '150.00', '4', 9);

-- --------------------------------------------------------

--
-- 表的结构 `room_type`
--

CREATE TABLE `room_type` (
  `room_id` int(11) NOT NULL COMMENT '酒店房型',
  `room_name` varchar(255) DEFAULT NULL,
  `hotel_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

--
-- 转存表中的数据 `room_type`
--

INSERT INTO `room_type` (`room_id`, `room_name`, `hotel_id`) VALUES
(1, '大床房', 1),
(2, '双人房', 1),
(3, '三人房', 1),
(4, '海景房', 2),
(5, '园景房', 2),
(6, '山景房', 2),
(7, '总统套房', 3),
(8, '豪华套房', 3),
(9, '33号房', 3);

-- --------------------------------------------------------

--
-- 表的结构 `user`
--

CREATE TABLE `user` (
  `user_id` int(11) NOT NULL,
  `user_name` varchar(20) NOT NULL,
  `user_password` varchar(20) NOT NULL,
  `user_phone` varchar(20) DEFAULT NULL,
  `user_description` varchar(50) DEFAULT NULL COMMENT '用户描述',
  `user_createDate` date DEFAULT NULL,
  `user_lastLoginDate` date DEFAULT NULL,
  `admin_level` int(3) NOT NULL DEFAULT '0' COMMENT '0为用户，1为商家，2为管理',
  `admin_hotel_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- 转存表中的数据 `user`
--

INSERT INTO `user` (`user_id`, `user_name`, `user_password`, `user_phone`, `user_description`, `user_createDate`, `user_lastLoginDate`, `admin_level`, `admin_hotel_id`) VALUES
(1, 'admin', '123123123', '13574250310', 'While the band’s playin’', NULL, NULL, 3, NULL),
(2, 'buyer', '123123123', '15074239390', 'You’re still goin’ strong', NULL, NULL, 0, NULL),
(3, 'seller', '123123123', '18633654507', 'It’s so nice to have you back where you belong', NULL, NULL, 1, 2);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `hotel`
--
ALTER TABLE `hotel`
  ADD PRIMARY KEY (`hotel_id`) USING BTREE;

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`order_id`) USING BTREE,
  ADD KEY `room_id` (`room_id`) USING BTREE,
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `room_info`
--
ALTER TABLE `room_info`
  ADD PRIMARY KEY (`info_id`) USING BTREE,
  ADD KEY `room_id` (`room_id`) USING BTREE;

--
-- Indexes for table `room_type`
--
ALTER TABLE `room_type`
  ADD PRIMARY KEY (`room_id`) USING BTREE,
  ADD KEY `hotel_id` (`hotel_id`) USING BTREE;

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `user_name` (`user_name`),
  ADD KEY `admin_hotel_id` (`admin_hotel_id`);

--
-- 在导出的表使用AUTO_INCREMENT
--

--
-- 使用表AUTO_INCREMENT `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- 限制导出的表
--

--
-- 限制表 `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `room_id_FK_orders` FOREIGN KEY (`room_id`) REFERENCES `room_type` (`room_id`),
  ADD CONSTRAINT `user_id_FK_orders` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`);

--
-- 限制表 `room_info`
--
ALTER TABLE `room_info`
  ADD CONSTRAINT `room_id_FK_room_info` FOREIGN KEY (`room_id`) REFERENCES `room_type` (`room_id`);

--
-- 限制表 `room_type`
--
ALTER TABLE `room_type`
  ADD CONSTRAINT `hotel_id_FK_room_type` FOREIGN KEY (`hotel_id`) REFERENCES `hotel` (`hotel_id`);

--
-- 限制表 `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `hotel_id_FK_user` FOREIGN KEY (`admin_hotel_id`) REFERENCES `hotel` (`hotel_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
