# Sprint III - Curso de Pós-graduação em Engenharia de Software - MVP

## Cenário

O projeto é uma solução inicial que demonstra a possiblidade de uso da API de Dados Abertos do Senado
para o trabalho de assessores legislativos da Presidência da República. O componente A é um SPA que realiza
autenticação de usuário jnto ao componente C e a partir daí se conecta ao Componente B, a API pública do Senado.

## Descrição

Este é o componente A do MVP, um frontend responsável por manipular as rotas do componente C e também manipular
as rotas do componente B (a API pública do Senado).

## Stack

A SPA foi feita em Vue.js 3.0, utilizando Vue Router 4.0 e Axios. Controles de estado foram feitos manualmente.

## Técnicas utilizadas

### SPA

Foram utilizadas trechos de código com objetivo de demonstrar conhecimentos em HTML, CSS e JavaScript. Não foram
utilizados frameworks de estilo.

### Dados

Foi utilizado um sistema de login para que futuramente algumas anotações e valores sejam persistidos no sistema.

## Docker

Para essa solução não utilizamos o docker-compose para demonstrar o conhecimento de Docker puro

## Como instalar

Na pasta do projeto, digite:

`$ docker build -t senado-consulta-app .`
`$ docker run -it -p 5327:5327 --rm --name senado-consulta-app senado-consulta-app`

## Rodando o frontend

A página pode ser acessada em 127.0.0.1:5327

## Considerações Finais

Há algumas limitações na aplicação, que tinha por objetivo demonstrar a funcionalidade.
Só há a possibilidade de acessar dados do dia 10 de julho, proxima sprint coloca a escolha
por data ou o resumo dos cinco últimos dias.
