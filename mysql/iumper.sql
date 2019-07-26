
SET NAMES UTF8;
DROP  DATABASE  IF  EXISTS  iumper;#丢弃 
#DROP DATABASE IF EXISTS iumper;  
CREATE DATABASE iumper CHARSET=UTF8;
USE iumper;
#基本信息
CREATE TABLE iumper_user(uid INT PRIMARY KEY AUTO_INCREMENT,
                         uname VARCHAR(36),
			 password VARCHAR(36),
			 nickname VARCHAR(36),
                         sex INT,
                         province VARCHAR(24),
                         city VARCHAR(24),
                         county VARCHAR(24),
                         address VARCHAR(50),
                         qq  VARCHAR(50),
                         avatar VARCHAR(50),
                         phone VARCHAR(50),
                         email VARCHAR(50)

);
#收货基本信息
CREATE TABLE iumper_address(aid INT PRIMARY KEY AUTO_INCREMENT,
                           user_id INT,
                           FOREIGN KEY (user_id) REFERENCES iumper_user(uid),
                           receiver VARCHAR(24),
                           province VARCHAR(24),
                           city VARCHAR(24),
                           county VARCHAR(24),
			   address VARCHAR(50),
			   phone VARCHAR(50),
			   fixedphone VARCHAR(50),
			   email VARCHAR (50)
);
#商品类别
CREATE TABLE iumper_type(tid int PRIMARY KEY AUTO_INCREMENT,
                        typename VARCHAR(50)
);
#商品详情
CREATE TABLE iumper_product(pid INT PRIMARY KEY AUTO_INCREMENT,
                            type_uid INT,
			    FOREIGN KEY (type_uid) REFERENCES iumper_type(tid),
			    title VARCHAR(100),
			    price DECIMAL(8,2),
                            colour VARCHAR(50),
			    edition VARCHAR(50),
			    stock INT
);
#购物车
CREATE TABLE iumper_shopping_cart(cid INT PRIMARY KEY AUTO_INCREMENT,
                                 user_id INT,
				 FOREIGN KEY (user_id) REFERENCES iumper_user(uid),
				 product_id INT,
				 FOREIGN KEY (product_id) REFERENCES iumper_product(pid),
				 count INT
);

