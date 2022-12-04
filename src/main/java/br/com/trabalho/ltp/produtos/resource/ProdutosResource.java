package br.com.trabalho.ltp.produtos.resource;

import java.util.List;

import javax.transaction.Transactional;
import javax.ws.rs.BadRequestException;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.NotFoundException;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import br.com.trabalho.ltp.produtos.entity.Produtos;

@Path("/produtos")
public class ProdutosResource {

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<Produtos> getAll(){
        return Produtos.listAll();
    }

    @POST
    @Transactional
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response create(Produtos produtos){
        produtos.persist();
        return Response.status(Status.CREATED).entity(produtos).build();
    }

    @GET
    @Path("/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Produtos getById(@PathParam("id") Long id){
        return Produtos.findById(id);
    }

    @PUT
    @Transactional
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/{id}")
    public Response update(@PathParam("id") Long id, Produtos produtos){
        Produtos entity = Produtos.findById(id);
        if (entity == null){
            throw new NotFoundException();
        }

        entity.codProduto   = produtos.codProduto;
        entity.descricao    = produtos.descricao;
        entity.valorCusto   = produtos.valorCusto;
        entity.valorVenda   = produtos.valorVenda;
        entity.qtdEstoque   = produtos.qtdEstoque;

        entity.persist();

        return Response.status(Status.OK).entity(entity).build();
    }

    @GET
    @Path("/busca")
    @Produces(MediaType.APPLICATION_JSON)
    public List<Produtos> buscarPesquisa(@QueryParam("ds_pesquisa") String ds_pesquisa){
        if(ds_pesquisa == null){
            throw new BadRequestException("Enviar o parâmetro descricao");
        }
        return Produtos.findByName(ds_pesquisa);
    }

    @DELETE
    @Transactional
    @Path("/{id}")
    public Response delete(@PathParam("id") Long id){
        Produtos entity = Produtos.findById(id);
        if (entity == null){
            throw new NotFoundException();
        }
        entity.delete();

        return Response.status(Status.OK).build();
    }
}