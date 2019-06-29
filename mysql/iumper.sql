
SET NAMES UTF8;
DROP  DATABASE  IF  EXISTS  iumper; 
#DROP DATABASE IF EXISTS iumper;  
CREATE DATABASE iumper CHARSET=UTF8;
USE iumper;
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

);#基本信息

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
);#收货基本信息

CREATE TABLE iumper_type(tid int PRIMARY KEY AUTO_INCREMENT,
                        typename VARCHAR(50)
);#商品类别

CREATE TABLE iumper_product(pid INT PRIMARY KEY AUTO_INCREMENT,
                            type_uid INT,
			    FOREIGN KEY (type_uid) REFERENCES iumper_type(tid),
			    title VARCHAR(100),
			    price DECIMAL(8,2),
                            colour VARCHAR(50),
			    edition VARCHAR(50),
			    stock INT
);#商品详情

CREATE TABLE iumper_shopping_cart(cid INT PRIMARY KEY AUTO_INCREMENT,
                                 user_id INT,
				 FOREIGN KEY (user_id) REFERENCES iumper_user(uid),
				 product_id INT,
				 FOREIGN KEY (product_id) REFERENCES iumper_product(pid),
				 count INT
);
#购物车

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
);#用户订单

CREATE TABLE iumper_order_detail(did INT PRIMARY KEY AUTO_INCREMENT,
                                 order_id INT,
				 FOREIGN KEY (order_id) REFERENCES iumper_oredr(oid),
                                 product_id INT,
				 FOREIGN KEY (product_id) REFERENCES iumper_product(pid),
				 count INT
                                  
);#订单详情

CREATE TABLE iumper_home_page(hid INT PRIMARY KEY AUTO_INCREMENT,
                              product_id INT,
			      FOREIGN KEY (product_id) REFERENCES iumper_product(pid),
			      sales_volume INT,
                              evaluate_number INT,
			      price DECIMAL(8,2)
);#首页商品

CREATE TABLE iumper_product_pictures(ppid INT PRIMARY KEY AUTO_INCREMENT,
                                     product_id INT,
				     FOREIGN KEY (product_id) REFERENCES iumper_product(pid),
				     picture_sm VARCHAR(100),
				     picture_md VARCHAR(100),
				     picture_lg VARCHAR(100)
);#商品图片

CREATE TABLE iumper_evaluate(eid INT PRIMARY KEY AUTO_INCREMENT,
                             user_id INT,
			     FOREIGN KEY (user_id) REFERENCES iumper_user(uid),
			     product_id INT,
			     FOREIGN KEY (product_id) REFERENCES iumper_product(pid),
			     status INT,
			     content VARCHAR(100),
                             picture VARCHAR(100)
);#评价
#INSERT INTO  iumper_user  VALUES('1','2','3','1','5','1','7','1','9','10','1','1','13'); 
#SELECT*FROM iumper_user;
#desc iumper_user;




