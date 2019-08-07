SET NAMES UTF8;
DROP  DATABASE  IF  EXISTS  iumper;#丢弃 
#DROP DATABASE IF EXISTS iumper;  
CREATE DATABASE iumper CHARSET=UTF8;
USE iumper;
#1基本信息
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
#2收货基本信息
CREATE TABLE iumper_address(aid INT PRIMARY KEY AUTO_INCREMENT,
							user_id INT,
							FOREIGN KEY (user_id) REFERENCES iumper_user(uid),
							receiver VARCHAR(24),
							province VARCHAR(24),
							city VARCHAR(24),
							county VARCHAR(24),
							address	VARCHAR(50),
							phone VARCHAR(50),
							fixedphone VARCHAR(50),
							email VARCHAR (50)
);
#3商品类别
CREATE TABLE iumper_type(tid int PRIMARY KEY AUTO_INCREMENT,
                         typename VARCHAR(50)
);
#4商品详情
CREATE TABLE iumper_product(pid INT PRIMARY KEY AUTO_INCREMENT,
                            type_uid INT,
							FOREIGN KEY (type_uid) REFERENCES iumper_type(tid),
							brief VARCHAR(100),
							title VARCHAR(100),
							img VARCHAR(100),
							price DECIMAL(8,2),
							colour VARCHAR(50),
							edition VARCHAR(50),
							stock INT,
							Svolume INT,
							Enumber INT	
);
#5购物车/** 购物车  pid 用户id  img  title price 规格 数量 */
CREATE TABLE iumper_shopping_cart(cid INT PRIMARY KEY AUTO_INCREMENT,
                                 	uid INT, #用户ID
					FOREIGN KEY (uid) REFERENCES iumper_user(uid),
					pid INT, #商品id 用于跳转
					FOREIGN KEY (pid) REFERENCES iumper_product(pid),
					img VARCHAR(100),
					title VARCHAR(100),
					price DECIMAL(8,2),
					edtiton VARCHAR(100),
					count INT
);

#6用户订单
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
#7订单详情
CREATE TABLE iumper_order_detail(did INT PRIMARY KEY AUTO_INCREMENT,
                                 order_id INT,
								FOREIGN KEY (order_id) REFERENCES iumper_oredr(oid),
								product_id INT,
								FOREIGN KEY (product_id) REFERENCES iumper_product(pid),
								count INT
                                  
);
#8首页商品
CREATE TABLE iumper_home_page(hid INT PRIMARY KEY AUTO_INCREMENT,
                              herf VARCHAR(100),
			      			  img VARCHAR(100),
			      			  title VARCHAR(100),
			      			  Svolume INT,
                              Enumber INT,
			      			  price DECIMAL(8,2)
);
#9商品图片
CREATE TABLE iumper_imgs(ppid INT PRIMARY KEY AUTO_INCREMENT,
                         product_id INT,
						 type_uid INT,
						 FOREIGN KEY (product_id) REFERENCES iumper_product(pid),
						 picture_sm VARCHAR(100),
						 picture_md VARCHAR(100),
						 picture_lg VARCHAR(100)
);
#10评价
CREATE TABLE iumper_evaluate(eid INT PRIMARY KEY AUTO_INCREMENT,
							 user_id INT,
							 FOREIGN KEY (user_id) REFERENCES iumper_user(uid),
							 product_id INT,
							 FOREIGN KEY (product_id) REFERENCES iumper_product(pid),
							 status INT,
							 content VARCHAR(100),
                             picture VARCHAR(100)
);
#11左侧推荐商品
CREATE TABLE iumper_leftshop(lid INT PRIMARY KEY AUTO_INCREMENT,
                              herf VARCHAR(100),
							  img VARCHAR(100),
							  title VARCHAR(100),
							  price DECIMAL(8,2)
);
#12收藏商品
CREATE TABLE iumper_collect(id INT PRIMARY KEY AUTO_INCREMENT,
                            uid INT, #用户ID
			    FOREIGN KEY (uid) REFERENCES iumper_user(uid),
			    pid INT, #商品id 用于跳转
			    FOREIGN KEY (pid) REFERENCES iumper_product(pid),
			    img VARCHAR(100),
			    title VARCHAR(100),
			    price DECIMAL(8,2)
);

