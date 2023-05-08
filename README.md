<p align="center">
  <img src="./app/frontend/src/images/negative_logo.png" alt="soccer club logo" width="150" align="center"/>
</p>
<hr />
<p align="center">
  Projeto desenvolvido durante o módulo de back-end no curso da trybe
</p>
<br>

## 📋 Sobre
O projeto consiste em desenvolver uma REST API utilizando a arquitetura MSC(Model-Service-Controller) e com testes unitários, para o gerenciamento de partidas e times de futebol.

<img src="./app/frontend/src/images/main_screen.png" alt="main screen screenshot" width="800"/>

## ✨ Funcionalidades
- Logar com email e senha
- Visualizar as partidas 
- Aplicar filtros nas partidas
- Visualizar o leaderboard com estatísticas dos times
- Aplicar filtros ao leaderboard
- Ao logar como administrador, você pode realizar o CRUD de times e partidas

## 💻 Tecnologias
![NodeJS](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![ExpressJS](https://img.shields.io/badge/Express.js-black?style=for-the-badge&logo=express)
![Sequelize](https://img.shields.io/badge/Sequelize-0C3E6F?style=for-the-badge&logo=sequelize)
![JWT](https://img.shields.io/badge/JWT-fb015b?style=for-the-badge&logo=JSONWebTokens)
![MySQL](https://img.shields.io/badge/MySQL-1C1C1C?style=for-the-badge&logo=mysql)
![Docker](https://img.shields.io/badge/docker%20-%230db7ed.svg?&style=for-the-badge&logo=docker&logoColor=white)

## 🧠 Aprendizados
- Utilizar Typescript juntamente com NodeJs e Express
- Utilizar o padrão POO para o desenvolvimento de uma API

## 📦 Rodando o projeto

**_Você precisará do docker-compose instalado_**

Instale as dependências
```bash
npm run install:apps
```
Rode os containers
```bash
npm run compose:up:dev
```
