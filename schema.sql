CREATE TABLE accounts(
    id SERIAL,
    accountnumber BIGINT,
    createdon VARCHAR(255),
    type VARCHAR(255),
    status VARCHAR(255),
    balance BIGINT,
    owner VARCHAR(255),
    email VARCHAR(255),
    imgurl VARCHAR(255),

    PRIMARY KEY (id)
);

CREATE TABLE users(
    id SERIAL,
    email VARCHAR(255),
    firstname VARCHAR(255),
    lastname VARCHAR(255),
    password VARCHAR(255),
    imgurl VARCHAR(255),
    isadmin BOOLEAN,

    PRIMARY KEY (id)
);

CREATE TABLE transactions(
    id SERIAL,
    type VARCHAR(255),
    accountnumber BIGINT,
    amount BIGINT,
    oldbalance BIGINT,
    newbalance BIGINT,
    accountid BIGINT,
    sender VARCHAR(255),
    datetime VARCHAR(255),
    cashier VARCHAR(255),

    PRIMARY KEY (id)
);