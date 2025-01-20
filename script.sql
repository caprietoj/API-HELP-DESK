-- Crear base de datos
CREATE DATABASE IF NOT EXISTS helpdesk;
USE helpdesk;

-- Crear tabla de usuarios
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    firstName VARCHAR(100) NOT NULL,
    lastName VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    cedula VARCHAR(20) UNIQUE,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Crear tabla de técnicos
CREATE TABLE technicians (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    userId INT,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE SET NULL ON UPDATE CASCADE
);

-- Crear tabla de tipos de incidentes
CREATE TABLE incident_types (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description VARCHAR(255),
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Crear tabla de tickets
CREATE TABLE tickets (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    status ENUM('open', 'in_progress', 'closed') DEFAULT 'open',
    identifier VARCHAR(50) NOT NULL UNIQUE,
    userId INT NOT NULL,
    technicianId INT,
    incidentTypeId INT NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (technicianId) REFERENCES technicians(id) ON DELETE SET NULL ON UPDATE CASCADE,
    FOREIGN KEY (incidentTypeId) REFERENCES incident_types(id) ON DELETE CASCADE ON UPDATE CASCADE
);


-- Crear tablas para las solicitudes

CREATE TABLE request_types (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description VARCHAR(255),
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE requests (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    cedula VARCHAR(20) NOT NULL,
    position VARCHAR(100) NOT NULL,
    requestTypeId INT NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (requestTypeId) REFERENCES request_types(id) ON DELETE CASCADE ON UPDATE CASCADE
);


-- Crear tabla para almacenar los datos del KPI
CREATE TABLE kpis (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,              -- Nombre del KPI
    methodology TEXT NOT NULL,               -- Metodología del KPI
    indicatorPercentage DECIMAL(5, 2) NOT NULL,  -- Porcentaje Indicador (meta)
    frequency VARCHAR(50) NOT NULL,          -- Frecuencia (diaria, semanal, mensual, etc.)
    measurementDate DATE NOT NULL,           -- Fecha de medición
    achievedPercentage DECIMAL(5, 2) NOT NULL, -- Porcentaje Alcanzado
    status VARCHAR(50),                      -- Estado (Cumplido o No Cumplido)
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
