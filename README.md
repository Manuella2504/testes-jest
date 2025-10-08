# 🛒 Sistema de Carrinho de Compras - Testes Unitários

Atividade prática de testes unitários utilizando Jest em um sistema de carrinho de compras.

## 📝 Descrição

Sistema simples de carrinho de compras desenvolvido para aplicação de testes unitários com Jest. O sistema permite adicionar produtos, remover produtos, calcular totais e aplicar cupons de desconto.

## 🚀 Tecnologias Utilizadas

- Node.js
- Jest (Framework de Testes)

## 📦 Estrutura do Projeto

```
projeto/
├── cart.js
├── utils.js
├── cart.test.js
├── utils.test.js
└── package.json
```

## 🔧 Instalação e Configuração

### 1. Inicializar o projeto

```bash
npm init -y
```

### 2. Instalar o Jest

```bash
npm install --save-dev jest
```

### 3. Adicionar o arquivo cart.js com exports

Certifique-se de que o arquivo `cart.js` possui o seguinte export no final:

```javascript
module.exports = {
  adicionarProduto,
  removerProduto,
  calcularTotal,
  aplicarCupom,
  limparCarrinho,
};
```

## ▶️ Como Executar os Testes

### Executar todos os testes

```bash
npm test
```

### Executar testes em modo watch (observação)

```bash
npm run test:watch
```

## 📄 Licença

Este projeto foi desenvolvido para fins educacionais.
