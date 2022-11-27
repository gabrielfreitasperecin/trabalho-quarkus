function popularEstados(){
    axios.get('http://localhost:8080/estado', {})
    .then(function (response) {
        preencherSelectEstados(response.data);
    })
    .catch(function (error) {
        
    });
}

function preencherSelectEstados(dados){
    let selectEstado = document.getElementById("selEstado");

    dados.forEach((estado) => {
        option = new Option(estado.descricao, estado.uf);
        selectEstado.options[selectEstado.options.length] = option;
    });
}

function popularCidades(){
    let ufSelecionado = document.getElementById("selEstado").value;
    if (ufSelecionado == "") return;
    
    axios.get('http://localhost:8080/cidade/'+ufSelecionado, {})
    .then(function (response) {
        preencherSelectCidade(response.data);
    })
    .catch(function (error) {
        
    });
}

function preencherSelectCidade(dados){
    let selectCidade = document.getElementById("selCidade");
    selectCidade.options = [];
    selectCidade.options.length = 0;
    dados.forEach((cidade) => {
        option = new Option(cidade.descricao, cidade.id);
        selectCidade.options[selectCidade.options.length] = option;
    });
    selectCidade.disabled = false;
}

function cadastrar(){
    pessoa = {};
    pessoa.nome = document.getElementById("txtNome").value;
    pessoa.cpf = document.getElementById("txtCpf").value;
    pessoa.idade = document.getElementById("txtIdade").value;
    pessoa.endereco = document.getElementById("txtEndereco").value;
    pessoa.cidade_id = document.getElementById("selCidade").value;

    axios.post("http://localhost:8080/pessoa", pessoa)
    .then(function (response) {
        limparFormulario();
    })
    .catch(function (error) {

    });

    alert("Cadastro realizado com sucesso");
    limparFormulario();
}

function limparFormulario(){
    /*TODO: implementar*/
}

function buscarPessoa(){
    let id = document.getElementById("txtId").value;

}