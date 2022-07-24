--
-- File generated with SQLiteStudio v3.3.3 on Fri Sep 24 21:07:29 2021
--
-- Text encoding used: System
--
PRAGMA foreign_keys = off;
BEGIN TRANSACTION;

-- Table: address
CREATE TABLE address (id INTEGER PRIMARY KEY AUTOINCREMENT, street TEXT NOT NULL, streetNumber INTEGER NOT NULL, zipcode INTEGER NOT NULL, city TEXT NOT NULL, country STRING NOT NULL);
INSERT INTO address (id, street, streetNumber, zipcode, city, country) VALUES (1, 'Kyrkogatn', '45 A', 32254, 'Göteborg', 'Sweden');
INSERT INTO address (id, street, streetNumber, zipcode, city, country) VALUES (2, 'Lillebygatan', 56, 43217, 'Mölmo', 'Sweden');
INSERT INTO address (id, street, streetNumber, zipcode, city, country) VALUES (3, 'Roslagsgatan', '2 B', 54376, 'Göteborg', 'Sweden');
INSERT INTO address (id, street, streetNumber, zipcode, city, country) VALUES (4, 'Karl Johansgatan', '56- 57', 54321, 'Lund', 'Sweden');
INSERT INTO address (id, street, streetNumber, zipcode, city, country) VALUES (5, 'Sjöportsgatan', 88, 41789, 'Partile', 'Sweden');
INSERT INTO address (id, street, streetNumber, zipcode, city, country) VALUES (6, 'Kungsgatan', '3 C', 65437, 'Alta', 'Norway');

-- Table: products
CREATE TABLE products (id INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE NOT NULL, name STRING NOT NULL, description TEXT NOT NULL, price DECIMAL NOT NULL, image VARCHAR);
INSERT INTO products (id, name, description, price, image) VALUES (1, 'Bread', 'Ragi bread, freshly baked high quality ', 49, NULL);
INSERT INTO products (id, name, description, price, image) VALUES (2, 'Toothbrush', 'Electric toothbrush with crossaction', 510, NULL);
INSERT INTO products (id, name, description, price, image) VALUES (3, 'Baby food', 'Soft easily consumed food with water and milk', 75.99, NULL);
INSERT INTO products (id, name, description, price, image) VALUES (4, 'Fruits', 'Agro mixed fruits, fresh and high quality', 159, NULL);
INSERT INTO products (id, name, description, price, image) VALUES (5, 'Sause pan', 'Non stick metal pan ', 299, NULL);
INSERT INTO products (id, name, description, price, image) VALUES (6, 'Dipers', 'Mega pack', 370, NULL);
INSERT INTO products (id, name, description, price, image) VALUES (7, 'Kids toy', 'Paw petrol toy with accessories', 245, NULL);
INSERT INTO products (id, name, description, price, image) VALUES (8, 'Chicken', 'Fresh, nice and soft', 129, NULL);
INSERT INTO products (id, name, description, price, image) VALUES (9, 'Hair dryer', '900 w easy to handle', 789, NULL);
INSERT INTO products (id, name, description, price, image) VALUES (10, 'Cookies', 'Choco chips cookies', 35.99, NULL);

-- Table: stores
CREATE TABLE stores (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, name VARCHAR NOT NULL, addressId INTEGER REFERENCES address (id), storeStandardsId VARCHAR NOT NULL REFERENCES storeStandards (id), isWarehouse BOOLEAN NOT NULL);
INSERT INTO stores (id, name, addressId, storeStandardsId, isWarehouse) VALUES (1, 'Megamart', 3, '2', 'true');
INSERT INTO stores (id, name, addressId, storeStandardsId, isWarehouse) VALUES (2, 'Megamart', 6, '3', 'false');
INSERT INTO stores (id, name, addressId, storeStandardsId, isWarehouse) VALUES (3, 'Megamart', 1, '1', 'false');
INSERT INTO stores (id, name, addressId, storeStandardsId, isWarehouse) VALUES (4, 'Megamart', 2, '4', 'false');
INSERT INTO stores (id, name, addressId, storeStandardsId, isWarehouse) VALUES (5, 'Megamart', 4, '5', 'false');
INSERT INTO stores (id, name, addressId, storeStandardsId, isWarehouse) VALUES (6, 'Megamart', 5, '6', 'false');

-- Table: storesProduct
CREATE TABLE storesProduct (productId INTEGER, storeId INTEGER, quantity INTEGER, PRIMARY KEY (productId, storeId));
INSERT INTO storesProduct (productId, storeId, quantity) VALUES (1, 1, 23);

-- Table: storeStandards
CREATE TABLE storeStandards (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR, email VARCHAR NOT NULL, contact INTEGER NOT NULL, openingTime VARCHAR NOT NULL, closingTime VARCHAR NOT NULL);
INSERT INTO storeStandards (id, name, email, contact, openingTime, closingTime) VALUES (1, 'Megamart Nörra', 'contact@megamart.com', 435623, '8.00', '9.00');
INSERT INTO storeStandards (id, name, email, contact, openingTime, closingTime) VALUES (2, 'Megamart Södra', 'sales.contact@megamat.com', 345665, '10.00', '8.00');
INSERT INTO storeStandards (id, name, email, contact, openingTime, closingTime) VALUES (3, 'Megamart ', 'sales@megamatnorway.com', 654367, '8.00', '8.00');
INSERT INTO storeStandards (id, name, email, contact, openingTime, closingTime) VALUES (4, 'Megamart', 'megamart@salesmolmo.com', 654678, '7.00', '5.00');
INSERT INTO storeStandards (id, name, email, contact, openingTime, closingTime) VALUES (5, 'Megamart', 'contact.lund@megamart.com', 676536, '10.00', '8.00');
INSERT INTO storeStandards (id, name, email, contact, openingTime, closingTime) VALUES (6, 'Megamart', 'connect@pertilemegamart.com', 354678, '8.00', '8.00');

COMMIT TRANSACTION;
PRAGMA foreign_keys = on;
