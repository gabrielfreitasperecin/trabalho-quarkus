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

    @DELETE
    @Transactional
    @Path("/{codProduto}")
    public Response delete(@PathParam("codProduto") Long codProduto){
        Produtos entity = Produtos.findById(codProduto);
        if (entity == null){
            throw new NotFoundException();
        }
        entity.delete();

        return Response.status(Status.OK).build();
    }

    // @GET
    // @Path("/busca")
    // @Produces(MediaType.APPLICATION_JSON)
    // public List<Pessoa> buscarPorNome(@QueryParam("nome") String nome){
    //     if(nome == null){
    //         throw new BadRequestException("Enviar o parâmetro nome");
    //     }
    //     return Pessoa.findByName(nome);
    // }
}