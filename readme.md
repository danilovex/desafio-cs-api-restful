
#Aplicação de API Usuário com NodeJS

A aplicação foi desenvolvida para um desafio técnico.

Os principais requisitos que a aplicação atendeu foram:

*	Persitência de dados
*	Sistema de build com gestão de dependências via gerenciador de pacotes NPM
* Utilização do task runner do Gulp para realização de build
*	Padronização de estilo de código em tempo de build jsHint
*	APIs com módulo Express
*	JWT como token
*	Testes unitários
*	Criptogafia na senha


##Run

Para iniciar a aplicação rode o comando abaixo:

 `gulp run`

##Tests

Para verificar a condição dos testes, rode o comando abaixo:

`mocha`

##Requisição de Cadastro

Type: POST

http://localhost:3000/rest/usuario/signup

```javascript
{
  nome: 'Danilo',
  email: 'danilo@gmail.com',
  senha: '123456',
  telefones: [
    {
      ddd:11,
      numero: 12341234
    }
  ]}
```

##Requisição de Login

Type: POST

http://localhost:3000/rest/usuario/signin

```javascript
{
  email: 'danilo@gmail.com',
  senha: '123456'
}
```

##Requisição de Buscar Usuário

Type: GET

HEADER:  `{bearer: $token} `

$token > token recebido na requisição de cadastro ou de login

http://localhost:3000/rest/usuario/$id_usuario

$id_usuario > id do usuário recebido na requisição de cadastro ou de login
