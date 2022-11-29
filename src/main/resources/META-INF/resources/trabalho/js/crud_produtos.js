
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
    produtos = {};
    produtos.codProduto   = document.getElementById("codProduto").value;
    produtos.descricao    = document.getElementById("descricao").value;
    produtos.valorCusto   = document.getElementById("valor").value;
    produtos.valorVenda   = document.getElementById("valorVenda").value;
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
            let cod_barras          = "<td>"+dados[index]['codProduto']+"</td>";
            let descricao_produto   = "<td>"+dados[index]['descricao']+"</td>";
            let valor_custo         = "<td>"+dados[index]['valorCusto']+"</td>";
            let valor_venda         = "<td>"+dados[index]['valorVenda']+"</td>";
            let quantidade_produto  = "<td>"+dados[index]['qtdEstoque']+"</td>";
            let opcoes              = "<td>"+spn_editar(`${dados[index]['id']}`)+spn_remover(`${dados[index]['id']}`)+"</td>";
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

function spn_editar(id){
    let spn_class   = "class='badge bg-primary' ";
    let spn_style   = "style='cursor: pointer; padding: 10px; margin-right: 5px;' ";
    let spn_onclick = `onclick='remover_linha(${id})'`;
    let btn_editar = "<span "+spn_class+spn_style+spn_onclick+" >Editar</span>";
    return btn_editar;
}

function spn_remover(id){
    let spn_class   = "class='badge bg-danger' ";
    let spn_style   = "style='cursor: pointer; padding: 10px;' ";
    let spn_onclick = `onclick='remover_linha(${id})'`;
    let btn_remover = "<span "+spn_class+spn_style+spn_onclick+" >Excluir</span>";
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


function somente_numeros(evento) {
    let input = document.getElementById('valor').value;
    var evento = evento || window.event;
    var key = evento.key;
    if (!((key >= 0 && key <= 9) || (key == '.' || key == ','))) {
        evento.returnValue = false;
    } else{
        if(key == '.' && input.indexOf(".") != -1){
            evento.returnValue = false;
        } else if (key == ',' && input.indexOf(",") != -1){
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