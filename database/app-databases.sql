USE flexpath_final;
DROP TABLE IF EXISTS service_records;
DROP TABLE IF EXISTS vehicles;

CREATE TABLE vehicles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    make VARCHAR(50) NOT NULL,
    model VARCHAR(50) NOT NULL,
    year INT NOT NULL,
    is_private BOOLEAN DEFAULT TRUE
);

CREATE TABLE service_records (
    id INT AUTO_INCREMENT PRIMARY KEY,
    vehicle_id INT NOT NULL,
    service_name VARCHAR(100) NOT NULL,
    service_provider VARCHAR(100) NULL,
    description TEXT NULL,
    cost DECIMAL(10, 2) NOT NULL,
    mileage INT NULL,
    service_date DATE NOT NULL,
    is_private BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (vehicle_id) REFERENCES vehicles(id) ON DELETE CASCADE
);

INSERT INTO vehicles (id, username, make, model, year, is_private) VALUES
(1, 'user 1', 'Honda', 'Civic', 2018, FALSE),
(2, 'user 1', 'Ford', 'F-150', 2021, TRUE),
(3, 'user 2', 'BMW', 'Classy', 2026, FALSE),
(4, 'user 2', 'Ferarri', 'F-1550', 2021, TRUE),
(5, 'user 1', 'Chevrolet', 'Impala', 1978, FALSE),
(6, 'user 2', 'GMC', 'Acadia', 2016, TRUE);

INSERT INTO service_records (vehicle_id, service_name, service_provider, description, cost, mileage, service_date, is_private) VALUES
(1, 'Synthetic Oil Change', 'Jiffy Lube', 'Replaced engine oil and oil filter fluid checks completed.', 45.00, 62500, '2026-01-15', FALSE),
(1, 'Front Brake Job', 'Brake Masters', 'Replaced front pads and turned rotors.', 185.50, 64200, '2026-04-20', FALSE),
(2, 'Spark Plug Ingestion', 'Independent Repair', 'Routine engine tune up replacement.', 120.00, NULL, '2026-06-10', TRUE),
(3, 'Front Brake Job', 'Brake Masters', 'Replaced front pads and turned rotors.', 185.50, 64200, '2026-04-20', FALSE),
(4, 'Spark Plug Ingestion', 'Independent Repair', 'Routine engine tune up replacement.', 120.00, NULL, '2026-06-10', TRUE),
(5, 'Synthetic Oil Change', 'Jiffy Lube', 'Replaced engine oil and oil filter fluid checks completed.', 45.00, 62500, '2026-01-15', FALSE),
(5, 'Front Brake Job', 'Brake Masters', 'Replaced front pads and turned rotors.', 185.50, 64200, '2026-04-20', FALSE),
(6, 'Spark Plug Ingestion', 'Independent Repair', 'Routine engine tune up replacement.', 120.00, NULL, '2026-06-10', TRUE);