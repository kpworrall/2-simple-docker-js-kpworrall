Create database if not exists homework;
use homework;

create table if not exists BOOKS (
book_id int primary key,
title varchar(255),
author varchar(255),
publish_year  double(4),
publisher varchar(255),
page_count int,
msrp DECIMAL(13,2)
);

insert into BOOKS values
('1','Britt-Marie Was Here: A Novel','Fredrik Backman', '2017', 'Washington Square Press', '336','17.99'),
('2', 'Northern Light', 'Philip Pullman', '1995', 'Scholastic', '399', '16.00'),
('3', 'Crooked House', 'Agatha Christie', '1949', 'Harper Collins', '256', '14.99'),
('4', 'The Book of Three', 'Lloyd Alexander', '2006', 'Square Fish', '190', '7.99');


