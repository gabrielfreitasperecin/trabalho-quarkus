package br.com.trabalho.ltp.pessoa.entity;

import java.util.List;
import javax.persistence.Entity;
import io.quarkus.hibernate.orm.panache.PanacheEntity;

@Entity
public class Cidade extends PanacheEntity{

    public String descricao;
    
    public String uf;

    public static List<Cidade> listByUf(String uf){
        return find("uf", uf).list();
    }
}