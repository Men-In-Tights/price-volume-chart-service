DROP DATABASE IF EXISTS pricevolume;
CREATE DATABASE pricevolume;

\c pricevolume;

DROP TABLE IF EXISTS chart;

CREATE TABLE chart (
    id SERIAL PRIMARY KEY,
    lowest NUMERIC NOT NULL,
    highest NUMERIC NOT NULL,
    prices NUMERIC[],
    volume NUMERIC[],
    average_price NUMERIC NOT NULL,
    current_price NUMERIC NOT NULL,
    company_name VARCHAR(50) NOT NULL,
    company_symbol VARCHAR(50) NOT NULL
);

COPY chart (id, lowest, highest, prices, volume, average_price, current_price, company_name, company_symbol) FROM '/Users/vincentquan/Desktop/price-volume-chart-service/database/volumeData2.tsv' DELIMITER E'\t';