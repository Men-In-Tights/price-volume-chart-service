DROP KEYSPACE IF EXISTS pricevolume;
CREATE KEYSPACE IF NOT EXISTS pricevolume WITH REPLICATION = {'class': 'SimpleStrategy', 'replication_factor': 1};

USE pricevolume;

CREATE TABLE IF NOT EXISTS pricevolume.chart(
    id INT,
    lowest FLOAT,
    highest FLOAT,
    average_price FLOAT,
    price TEXT,
    volume TEXT,
    company_name VARCHAR,
    company_symbol VARCHAR,
    PRIMARY KEY (id)
);

COPY pricevolume.chart (id, lowest, highest, average_price, price, volume, company_name, company_symbol) FROM '/Users/vincentquan/Desktop/price-volume-chart-service/database/volumeData2.tsv' WITH DELIMITER = '\t' AND HEADER = FALSE;
