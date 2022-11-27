
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
        conteudo_tabela();
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

function conteudo_tabela(){
    axios.get('http://localhost:8080/produtos', {})
    .then(function (response) {
        const dados = response.data;
        let conteudo_tabela = '';
        for (let index = 0; index <= dados.length; index++) {
            if (dados[index]) {
                let descricao_produto   = "<td>"+dados[index]['descricao']+"</td>";
                let valor_custo         = "<td>"+dados[index]['valorCusto']+"</td>";
                let valor_venda         = "<td>"+dados[index]['valorVenda']+"</td>";
                let quantidade_produto  = "<td>"+dados[index]['qtdEstoque']+"</td>";
                let btn_remover         = "<td>"+spn_remover(`${dados[index]['codProduto']}`)+"</td>";
                let linha_tabela        = "<tr>"+descricao_produto+valor_custo+valor_venda+quantidade_produto+btn_remover+"</tr>";
                conteudo_tabela         = conteudo_tabela+linha_tabela;
            } else{
                continue;
            }
        }
        let tbody       = document.getElementById('tabela_body');
        tbody.innerHTML = conteudo_tabela;
    })
    .catch(function (error) {
        
    });
}

function spn_remover(codProduto){
    let spn_class   = "class='badge bg-danger' ";
    let spn_style   = "style='cursor: pointer' ";
    let spn_onclick = `onclick='remover_linha("${codProduto}")'`;
    let btn_remover = "<span "+spn_class+spn_style+spn_onclick+" >Excluir</span>";
    return btn_remover;
}


function remover_linha(codProduto){
    axios.delete('http://localhost:8080/produtos/'+codProduto, {})
    .then(function (response) {
        console.log('ok');
    })
    .catch(function (error) {
        
    });
    delete produto[id];
    exibir_tabela();
    calcular_total_produtos();
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