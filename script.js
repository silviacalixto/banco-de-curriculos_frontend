'use strict';

const form = document.getElementById('submit');

form.addEventListener('submit', (event) => {
    nome: form.elements['nome'];
    cargo: form.elements['cargo'];
    dataNascimento: form.elements['dataNascimento'];
    estadoCivil: form.elements['estadoCivil'];
    sexo: form.elements['sexo'];
    cep: form.elements['cep'];
    endereco: form.elements['endereco'];
    numero: form.elements['numero'];
    bairro: form.elements['bairro'];
    cidade: form.elements['cidade'];
    estado: form.elements['estado'];
    celular: form.elements['celular'];
    telefoneFixo: form.elements['telefoneFixo'];
    email: form.elements['email'];
    identidade: form.elements['identidade'];
    cpf: form.elements['cpf'];
    possuiVeiculo: form.elements['possuiVeiculo'];
    habilitacao: form.elements['habilitacao'];
});

try {
    const usuario = fetch('http://localhost:5000/register', {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(form)
    });
    if(usuario.status === 200) {
        console.log(form);
        alert('Deu certo!')
    }
}
    catch (error) {
        alert('Deu errado!');
        console.log(form);
    }

// axios.post('http://localhost:5000/register');

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