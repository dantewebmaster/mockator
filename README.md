# Projeto Mockator
Projeto criado para servir como um gerador de chamadas à APIs à partir de arquivos JSON.

## Rodando o projeto
Use **Yarn** ou **Npm** para rodar os seguintes scripts.

`yarn/npm install`  

`yarn/npm start`

O endereço da API será http://localhost:9999/

## Como usar
Depois de colocar o projeto para rodar. Podemos começar a criar as nossas chamadas *mockadas*.

Exemplos:   
Criando um endpoint /clientes
1. Entre na pasta **/data** e crie um arquivo com o nome clientes.json
2. Adicione a estrutura de retorno da chamada, ex:
```json
[
  {
    "id": "123456789",
    "nome": "João Carlos",
    "age": "22"
  }
]
```
É só isso, agora já podemos fazer requisições GET e POST no na url http://localhost:9999/clientes

## Changelog
v1.0.0 - Creating GET and POST endpoints.
