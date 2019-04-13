DROP DATABASE IF EXISTS bamazon_db;
CREATE database bamazon_db;

USE bamazon_db;

CREATE TABLE products
(
    item_id INT NOT NULL
    AUTO_INCREMENT,
    product_ VARCHAR
    (100) NULL,
    department_name VARCHAR
    (100) NULL,
    price DECIMAL
    (20,2) NULL,
    stock_quantity DECIMAL
    (1000) NULL,
    PRIMARY KEY
    (item_id)
);

    INSERT INTO products
        (product, department_name, price)
    VALUES
        ("Ipad", electronics, 200),
        ("Iphone", electronics, 100),
        ("MacBook", electronics, 500),
        ("T-shirt", clothing, 15),
        ("Sweatshirt", clothing, 25),
        ("Pants", clothing, 25),
        ("shoes", clothing, 20),
        ("Chair", furniture, 50),
        ("Table", furniture, 100),
        ("coffee table", furniture, 75)
    ,


    SELECT *
    FROM top5000;
    select *
    from top_albums;