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

## window function(窗口函数)

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

------

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

------

窗口函数还可以用于子查询:

1. 查出每个部门排名前两位的纪录【有相同时工资时，每个部门可以大于两条纪录】

```postgresql
select depname, empno, salary, pos
from (select depname,
             empno,
             salary, rank() over ( partition by depname order by salary desc) as pos
      from empsalary) as temp
where pos < 3;
```

2. 查出每个部门排名前两位的纪录【有相同时工资时，取工号排名靠前的两条】

```postgresql
SELECT depname, empno, salary, pos
FROM (SELECT depname,
             empno,
             salary,
             rank() OVER (PARTITION BY depname ORDER BY salary DESC,
                 empno) AS pos
      FROM empsalary) AS ss
WHERE pos < 3;
```

------

当一个查询中涉及多个窗口函数时，可以用WINDDOW子句来定义窗口行为，再在OVER中引用

```postgresql
SELECT sum(salary) OVER w, avg(salary) OVER w
FROM empsalary
WINDOW w AS (PARTITION BY depname ORDER BY salary DESC);
```

## Inheritance(表继承)

像面向对象编程一样的，在postgreSQL中也支持表的继承。如下：

```postgresql
CREATE TABLE cities (
name text,
population real,
elevation int -- (in ft)
);
CREATE TABLE capitals (
state char(2) UNIQUE NOT NULL
) INHERITS (cities);
```

在往cities表中插入数据时，数据会存储在cities中的物理表中，数据不会在capitals中显示；往capitals中插入数据时，数据会存储在capitals的物理表中，但数据也会同步在cities中显示。

```postgresql
SELECT name, elevation
FROM cities;
```

上面这个查询语句会查询出两个表中的所有数据。

```postgresql
SELECT name, elevation
FROM ONLY cities;
```

上面这个查询语句会只查询出 cities这个表中的数据。同样地，`only`关键词支持`SELECT, UPDATE, and DELETE`语句。

## Identifier(标识符)

SQL identifiers and key words must begin with a letter (a-z, but also letters with diacritical marks and non-Latin letters) or an underscore (_). 

标识符可以以任何一个字符开头，这个字符可以是a-z(不区分大小写)；可以是带变音符号的字母，可以中日文等； 可以是下划线。不能以数字开头。标识符后面的字符可以是字母、数字、下划线和`$`符号【SQL标准中并不支持，所以会给移植带来不便】 。SQL标准不会定义包含任何数字或者以下划线开头或者以下划线结束的关键词。

系统使用的标识符的字节长度不超过` NAMEDATALEN-1`个，其中的` NAMEDATALEN`默认大小为64。声明在`src/include/pg_config_manual.h`当中【修改此常量需要重新编译 PostgreSQL 源代码才能生效】

Key words and unquoted identifiers are case-insensitive. A convention often used is to write key words in upper case and names in lower case, e.g.:
`UPDATE my_table SET a = 5;`

还有一种是带有双引号的标识符，双引号里面可以是任何字符【非0】；这使得大小写敏感了。还可以`U&`开头来使用unicode码来定义标识符，如`U&"d\0061t\+000061"`

## 常量

1. 常规字符串

字符串中有单引号时，用两个相邻的单引号来表示，如：

```postgresql
select 'my name''s is LeiTe';
```

两个换行【至少一个换行符】的字符串会被合成一个串。如：

```postgresql
SELECT 'foo'
'bar';
```

上面这个语句与下面这个是等效的

```postgresql
SELECT 'foobar';
```

------

2. 转义符字符串：

An escape string constant is specified by writing the letter E (upper or lower case) just before the opening single quote, e.g., `E'foo\nbar'`.

当`standard_conforming_strings`这个配置是off时，在普通的字符串中的`\`和`E''`字符串中`\`都有转义的功能。在`Post-greSQL 9.1`版本后这个设置默认值是on。只有在`E''`字符串中`\`才有转义的功能，即

```postgresql
SELECT 'foo'
 '\nbar';
```

这个sql中的`\n`没有换行功能

------

3. Unicode转义字符串：

用`u&`前缀表示为unicode转义的字符串。`\`加4位16进制数字或者`\+`加6位16进制数

```postgresql
select * from cities where name = 'Hello from PostgreSQL! 👋😊🎉';

SELECT * FROM cities
WHERE name = U&'Hello from PostgreSQL! \+01F44B\+01F60A\+01F389';
```

上面这两个效果是相同的。

------

4. Dollar-Quoted String Constants：

```postgresql
select $$Dianne's horse$$;

select  $SomeTag$Dianne's horse$SomeTag$;
```

上面两个sql效果相同，将会得到`Dianne's horse`。$$里面的字符串都不会转义

------

5. Bit-String Constants： 

`B'1001'`这种是只有0和1；

` X'1FF'`16进制数字

6. 其它类型的常量转化

`type 'string'`： 标准SQL只支持部分类型转换，postgreSQL支持所有类型
`'string'::type`：postgreSQL历史使用原因，相当于`typename ( 'string' )` 函数调用
`CAST ( 'string' AS type )`:  符合标准SQL

## 聚合函数表达式

count(*) yields the total number of input rows; count(f1) yields the number of input rows in which f1 is non-null, since count ignores nulls; and count(distinct f1) yields the number of distinct non-null values of f1.