#用户订单
CREATE TABLE iumper_oredr(oid INT PRIMARY KEY AUTO_INCREMENT,
			   user_id INT,
			   FOREIGN KEY (user_id) REFERENCES iumper_user(uid),
			   address_id INT,
			   FOREIGN KEY (address_id) REFERENCES iumper_address(aid),
			   status INT,
			   rder_time DATETIME,
			   pay_time DATETIME,
			   deliver_time DATETIME,
			   receiver_time DATETIME
);
#订单详情
CREATE TABLE iumper_order_detail(did INT PRIMARY KEY AUTO_INCREMENT,
                                 order_id INT,
				 FOREIGN KEY (order_id) REFERENCES iumper_oredr(oid),
                                 product_id INT,
				 FOREIGN KEY (product_id) REFERENCES iumper_product(pid),
				 count INT
                                  
);
#首页商品
CREATE TABLE iumper_home_page(hid INT PRIMARY KEY AUTO_INCREMENT,
                              product_id INT,
			      FOREIGN KEY (product_id) REFERENCES iumper_product(pid),
			      sales_volume INT,
                              evaluate_number INT,
			      price DECIMAL(8,2)
);
#商品图片
CREATE TABLE iumper_product_pictures(ppid INT PRIMARY KEY AUTO_INCREMENT,
                                     product_id INT,
				     FOREIGN KEY (product_id) REFERENCES iumper_product(pid),
				     picture_sm VARCHAR(100),
				     picture_md VARCHAR(100),
				     picture_lg VARCHAR(100)
);
#评价
CREATE TABLE iumper_evaluate(eid INT PRIMARY KEY AUTO_INCREMENT,
                             user_id INT,
			     FOREIGN KEY (user_id) REFERENCES iumper_user(uid),
			     product_id INT,
			     FOREIGN KEY (product_id) REFERENCES iumper_product(pid),
			     status INT,
			     content VARCHAR(100),
                             picture VARCHAR(100)
);
#商品类别
INSERT INTO `iumper_type`(`tid`, `typename`) VALUES (100, '平板电脑');
INSERT INTO `iumper_type`(`tid`, `typename`) VALUES (200, '笔记本电脑');
INSERT INTO `iumper_type`(`tid`, `typename`) VALUES (300, '键盘配件');
#商品详情
INSERT INTO `iumper_product`(`pid`, `type_uid`, `title`, `price`, `colour`, `edition`, `stock`) VALUES (1, 100, 'Jumper/中柏 EZpad 7 128G平板电脑二合一 win10平板电脑二合一', 1209.00, '极光银色', '128G', 778);
INSERT INTO `iumper_product`(`pid`, `type_uid`, `title`, `price`, `colour`, `edition`, `stock`) VALUES (2, 100, 'Jumper/中柏 EZpad 7 32G平板电脑二合一 win10平板电脑二合一', 899.00, '极光银色', '32G', 566);
INSERT INTO `iumper_product`(`pid`, `type_uid`, `title`, `price`, `colour`, `edition`, `stock`) VALUES (3, 100, 'Jumper/中柏EZpad Go 128G平板电脑二合一 中柏平板电脑二合一windows系统商务办公轻薄便携', 1949.00, '前黑后极光银', '128G', 888);
INSERT INTO `iumper_product`(`pid`, `type_uid`, `title`, `price`, `colour`, `edition`, `stock`) VALUES (4, 100, 'Jumper/中柏EZpad Go 64G平板电脑二合一 win10平板电脑二合一windows系统轻薄便携学生', 1749.00, '前黑后极光银', '64G', 986);
INSERT INTO `iumper_product`(`pid`, `type_uid`, `title`, `price`, `colour`, `edition`, `stock`) VALUES (5, 100, 'Jumper/中柏 EZpad 6s pro（增强版', 1850.00, '极光银色', '128G', 200);
INSERT INTO `iumper_product`(`pid`, `type_uid`, `title`, `price`, `colour`, `edition`, `stock`) VALUES (6, 100, 'Jumper/中柏EZpad mini5 win10平板电脑8英寸', 699.00, NULL, NULL, 996);
INSERT INTO `iumper_product`(`pid`, `type_uid`, `title`, `price`, `colour`, `edition`, `stock`) VALUES (7, 100, 'jumper/中柏 EZpad M5平板电脑安卓', 889.00, NULL, NULL, 887);
INSERT INTO `iumper_product`(`pid`, `type_uid`, `title`, `price`, `colour`, `edition`, `stock`) VALUES (8, 100, 'Jumper/中柏 EZpad 7 64G', 989.00, '前黑后铁灰色', '64G', 999);
INSERT INTO `iumper_product`(`pid`, `type_uid`, `title`, `price`, `colour`, `edition`, `stock`) VALUES (9, 100, 'Jumper/中柏 EZpad 7S', 1399.00, '极光银色', '64G', 885);
INSERT INTO `iumper_product`(`pid`, `type_uid`, `title`, `price`, `colour`, `edition`, `stock`) VALUES (10, 100, 'Jumper/中柏 EZpad M3', 619.00, '前黑后铁灰色', '32G', 619);
INSERT INTO `iumper_product`(`pid`, `type_uid`, `title`, `price`, `colour`, `edition`, `stock`) VALUES (11, 100, 'Jumper/中柏 EZpad 6s Pro', 1549.00, '前黑后极光银', '128G', 806);
INSERT INTO `iumper_product`(`pid`, `type_uid`, `title`, `price`, `colour`, `edition`, `stock`) VALUES (12, 100, 'Jumper/中柏 EZpad 6 pro', 1299.00, '极光银色', '64G', 497);
INSERT INTO `iumper_product`(`pid`, `type_uid`, `title`, `price`, `colour`, `edition`, `stock`) VALUES (13, 200, 'Jumper/中柏 EZbook 2 128G笔记本电脑 超薄笔记本电脑轻薄便携学生', 1309.00, '极光银色', '128G', 788);
INSERT INTO `iumper_product`(`pid`, `type_uid`, `title`, `price`, `colour`, `edition`, `stock`) VALUES (14, 200, 'Jumper/中柏ezbook S4笔记本电脑', 1449.00, '银色', '64G', 1000);
INSERT INTO `iumper_product`(`pid`, `type_uid`, `title`, `price`, `colour`, `edition`, `stock`) VALUES (15, 200, 'Jumper/中柏 EZbook 3 plus', 2799.00, '极光银色', '8G', 68);
INSERT INTO `iumper_product`(`pid`, `type_uid`, `title`, `price`, `colour`, `edition`, `stock`) VALUES (16, 200, 'Jumper/中柏 EZBOOK 2 4G', 1009.00, '极光银色', '64G', 975);
INSERT INTO `iumper_product`(`pid`, `type_uid`, `title`, `price`, `colour`, `edition`, `stock`) VALUES (17, 300, 'Jumper/中柏EZpad Go平板电脑原装正品磁吸式键盘 中柏原装正品磁吸式键盘', 249.00, NULL, NULL, 799);
INSERT INTO `iumper_product`(`pid`, `type_uid`, `title`, `price`, `colour`, `edition`, `stock`) VALUES (18, 300, 'Jumper/中柏 EZpad 7 原装键盘', 149.00, NULL, NULL, 999);
INSERT INTO `iumper_product`(`pid`, `type_uid`, `title`, `price`, `colour`, `edition`, `stock`) VALUES (19, 300, 'Jumper/中柏 EZpad 7S原装磁吸键盘/保护套', 199.00, NULL, NULL, 800);
INSERT INTO `iumper_product`(`pid`, `type_uid`, `title`, `price`, `colour`, `edition`, `stock`) VALUES (20, 300, '中柏EZpad 6 Pro/EZpad 6s Pro原装转轴硬键盘', 179.00, NULL, NULL, 59);




