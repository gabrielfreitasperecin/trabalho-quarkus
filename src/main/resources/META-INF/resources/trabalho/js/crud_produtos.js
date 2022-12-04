
function inserir_produto(){
    if(!valida_campos()) return
    envia_produto();    
}

function valida_campos(){
    let spn_inserir = document.getElementById('spn_inserir');
    if (descricao.value == '' || valor.value == '' || quantidade.value == '') {
        spn_inserir.innerHTML = " Preencha todas as informações!";
        return false;
    } else {
        spn_inserir.innerHTML = '';
        return true;
    }
}

function envia_produto(){
    let valorCusto = document.getElementById("valor").value;
    let valorVenda = document.getElementById("valorVenda").value;
    produtos = {};
    produtos.codProduto   = document.getElementById("codProduto").value;
    produtos.descricao    = document.getElementById("descricao").value;
    produtos.valorCusto   = valorCusto.replace(',', '.');
    produtos.valorVenda   = valorVenda.replace(',', '.');
    produtos.qtdEstoque   = document.getElementById("quantidade").value;

    axios.post("http://localhost:8080/produtos", produtos)
    .then(function (response) {
        alert("Cadastro realizado com sucesso");
        limpar_campos();
        recupera_dados();
    })
    .catch(function (error) {

    });
}

function limpar_campos(){
    document.getElementById('codProduto').value = '';
    document.getElementById('descricao').value = '';
    document.getElementById('valor').value = '';
    document.getElementById('valorVenda').value = '';
    document.getElementById('quantidade').value = '';
}

function conteudo_tabela(response){
    const dados = response.data;
    let conteudo_tabela = '';
    for (let index = 0; index <= dados.length; index++) {
        if (dados[index]) {
            let valorCusto = `${dados[index]['valorCusto']}`;
            let valorVenda = `${dados[index]['valorVenda']}`;
            let cod_barras          = "<td style='padding-top: 15px; padding-bottom: 15px;'>"+dados[index]['codProduto']+"</td>";
            let descricao_produto   = "<td style='padding-top: 15px; padding-bottom: 15px;'>"+dados[index]['descricao']+"</td>";
            let valor_custo         = "<td style='padding-top: 15px; padding-bottom: 15px;'>"+valorCusto.replace('.', ',')+"</td>";
            let valor_venda         = "<td style='padding-top: 15px; padding-bottom: 15px;'>"+valorVenda.replace('.', ',')+"</td>";
            let quantidade_produto  = "<td style='padding-top: 15px; padding-bottom: 15px;'>"+dados[index]['qtdEstoque']+"</td>";
            let opcoes              = "<td>"+btn_editar(`${dados[index]['id']}`)+btn_remover(`${dados[index]['id']}`)+"</td>";
            let linha_tabela        = "<tr>"+cod_barras+descricao_produto+valor_custo+valor_venda+quantidade_produto+opcoes+"</tr>";
            conteudo_tabela         = conteudo_tabela+linha_tabela;
        } else{
            continue;
        }
    }
    let tbody       = document.getElementById('tabela_body');
    tbody.innerHTML = conteudo_tabela;
}

function recupera_dados() {
    axios.get('http://localhost:8080/produtos', {})
    .then(function (response) {
        conteudo_tabela(response);
    })
    .catch(function (error) {
        
    });
}

function btn_editar(id){
    let btn_class   = "class='btn btn-primary' ";
    let btn_modal   = "data-bs-toggle='modal' data-bs-target='#modalAlteracao' "
    let btn_type   = "type='button'";
    let btn_onclick = `onclick='editar_produto(${id})'`;
    let btn_editar = "<button "+btn_class+btn_modal+btn_type+btn_onclick+" >Editar</button>";
    return btn_editar;
}

function btn_remover(id){
    let btn_class   = "class='btn btn-danger' ";
    let btn_style   = "style='margin-left: 5px;' ";
    let btn_type    = "type='button'";
    let btn_onclick = `onclick='remover_linha(${id})'`;
    let btn_remover = "<span "+btn_class+btn_style+btn_type+btn_onclick+" >Excluir</span>";
    return btn_remover;
}

function remover_linha(idProduto){
    axios.delete(`http://localhost:8080/produtos/${idProduto}`)
    .then(function (response) {
        alert("Exclusão realizada com sucesso");
        recupera_dados();
    })
    .catch(function (error) {
        
    });
}


function somente_numeros(evento, input) {
    let inputValue = input.value;
    var evento = evento || window.event;
    var key = evento.key;
    if (!((key >= 0 && key <= 9) || ((key == ',') && (input.id != 'quantidade' && input.id != 'quantidadeAlteracao')))) {
        evento.returnValue = false;
    }else{
        if (key == ',' && inputValue.indexOf(",") != -1){
            evento.returnValue = false;
        }
    }
 }

 function pesquisar(){
    let inputValue = `${document.getElementById('pesquisa').value}`;
    axios.get(`http://localhost:8080/produtos/busca?ds_pesquisa=${inputValue}`)
    .then(function (response) {
        conteudo_tabela(response);
    })
    .catch(function (error) {
        
    });
 }

 function editar_produto(id) {
    axios.get('http://localhost:8080/produtos/'+id)
    .then(function (response) {
        let dados = response.data;
        document.getElementById('codProdutoAlteracao').value = dados.codProduto;
        document.getElementById('descricaoAlteracao').value = dados.descricao;
        document.getElementById('valorAlteracao').value = dados.valorCusto;
        document.getElementById('valorVendaAlteracao').value = dados.valorVenda;
        document.getElementById('quantidadeAlteracao').value = dados.qtdEstoque;
        document.getElementById('btn_salvar_alteracao').setAttribute("onclick", `salvar_alteracoes(${id})`)
    })
    .catch(function (error) {
        
    });
 }

 function salvar_alteracoes(id){
    if (!valida_campos_alteracao()) return;
    let valorCusto = document.getElementById("valorAlteracao").value;
    let valorVenda = document.getElementById("valorVendaAlteracao").value;
    produtos = {};
    produtos.codProduto   = document.getElementById("codProdutoAlteracao").value;
    produtos.descricao    = document.getElementById("descricaoAlteracao").value;
    produtos.valorCusto   = valorCusto.replace(',', '.');
    produtos.valorVenda   = valorVenda.replace(',', '.');
    produtos.qtdEstoque   = document.getElementById("quantidadeAlteracao").value;

    axios.put(`http://localhost:8080/produtos/${id}`, produtos)
    .then(function (response) {
        alert("Alteração realizada com sucesso");
        editar_produto(id);
        recupera_dados();
    })
    .catch(function (error) {

    });
 }

 function valida_campos_alteracao(){
    let spn_inserir = document.getElementById('spn_inserir');
    if (codProdutoAlteracao.value == '' || descricaoAlteracao.value == '' || valorAlteracao.value == '' || valorVendaAlteracao.value == '' || quantidadeAlteracao.value == '') {
        spn_alterar.innerHTML = " Preencha todas as informações!";
        return false;
    } else {
        spn_alterar.innerHTML = '';
        return true;
    }
}


function funcaoPaginaCarregada() {
    var inputs = document.getElementsByClassName('number');
    for (let index = 0; index < inputs.length; index++) {
        const element = inputs[index];
        element.addEventListener("keypress", function(e) {
            somente_numeros(e, element);   
        });
    }
}