```postgresql
-- 所有行数
select count(*) from public.cities;
-- name列中非null的数量
select count(name) from public.cities;
-- name列中非null非重复的数量
select count(distinct name) from public.cities;
```

## Table

There is a limit on how many columns a table can contain. Depending on the column types, it is between 250 and 1600. 

提供默认值：

```postgresql
CREATE TABLE products (
product_no integer DEFAULT nextval('products_product_no_seq'),
...
);
-- 这种方式还有一种简短方式
CREATE TABLE products (
product_no SERIAL,
...
);
```

DEFAULTS可以用于insert与update语句中

```postgresql
INSERT INTO people (id, name, address) VALUES (DEFAULT, 'C','baz');
```



### identity column

```postgresql
CREATE TABLE people (
id bigint GENERATED ALWAYS AS IDENTITY,
...,
);
```

> 以下是 GENERATED ALWAYS AS IDENTITY 和 SERIAL 的详细对比：
>
> | 特性           | GENERATED ALWAYS AS IDENTITY                    | SERIAL                                                       |
> | -------------- | ----------------------------------------------- | ------------------------------------------------------------ |
> | **定义**       | 基于 SQL 标准的自增列，显式绑定到序列。         | PostgreSQL 特有的伪类型，简化为序列绑定。                    |
> | **SQL 标准**   | 符合 SQL 标准，可移植性更好。                   | 非 SQL 标准，仅 PostgreSQL 支持。                            |
> | **类型支持**   | 可搭配 smallint、integer、bigint。              | SMALLSERIAL、SERIAL、BIGSERIAL 分别对应三种类型。            |
> | **手动插入值** | 默认禁止（需 OVERRIDING SYSTEM VALUE）。        | 允许手动插入值，序列不受影响。                               |
> | **严格性**     | 更严格，适合需要明确自增行为的场景。            | 更宽松，适合快速开发。                                       |
> | **序列控制**   | 可在建表时直接指定序列选项（START WITH 等）。   | 需要手动修改底层序列（ALTER SEQUENCE）。                     |
> | **现代化**     | PostgreSQL 10+ 推荐的方式，未来更优支持。       | 传统方式，兼容性强但较老旧。                                 |
> | **底层实现**   | 依赖序列，绑定更显式，列标记为 IDENTITY。       | 依赖序列，绑定通过 DEFAULT nextval() 实现。                  |
> | **迁移性**     | 更适合跨数据库迁移（例如 Oracle、SQL Server）。 | 需转换为其他数据库的自增机制（如 MySQL 的 AUTO_INCREMENT）。 |

> 手动插入值 
>
> ```postgresql
> insert into products_with_id (product_no, name, price) OVERRIDING SYSTEM VALUE
> values (200, 'test', default);
> ```
>
> ### `GENERATED BY DEFAULT` vs `GENERATED ALWAYS`
>
> - `GENERATED BY DEFAULT`：默认生成，但你可以直接插入值，无需 `OVERRIDING`
> - `GENERATED ALWAYS`：总是由系统生成，想覆盖就必须用 `OVERRIDING SYSTEM VALUE`

identity column不保证唯一性。

An identity column is automatically marked as NOT NULL. An identity column, however, does not guarantee uniqueness. (A sequence normally returns unique values, but a sequence could be reset, or values could be inserted manually into the identity column, as discussed above.) Uniqueness would
need to be enforced using a PRIMARY KEY or UNIQUE constraint.

标识列不会在继承中体现：

```postgresql
-- 清理环境 (如果已存在)
DROP TABLE IF EXISTS child1 CASCADE;
DROP TABLE IF EXISTS parent1 CASCADE;

-- 1. 创建父表 parent1，包含一个标识列 id
CREATE TABLE parent1 (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    description TEXT
);

-- 2. 创建子表 child1，继承自 parent1
-- child1 没有为 id 列重新定义标识列属性
CREATE TABLE child1 (
    child_specific_attribute TEXT
) INHERITS (parent1);
-- 这时child1中继承的id列不是标识列，但是id的not null 约束会被继承，所以INSERT INTO child1 (description, child_specific_attribute)
-- VALUES ('Data for child1, id from parent1 sequence', 'Child specific value'); 会报错

--   只有这样创建子表 child1，并为 id 列显式声明 IDENTITY 属性子表中的id列才为标识列
CREATE TABLE child1 (
    id INT GENERATED ALWAYS AS IDENTITY (START WITH 100 INCREMENT BY 1), -- 子表序列从100开始
    child_specific_attribute TEXT
) INHERITS (parent1);
```

### Generated Columns

```postgresql
CREATE TABLE people (
...,
height_cm numeric,
height_in numeric GENERATED ALWAYS AS (height_cm / 2.54) STORED
);
```

> PostgreSQL currently implements only stored generated columns.

### Check Constraint

```postgresql
CREATE TABLE products (
product_no integer,
name text,
price numeric CHECK (price > 0)
);
```

```postgresql
-- 可以为constraint单独命名一个名字
CREATE TABLE products (
product_no integer,
name text,
price numeric CONSTRAINT positive_price CHECK (price > 0)
);
```

CHECK 可以引用引用其它列

```postgresql
CREATE TABLE products (
product_no integer,
name text,
price numeric CHECK (price > 0),
discounted_price numeric CHECK (discounted_price > 0),
CHECK (price > discounted_price)
);
```

