package br.com.trabalho.ltp.produtos.entity;

import java.util.List;
import javax.persistence.Entity;
import io.quarkus.hibernate.orm.panache.PanacheEntity;

@Entity
public class Produtos extends PanacheEntity{

    public String codProduto;

    public String descricao;

    public float valorCusto;

    public float valorVenda;

    public int qtdEstoque;

    // public static List<Produto> findByName(String descricao){
    //     return find("descricao", descricao).list();
    // }
    
}