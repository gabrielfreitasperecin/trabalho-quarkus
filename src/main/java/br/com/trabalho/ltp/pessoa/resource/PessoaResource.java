package br.com.trabalho.ltp.pessoa.resource;

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

import br.com.trabalho.ltp.pessoa.entity.Pessoa;

@Path("/pessoa")
public class PessoaResource {

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<Pessoa> getAll(){
        return Pessoa.listAll();
    }

    // @GET
    // @Path("/{id}")
    // @Produces(MediaType.APPLICATION_JSON)
    // public Pessoa getById(@PathParam("id") Long id){
    //     return Pessoa.findById(id);
    // }

    @GET
    @Path("/busca")
    @Produces(MediaType.APPLICATION_JSON)
    public List<Pessoa> buscarPorNome(@QueryParam("nome") String nome){
        if(nome == null){
            throw new BadRequestException("Enviar o parâmetro nome");
        }
        return Pessoa.findByName(nome);
    }

    @POST
    @Transactional
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response create(Pessoa pessoa){
        if(pessoa.cpf.equals("")){
            throw new BadRequestException("Cpf é obrigatório");
        }

        pessoa.persist();
        return Response.status(Status.CREATED).entity(pessoa).build();
    }

    // @PUT
    // @Transactional
    // @Consumes(MediaType.APPLICATION_JSON)
    // @Produces(MediaType.APPLICATION_JSON)
    // @Path("/{id}")
    // public Response update(@PathParam("id") Long id, Pessoa pessoa){
    //     Pessoa entity = Pessoa.findById(id);
    //     if (entity == null){
    //         throw new NotFoundException();
    //     }

    //     entity.nome = pessoa.nome;
    //     entity.cpf = pessoa.cpf;
    //     entity.idade = pessoa.idade;
    //     entity.endereco = pessoa.endereco;
    //     entity.cidade_id = pessoa.cidade_id;

    //     entity.persist();

    //     return Response.status(Status.OK).entity(entity).build();
    // }

    @DELETE
    @Transactional
    @Path("/{id}")
    public Response delete(@PathParam("id") Long id){
        Pessoa entity = Pessoa.findById(id);
        if (entity == null){
            throw new NotFoundException();
        }
        entity.delete();

        return Response.status(Status.OK).build();
    }
    
}