#3商品类别
INSERT INTO iumper_type VALUES (100, '平板电脑'),
(200, '笔记本电脑'),
(300, '键盘配件');
#4商品详情
INSERT INTO iumper_product VALUES (NULL, 100, 'Jumper/中柏 EZpad 7 128G平板电脑二合一','Jumper/中柏 EZpad 7 128G平板电脑二合一 win10平板电脑二合一','Public/images/1554879131.jpg', 1209.00, '极光银色', '128G', 778,464,0),
(NULL, 100, 'Jumper/中柏 EZpad 7 32G平板电脑二合一 ','Jumper/中柏 EZpad 7 32G平板电脑二合一 win10平板电脑二合一','Public/images/1554878158.jpg', 899.00, '极光银色', '32G', 566,76,0),
(NULL, 100, 'Jumper/中柏EZpad Go 128G平板电脑二合一','Jumper/中柏EZpad Go 128G平板电脑二合一 中柏平板电脑二合一windows系统商务办公轻薄便携','Public/images/1552528166.jpg', 1949.00, '前黑后极光银', '128G', 888,97,0),
(NULL, 100, 'Jumper/中柏EZpad Go 64G平板电脑二合一 ','Jumper/中柏EZpad Go 64G平板电脑二合一 win10平板电脑二合一windows系统轻薄便携学生','Public/images/1552528166.jpg', 1749.00, '前黑后极光银', '64G', 986,84,0),
(NULL, 100, 'Jumper/中柏 EZpad 6s pro（增强版）','Jumper/中柏 EZpad 6s pro（增强版）','Public/images/1544607433.jpg', 1850.00, '极光银色', '128G', 200,464,0),
(NULL, 100, 'Jumper/中柏EZpad mini5 ','Jumper/中柏EZpad mini5 win10平板电脑8英寸','Public/images/1538299867.jpg', 699.00, NULL, NULL, 996,236,0),
(NULL, 100, 'jumper/中柏 EZpad M5平板电脑安卓','jumper/中柏 EZpad M5平板电脑安卓','Public/images/1558665064.jpg', 889.00, NULL, NULL, 887,126,0),
(NULL, 100,'Jumper/中柏 EZpad 7 64G', 'Jumper/中柏 EZpad 7 64G','Public/images/1531301732.jpg', 989.00, '前黑后铁灰色', '64G', 999,311,0),
(NULL, 100,'Jumper/中柏 EZpad 7S', 'Jumper/中柏 EZpad 7S','Public/images/1516696071.jpg', 1399.00, '极光银色', '64G', 885,57,0),
(10, 100,'Jumper/中柏 EZpad M3', 'Jumper/中柏 EZpad M3','Public/images/1510816849.png', 619.00, '前黑后铁灰色', '32G', 619,105,0),
(NULL, 100,'Jumper/中柏 EZpad 6s Pro', 'Jumper/中柏 EZpad 6s Pro','Public/images/1559543059.jpg', 1549.00, '前黑后极光银', '128G', 806,370,0),
(NULL, 100,'Jumper/中柏 EZpad 6 pro', 'Jumper/中柏 EZpad 6 pro','Public/images/1561518390.jpg', 1299.00, '极光银色', '64G', 497,76,1),
(NULL, 200,'Jumper/中柏 EZbook 2 128G笔记本电脑', 'Jumper/中柏 EZbook 2 128G笔记本电脑 超薄笔记本电脑轻薄便携学生','Public/images/1552551300.jpg', 1309.00, '极光银色', '128G', 788,166,0),
(NULL, 200, 'Jumper/中柏ezbook S4笔记本电脑','Jumper/中柏ezbook S4笔记本电脑','Public/images/1539308952.jpg', 1499.00, '银色', '64G', 1000,61,1),
(NULL, 200, 'Jumper/中柏 EZbook 3 plus','Jumper/中柏 EZbook 3 plus','Public/images/1510813059.jpg', 2799.00, '极光银色', '8G', 68,36,0),
(NULL, 200,'Jumper/中柏 EZBOOK 2 4G', 'Jumper/中柏 EZBOOK 2 4G','Public/images/1479958460.jpg', 1009.00, '极光银色', '64G', 975,220,1),
(NULL, 300, 'Jumper/中柏EZpad Go平板电脑原装正品磁吸式键盘','Jumper/中柏EZpad Go平板电脑原装正品磁吸式键盘 中柏原装正品磁吸式键盘','Public/images/1552528517.jpg', 249.00, NULL, NULL, 799,119,0),
(NULL, 300, 'Jumper/中柏 EZpad 7 原装键盘','Jumper/中柏 EZpad 7 原装键盘','Public/images/1517221042.jpg', 149.00, NULL, NULL, 999,145,0),
(NULL, 300, 'Jumper/中柏 EZpad 7S原装磁吸键盘/保护套','Jumper/中柏 EZpad 7S原装磁吸键盘/保护套','Public/images/1516600945.jpg', 199.00, NULL, NULL, 800,127,0),
(NULL, 300, '中柏EZpad 6 Pro/EZpad 6s Pro原装转轴硬键盘','中柏EZpad 6 Pro/EZpad 6s Pro原装转轴硬键盘','Public/images/1510819297.jpg', 179.00, NULL, NULL, 59,501,0);
#9商品图片
INSERT INTO iumper_imgs VALUES('null','1','100','Public/images/1554879131.jpg','',''),
('null','1','100','Public/images/1554879144.jpg','',''),
('null','1','100','Public/images/1554879171.jpg','',''),
('null','1','100','Public/images/1554879190.jpg','',''),
('null','1','100','Public/images/1554879235.jpg','',''),
('null','2','100','Public/images/1554878158.jpg','',''),
('null','2','100','Public/images/1554878183.jpg','',''),
('null','2','100','Public/images/1554878195.jpg','',''),
('null','2','100','Public/images/1554878201.jpg','',''),
('null','2','100','Public/images/1554878216.jpg','',''),
('null','3','100','Public/images/1552528166.jpg','',''),
('null','3','100','Public/images/1552528181.jpg','',''),
('null','3','100','Public/images/1552528187.jpg','',''),
('null','3','100','Public/images/1552528192.jpg','',''),
('null','3','100','Public/images/1552528200.jpg','',''),
('null','4','100','Public/images/1552528166.jpg','',''),
('null','4','100','Public/images/1552528181.jpg','',''),
('null','4','100','Public/images/1552528187.jpg','',''),
('null','4','100','Public/images/1552528192.jpg','',''),
('null','4','100','Public/images/1552528200.jpg','',''),
('null','5','100','Public/images/1544607433.jpg','',''),
('null','5','100','Public/images/1544607450.jpg','',''),
('null','5','100','Public/images/1544607459.jpg','',''),
('null','5','100','Public/images/1544607468.jpg','',''),
('null','6','100','Public/images/1538299867.jpg','',''),
('null','6','100','Public/images/1538299885.jpg','',''),
('null','6','100','Public/images/1538299895.jpg','',''),
('null','6','100','Public/images/1538299913.jpg','',''),
('null','6','100','Public/images/1538299925.jpg','',''),
('null','7','100','Public/images/1558665064.jpg','',''),
('null','7','100','Public/images/1558664351.jpg','',''),
('null','7','100','Public/images/1558664376.jpg','',''),
('null','7','100','Public/images/1558664408.jpg','',''),
('null','7','100','Public/images/1558665077.jpg','',''),
('null','8','100','Public/images/1531301732.jpg','',''),
('null','8','100','Public/images/1518157033.jpg','',''),
('null','8','100','Public/images/1518157038.jpg','',''),
('null','8','100','Public/images/1518157120.jpg','',''),
('null','8','100','Public/images/1518157140.jpg','',''),
('null','9','100','Public/images/1516696071.jpg','',''),
('null','9','100','Public/images/1516696076.jpg','',''),
('null','9','100','Public/images/1516696082.jpg','',''),
('null','9','100','Public/images/1516696088.jpg','',''),
('null','9','100','Public/images/1516696097.jpg','',''),
('null','9','100','Public/images/1516696115.jpg','',''),
('null','10','100','Public/images/1510816849.png','',''),
('null','10','100','Public/images/1510816863.jpg','',''),
('null','10','100','Public/images/1510816868.jpg','',''),
('null','10','100','Public/images/1510816875.jpg','',''),
('null','10','100','Public/images/1510816882.jpg','',''),
('null','10','100','Public/images/1510816892.jpg','',''),
('null','11','100','Public/images/1559543059.jpg','',''),
('null','11','100','Public/images/1559543071.jpg','',''),
('null','11','100','Public/images/1559543091.jpg','',''),
('null','11','100','Public/images/1559543138.jpg','',''),
('null','11','100','Public/images/1559543161.jpg','',''),
('null','12','100','Public/images/1561518390.jpg','',''),
('null','12','100','Public/images/1561518397.jpg','',''),
('null','12','100','Public/images/1561518402.jpg','',''),
('null','12','100','Public/images/1561518409.jpg','',''),
('null','13','200','Public/images/1552551300.jpg','',''),
('null','13','200','Public/images/1552551307.jpg','',''),
('null','13','200','Public/images/1552551317.jpg','',''),
('null','13','200','Public/images/1552551324.jpg','',''),
('null','13','200','Public/images/1552551336.jpg','',''),
('null','14','200','Public/images/1539308952.jpg','',''),
('null','14','200','Public/images/1539308964.jpg','',''),
('null','14','200','Public/images/1539308988.jpg','',''),
('null','14','200','Public/images/1539309000.jpg','',''),
('null','14','200','Public/images/1539309010.jpg','',''),
('null','15','200','Public/images/1510813059.jpg','',''),
('null','15','200','Public/images/1510813072.jpg','',''),
('null','15','200','Public/images/1510813079.jpg','',''),
('null','15','200','Public/images/1510813085.jpg','',''),
('null','15','200','Public/images/1510813090.jpg','',''),
('null','16','200','Public/images/1479958460.jpg','',''),
('null','16','200','Public/images/1479958468.jpg','',''),
('null','16','200','Public/images/1479958478.jpg','',''),
('null','16','200','Public/images/1479958489.jpg','',''),
('null','16','200','Public/images/1479958504.jpg','',''),
('null','17','300','Public/images/1552528517.jpg','',''),
('null','17','300','Public/images/1552528526.jpg','',''),
('null','17','300','Public/images/1552528536.jpg','',''),
('null','17','300','Public/images/1552528544.jpg','',''),
('null','17','300','Public/images/1552528549.png','',''),
('null','18','300','Public/images/1517221042.jpg','',''),
('null','18','300','Public/images/1517221047.jpg','',''),
('null','18','300','Public/images/1517221053.jpg','',''),
('null','18','300','Public/images/1517221057.jpg','',''),
('null','19','300','Public/images/1516600945.jpg','',''),
('null','19','300','Public/images/1516600950.jpg','',''),
('null','19','300','Public/images/1516600956.jpg','',''),
('null','19','300','Public/images/1516600967.jpg','',''),
('null','19','300','Public/images/1516600973.jpg','',''),
('null','20','300','Public/images/1510819297.jpg','',''),
('null','20','300','Public/images/1510819302.jpg','',''),
('null','20','300','Public/images/1510819308.jpg','',''),
('null','20','300','Public/images/1510819313.jpg','',''),
('null','20','300','Public/images/1510819317.jpg','','');
#8首页商品栏
INSERT INTO iumper_home_page VALUES('null','product_details.html?lid=1','Public/images/1554879131.jpg','Jumper/中柏 EZpad 7 128G平板电脑二合一','464','150','1209.00'),
('null','product_details.html?lid=2','Public/images/1554878158.jpg','Jumper/中柏 EZpad 7 32G平板电脑二合一','76','150','899.00'),
('null','product_details.html?lid=13','Public/images/1552551300.jpg','Jumper/中柏 EZbook 2 128G笔记本电脑','166','150','1309.00'),
('null','product_details.html?lid=17','Public/images/1552528517.jpg','Jumper/中柏EZpad Go平板电脑原装正品磁吸式键盘','119','150','249.00'),
('null','product_details.html?lid=3','Public/images/1552528166.jpg','Jumper/中柏EZpad Go 128G平板电脑二合一','97','150','1949.00'),
('null','product_details.html?lid=4','Public/images/1552528166.jpg','umper/中柏EZpad Go 64G平板电脑二合一','84','150','1749.00'),
('null','product_details.html?lid=5','Public/images/1544607433.jpg','Jumper/中柏 EZpad 6s pro（增强版）','67','150','1850.00'),
('null','product_details.html?lid=14','Public/images/1539308952.jpg','Jumper/中柏ezbook S4笔记本电脑','66','150','1499.00'),
('null','product_details.html?lid=6','Public/images/1538299867.jpg','Jumper/中柏EZpad mini5','236','150','699.00'),
('null','product_details.html?lid=7','Public/images/1558665064.jpg','jumper/中柏 EZpad M5平板电脑安卓','126','150','889.00'),
('null','product_details.html?lid=18','Public/images/1517221042.jpg','Jumper/中柏 EZpad 7 原装键盘','145','150','149.00'),
('null','product_details.html?lid=8','Public/images/1531301732.jpg','Jumper/中柏 EZpad 7 64G','211','150','989.00'),
('null','product_details.html?lid=19','Public/images/1516600945.jpg','Jumper/中柏 EZpad 7S原装磁吸键盘/保护套','127','150','199.00'),
('null','product_details.html?lid=9','Public/images/1516696071.jpg','Jumper/中柏 EZpad 7S','57','150','1399.00'),
('null','product_details.html?lid=20','Public/images/1510819297.jpg','中柏EZpad 6 Pro/EZpad 6s Pro原装转轴硬键盘','501','150','179.00');
#11左侧商品
INSERT INTO iumper_leftshop VALUES('null','product_details.html?lid=20','Public/images/1510819297.jpg','中柏EZpad 6 Pro/EZpad 6s Pro原装转轴硬键盘','179.00'),
('null','product_details.html?lid=1','Public/images/1554879131.jpg','Jumper/中柏 EZpad 7 128G平板电脑二合一','1209.00'),
('null','product_details.html?lid=11','Public/images/1559543059.jpg','Jumper/中柏 EZpad 6s Pro','1549.00'),
('null','product_details.html?lid=6','Public/images/1538299867.jpg','Jumper/中柏EZpad mini5','699.00'),
('null','product_details.html?lid=16','Public/images/1479958460.jpg','Jumper/中柏 EZBOOK 2 4G','1009.00');

