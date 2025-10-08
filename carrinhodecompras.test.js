// cart.test.js
const { calcularDesconto, buscarPrecoProduto } = require("./utils");
const {
  adicionarProduto,
  removerProduto,
  calcularTotal,
  aplicarCupom,
  limparCarrinho,
} = require("./cart");

// Mock das funções do utils
jest.mock("./utils");

describe("Testes do Carrinho de Compras", () => {
  
  // Limpa os mocks antes de cada teste
  beforeEach(() => {
    jest.clearAllMocks();
    limparCarrinho();
  });

  describe("adicionarProduto()", () => {
    test("deve adicionar um produto ao carrinho", () => {
      buscarPrecoProduto.mockReturnValue(10.0);

      const item = adicionarProduto(1, 2);

      expect(item).toEqual({
        produtoId: 1,
        quantidade: 2,
        precoUnitario: 10.0,
        subtotal: 20.0,
      });
      expect(buscarPrecoProduto).toHaveBeenCalledWith(1);
    });

    test("deve adicionar múltiplos produtos ao carrinho", () => {
      buscarPrecoProduto.mockReturnValue(10.0);
      adicionarProduto(1, 2);
      
      buscarPrecoProduto.mockReturnValue(20.0);
      adicionarProduto(2, 1);

      const total = calcularTotal();
      expect(total).toBe(40.0);
    });
  });

  describe("removerProduto()", () => {
    test("deve remover um produto do carrinho", () => {
      buscarPrecoProduto.mockReturnValue(10.0);
      adicionarProduto(1, 2);
      
      buscarPrecoProduto.mockReturnValue(20.0);
      adicionarProduto(2, 1);

      const carrinhoAtualizado = removerProduto(1);

      expect(carrinhoAtualizado.length).toBe(1);
      expect(carrinhoAtualizado[0].produtoId).toBe(2);
    });

    test("não deve dar erro ao remover produto que não existe", () => {
      buscarPrecoProduto.mockReturnValue(10.0);
      adicionarProduto(1, 2);

      const carrinhoAtualizado = removerProduto(999);

      expect(carrinhoAtualizado.length).toBe(1);
    });
  });

  describe("calcularTotal()", () => {
    test("deve calcular o total do carrinho vazio", () => {
      const total = calcularTotal();
      expect(total).toBe(0);
    });

    test("deve calcular o total do carrinho com um produto", () => {
      buscarPrecoProduto.mockReturnValue(10.0);
      adicionarProduto(1, 3);

      const total = calcularTotal();
      expect(total).toBe(30.0);
    });

    test("deve calcular o total do carrinho com múltiplos produtos", () => {
      buscarPrecoProduto.mockReturnValue(10.0);
      adicionarProduto(1, 2);
      
      buscarPrecoProduto.mockReturnValue(20.0);
      adicionarProduto(2, 3);

      const total = calcularTotal();
      expect(total).toBe(80.0);
    });
  });

  describe("aplicarCupom()", () => {
    test("deve aplicar desconto de 10% no carrinho", () => {
      buscarPrecoProduto.mockReturnValue(100.0);
      adicionarProduto(1, 1);

      calcularDesconto.mockReturnValue(90.0);

      const totalComDesconto = aplicarCupom(10);

      expect(calcularDesconto).toHaveBeenCalledWith(100.0, 10);
      expect(totalComDesconto).toBe(90.0);
    });

    test("deve aplicar desconto de 50% no carrinho", () => {
      buscarPrecoProduto.mockReturnValue(200.0);
      adicionarProduto(1, 2);

      calcularDesconto.mockReturnValue(200.0);

      const totalComDesconto = aplicarCupom(50);

      expect(calcularDesconto).toHaveBeenCalledWith(400.0, 50);
      expect(totalComDesconto).toBe(200.0);
    });
  });

  describe("limparCarrinho()", () => {
    test("deve limpar todos os produtos do carrinho", () => {
      buscarPrecoProduto.mockReturnValue(10.0);
      adicionarProduto(1, 2);
      adicionarProduto(2, 3);

      const carrinhoLimpo = limparCarrinho();

      expect(carrinhoLimpo).toEqual([]);
      expect(calcularTotal()).toBe(0);
    });
  });
});
