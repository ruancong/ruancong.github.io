## sql注释

Two dashes (“--”) introduce comments. Whatever follows them is ignored up to the end of the line.

```postgresql
CREATE TABLE weather (
city varchar(80),
temp_lo int, -- low temperature
temp_hi int, -- high temperature
prcp real, -- precipitation
date date
);
```

## 大小写不敏感

SQL is case-insensitive about key words and identifiers, except when identifiers are double-quoted to preserve the case.

在不使用双引号时，关键字与表名、列名等标识符是大小写不敏感的

## 数据类型

PostgreSQL supports the standard SQL types int, smallint, real, double precision, char(N), varchar(N), date, time, timestamp, and interval, as well as other types of general utility and a rich set of geometric types. 

```postgresql
CREATE TABLE cities (
name varchar(80),
location point
);
```

> The point type is an example of a PostgreSQL-specific data type.

## 聚合函数中的FILTER

```postgresql
SELECT city, count(*) FILTER (WHERE temp_lo < 45), max(temp_lo)
FROM weather
GROUP BY city;
```

> Here, the count aggregate counts only rows with temp_lo below 45; but the max aggregate is still applied to all rows. 即这个temp_lo < 45的条件只有在计算count(*) 生效，在计算max(temp_lo)时还是取所有的纪录

## 视图

创建视图
```postgresql
CREATE VIEW myview AS
SELECT name, temp_lo, temp_hi, prcp, date, location
FROM weather, cities
WHERE city = name;
SELECT * FROM myview;
```

## window function

A window function call always contains an OVER clause directly following the window function's name and argument(s).

例如下面这个sql：

```postgresql
SELECT depname, empno, salary, avg(salary) OVER (PARTITION BY
depname) FROM empsalary;
```
其中avg()就是一个窗口函数【带有OVER关键词】。

查询结果类似这样：

| depname   | empno | salary | avg                   |
| --------- | ----- | ------ | --------------------- |
| develop   | 11    | 5200   | 5020.0000000000000000 |
| develop   | 7     | 4200   | 5020.0000000000000000 |
| develop   | 9     | 4500   | 5020.0000000000000000 |
| develop   | 8     | 6000   | 5020.0000000000000000 |
| develop   | 10    | 5200   | 5020.0000000000000000 |
| personnel | 5     | 3500   | 3700.0000000000000000 |
| personnel | 2     | 3900   | 3700.0000000000000000 |
| sales     | 3     | 4800   | 4866.6666666666666667 |
| sales     | 1     | 5000   | 4866.6666666666666667 |
| sales     | 4     | 4800   | 4866.6666666666666667 |

The PARTITION BY clause within OVER divides the rows into groups, or partitions, that share the same values of the PARTITION BY expression(s).

There is another important concept associated with window functions: for each row, there is a set of rows within its partition called its window frame. Some window functions act only on the rows of the window frame, rather than of the whole partition. By default, if ORDER BY is supplied then the frame
consists of all rows from the start of the partition up through the current row, plus any following rows that are equal to the current row according to the ORDER BY clause. When ORDER BY is omitted the default frame consists of all rows in the partition.  【如果order by 没有省略，那么这行的window frame的范围为从当前的partition的开始位置到当前行，再加上与当前行的order by的字段的值相等的所有行。如果order by 省略了，就是partition中的所有行】

省略order by 的例子：

```postgresql
SELECT salary, sum(salary) OVER () FROM empsalary;
```

查询结果 ：

| salary | sum   |
| ------ | ----- |
| 5200   | 47100 |
| 5000   | 47100 |
| 3500   | 47100 |
| 4800   | 47100 |
| 3900   | 47100 |
| 4200   | 47100 |
| 4500   | 47100 |
| 4800   | 47100 |
| 6000   | 47100 |
| 5200   | 47100 |

因为省略了order by 所有sum(salary)就是所有行相加的结果 。

有order by 的例子：

```postgresql
SELECT salary, sum(salary) OVER (ORDER BY salary) FROM empsalary;
```

查询结果：

| salary | sum   |
| ------ | ----- |
| 3500   | 3500  |
| 3900   | 7400  |
| 4200   | 11600 |
| 4500   | 16100 |
| 4800   | 25700 |
| 4800   | 25700 |
| 5000   | 30700 |
| 5200   | 41100 |
| 5200   | 41100 |
| 6000   | 47100 |

> 注意看4800两条纪录的的sum的值

Window functions are permitted only in the SELECT list and the ORDER BY clause of the query.
