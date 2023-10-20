CREATE TABLE IF NOT EXISTS region (
  id INT NOT NULL AUTO_INCREMENT,
  region_name VARCHAR(255) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS users (
    id INT NOT NULL AUTO_INCREMENT,
    email VARCHAR(255) NOT NULL UNIQUE,
    password LONGTEXT NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS city (
  id INT NOT NULL,
  region_id INT NOT NULL,
  name VARCHAR(255) NOT NULL,
  PRIMARY KEY (region_id,name),
  INDEX idx_city_id (id),
INDEX idx_region_id (region_id),
  CONSTRAINT fk_region_id_city FOREIGN KEY (region_id) REFERENCES region(id)
);

CREATE TABLE IF NOT EXISTS sun (
  date DATE NOT NULL,
  city_id int NOT NULL,
  sunset TIME NOT NULL,
  sunrise TIME NOT NULL,
  PRIMARY KEY (date, city_id),
  CONSTRAINT fk_city_id_sun FOREIGN KEY (city_id) REFERENCES city(id)
);

CREATE TABLE IF NOT EXISTS family (
  name VARCHAR(50) NOT NULL,
  PRIMARY KEY (name)
);

-- добавляем индекс на столбец name, но с другим именем
CREATE TABLE IF NOT EXISTS flower (
  name VARCHAR(50) NOT NULL,
  family VARCHAR(50) NOT NULL,
  PRIMARY KEY (name),
  CONSTRAINT fk_family_name FOREIGN KEY (family) REFERENCES family(name),
  INDEX idx_flower_name (name)
);

CREATE TABLE IF NOT EXISTS menu (
  id DATETIME NOT NULL,
  city_id int NOT NULL,
  temperature INT NOT NULL,
  precipitation FLOAT NOT NULL,
  uv_index FLOAT NOT NULL,
  wind_speed FLOAT NOT NULL,
  wind_direction VARCHAR(10) NOT NULL,
  visibility FLOAT NOT NULL,
  PRIMARY KEY (id, city_id),
  CONSTRAINT fk_city_id_menu FOREIGN KEY (city_id) REFERENCES city(id)
);

CREATE TABLE IF NOT EXISTS map (
  month VARCHAR(20) NOT NULL,
  name_flower VARCHAR(50) NOT NULL,
  x FLOAT NOT NULL,
  y FLOAT NOT NULL,
  lvl INT NOT NULL CHECK (lvl >= 1 AND lvl <= 3), -- Ограничение на диапазон от 1 до 3
  PRIMARY KEY (month, name_flower, x, y),
  CONSTRAINT fk_flower_name_map FOREIGN KEY (name_flower) REFERENCES flower(name)
);
CREATE VIEW cityWithRegion as SELECT city.id,city.name, region.region_name FROM city,region WHERE city.region_id = region.id;