CREATE DATABASE myappdb;
CREATE USER myappuser WITH ENCRYPTED PASSWORD 'mypassword';
GRANT ALL PRIVILEGES ON DATABASE myappdb TO myappuser;
