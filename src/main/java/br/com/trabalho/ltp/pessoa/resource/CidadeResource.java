package br.com.trabalho.ltp.pessoa.resource;

import java.util.List;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import br.com.trabalho.ltp.pessoa.entity.Cidade;

@Path("/cidade")
public class CidadeResource {
    @GET
    @Path("/{uf}")
    @Produces(MediaType.APPLICATION_JSON)
    public List<Cidade> listByUf(@PathParam("uf") String uf){
        return Cidade.listByUf(uf);
    }
}
