const limparFormulario = (endereco) => {
    document.getElementById('endereco').value = '';
    document.getElementById('bairro').value = '';
    document.getElementById('cidade').value = '';
    document.getElementById('estado').value = '';
}

const preencherFormulario = (endereco) => {
    document.getElementById('endereco').value = endereco.logradouro;
    document.getElementById('bairro').value = endereco.bairro;
    document.getElementById('cidade').value = endereco.localidade;
    document.getElementById('estado').value = endereco.uf;
}

const eNumero = (numero) => /^[0-9]+$/.test(numero);

const cepValido = (cep) => cep.length == 8 && eNumero(cep);

const pesquisarCep = async() => {
    
    limparFormulario();
    const cep = document.getElementById('cep').value;
    const url = `http://viacep.com.br/ws/${cep}/json/`;

    if(cepValido(cep)){
        const dados = await fetch(url);
        const endereco = await dados.json();

        if(endereco.hasOwnProperty('erro')){
            document.getElementById('endereco').value = 'Cep não encontrado!';
        }
        else {
            preencherFormulario(endereco);
        }
    }
    else {
        document.getElementById('endereco').value = 'Cep inválido!';
    }
    
}

document.getElementById('cep').addEventListener('focusout', pesquisarCep);

const Formulario = () => {
    let form = {
        nome: document.getElementById('nome').value,
        cargo: document.getElementById('cargo').value,
        dataNascimento: document.getElementById('dataNascimento').value,
        estadoCivil: document.getElementById('estadoCivil').value,
        sexo: document.getElementById('sexo').value,
        cep: document.getElementById('cep').value,
        endereco: document.getElementById('endereco').value,
        numero: document.getElementById('numero').value,
        bairro: document.getElementById('bairro').value,
        cidade: document.getElementById('cidade').value,
        estado: document.getElementById('estado').value,
        celular: document.getElementById('celular').value,
        telefoneFixo: document.getElementById('telefoneFixo').value,
        email: document.getElementById('email').value,
        identidade: document.getElementById('identidade').value,
        cpf: document.getElementById('cpf').value,
        possuiVeiculo: document.getElementById('possuiVeiculo').value,
        habilitacao: document.getElementById('habilitacao').value,
    };
    console.log(form);
    return form;
}

const criarCandidato = async(candidato) => {
        const requisicao = await fetch('https://bancodecurriculos-backend.herokuapp.com/register', {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(Formulario())
        });

        if(requisicao.status === 200) {
            alert('Cadastro efetuado com sucesso!');
        }
        else if (requisicao.status === 500){
            alert('Já temos essas informações em nosso banco.');
        }
        else {
             alert('Seu cadastro não pôde ser realizado');
         }
         location.reload();
}





