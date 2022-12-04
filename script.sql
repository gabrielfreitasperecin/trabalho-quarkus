DROP DATABASE crudquarkus;
CREATE DATABASE crudquarkus;
USE crudquarkus;

/*Produtos*/
CREATE TABLE produtos(
	id INT PRIMARY KEY AUTO_INCREMENT,
	codProduto VARCHAR(20),
	descricao VARCHAR(200),
	valorCusto DECIMAL(10,2),
	valorVenda DECIMAL(10,2),
	qtdEstoque INT NULL
)ENGINE = INNODB;

INSERT INTO produtos (codProduto, descricao, valorCusto, valorVenda, qtdEstoque)
VALUES ('CHUSDOFP', 'Chinelo', '4.99', '14.99', '5');
INSERT INTO produtos (codProduto, descricao, valorCusto, valorVenda, qtdEstoque)
VALUES ('NQWUDAUADC', 'New Balance', '149.99', '299.99', '10');
INSERT INTO produtos (codProduto, descricao, valorCusto, valorVenda, qtdEstoque)
VALUES ('BJFSDOFOA', 'Bota Oakley', '199.99', '399.99', '7');


/*Pessoa, estado e cidade*/
CREATE TABLE estado(
	uf VARCHAR(2) PRIMARY KEY,
    descricao VARCHAR(30)
)ENGINE = INNODB;

CREATE TABLE cidade(
	id INT PRIMARY KEY AUTO_INCREMENT,
    descricao VARCHAR(200) NOT NULL,
    uf VARCHAR(2) NOT NULL,
    FOREIGN KEY (uf) REFERENCES estado (uf) ON DELETE CASCADE ON UPDATE NO ACTION
)ENGINE = INNODB;

CREATE TABLE pessoa(
	id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(200),
    cpf VARCHAR(14),
    idade INT,
	endereco VARCHAR(300),
    cidade_id INT NOT NULL,
	FOREIGN KEY (cidade_id) REFERENCES cidade (id) ON DELETE CASCADE ON UPDATE NO ACTION
)ENGINE = INNODB;

INSERT INTO estado VALUES ('SP', 'São Paulo');
INSERT INTO estado VALUES ('RJ', 'Rio de Janeiro');
INSERT INTO estado VALUES ('MG', 'Minas Gerais');
INSERT INTO estado VALUES ('ES', 'Espírito Santo');
INSERT INTO estado VALUES ('BA', 'Bahia');

INSERT INTO cidade VALUES (NULL, 'São Paulo', 'SP');
INSERT INTO cidade VALUES (NULL, 'São José do Rio Preto', 'SP');
INSERT INTO cidade VALUES (NULL, 'Rio de Janeiro', 'RJ');
INSERT INTO cidade VALUES (NULL, 'Belo Horizonte', 'MG');
INSERT INTO cidade VALUES (NULL, 'Vitória', 'ES');
INSERT INTO cidade VALUES (NULL, 'Salvador', 'BA');
