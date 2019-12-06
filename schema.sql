CREATE TABLE accounts(
    id SERIAL,
    accountnumber BIGINT,
    createdon VARCHAR(255),
    type VARCHAR(255),
    status VARCHAR(255),
    balance BIGINT,
    owner VARCHAR(255),
    email VARCHAR(255),
    imgurl VARCHAR(255)

    PRIMARY KEY (id)
)