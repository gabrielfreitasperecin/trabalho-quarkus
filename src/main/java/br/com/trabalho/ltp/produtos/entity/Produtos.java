package br.com.trabalho.ltp.produtos.entity;

import java.util.List;
import javax.persistence.Entity;
import io.quarkus.hibernate.orm.panache.PanacheEntity;

@Entity
public class Produtos extends PanacheEntity{

    public long id;

    public String codProduto;

    public String descricao;

    public float valorCusto;

    public float valorVenda;

    public int qtdEstoque;

    public static List<Produtos> findByName(String ds_pesquisa){
        ds_pesquisa = "%"+ds_pesquisa+"%";
        return find("descricao like ?1 OR codProduto like ?2", ds_pesquisa, ds_pesquisa).list();
    }
    
}