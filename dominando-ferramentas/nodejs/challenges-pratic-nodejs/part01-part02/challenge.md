

# desafios-praticos-scholarship-openfinance

## 🚀 Atividade Prática - Criando uma API com o Módulo HTTP no Node.js

### 📌 Descrição  
Neste desafio, você deve **criar uma API simples usando apenas o módulo `http`** do Node.js, sem utilizar frameworks como Express.  

A API deve conter **três endpoints**:  

1. `GET /health-check`  
2. `GET /is-prime-number`  
3. `POST /count`
   
📌 **Para facilitar a implementação, consulte o arquivo [`server.js`](./server.js)**, que contém uma **estrutura básica de API**, incluindo exemplos de:  
✔ Como extrair informações dos **queryParams**  
✔ Como fazer o **parse do body** de uma requisição `POST`  
✔ Como retornar respostas no formato **JSON** corretamente  

📌 **Além disso, veja o arquivo [`API-Usage.md`](./API-Usage.md)**, que explica:  
✔ Como **subir a API**  
✔ Exemplos de chamadas usando **cURL** 

---

## 🔧 **Requisitos da API**  

### **1️⃣ Endpoint: `GET /health-check`**  
✔ Retorna um **status code `200`** e um JSON no formato:  
```json
{
  "success": true,
  "timestamp": "2025-03-13T10:00:00.000Z"
}
```

📌 Observações:
 - O campo timestamp deve conter a data atual no formato ISO string (new Date().toISOString()).

### **2️⃣ Endpoint: GET /is-prime-number/:number**
✔ Recebe um número na URL e verifica se ele é primo.


📌 **Observação:**  
- O ideal seria utilizar **path parameters** (`GET /is-prime-number/42`), mas, para facilitar a implementação, estamos utilizando **query parameters** (`GET /is-prime-number?number=42`).  
- Quem quiser se desafiar, pode modificar a implementação para usar **path parameters** e tratar ambos os formatos! 🚀  

📌 Regras:

* Se o input for inválido (não numérico ou menor que 1), retorna status 400 com { error: "Invalid input" }.
* Se o número for primo, retorna:
```json
{
  "isPrime": true
}
```
* Se o número não for primo, retorna:

```json
{
  "isPrime": false
}
```

📌 Exemplos de chamadas e respostas:

* Requisição: GET /is-prime-number?number=7
  *  Resposta: { "isPrime": true } (status 200)
* Requisição: GET /is-prime-number?number=42
  * Resposta: { "isPrime": false } (status 200)
* Requisição: GET /is-prime-number?number=abc
  * Resposta: { "error": "Invalid input" } (status 400)
* Requisição: GET /is-prime-number
  * Resposta: { "error": "Invalid input" } (status 400)

### **3️⃣ Endpoint: POST /count**
✔ Mantém um contador no servidor e permite incrementá-lo via requisições.

📌 Regras:

* O cliente deve enviar um JSON no corpo da requisição com o seguinte formato:
```json
{ "incrementBy": 3 }
```
* Se o incrementBy for válido (número inteiro positivo), o contador deve ser incrementado e a API retorna:
```json
{ "counter": 3 }
```
* Se o input for inválido, retorna status 400 com { "error": "Invalid input" }.
📌 Exemplos de chamadas e respostas:

* Requisição:
```http
POST /count
Content-Type: application/json

{ "incrementBy": 5 }
```
  * Resposta: { "counter": 5 }

* Requisição com input inválido:

```http
POST /count
Content-Type: application/json

{ "incrementBy": "abc" }
```
  * Resposta: { "error": "Invalid input" } (status 400)

💡 Se precisar de ajuda, revise a documentação oficial: Node.js HTTP Module.
Boa programação! 🚀😃

------

## 🚀 Atividade Prática - Utilizando o Módulo Fetch no Node.js

💡 **Objetivo:**  
Expandir a API criada anteriormente adicionando um novo endpoint que consulta a API do CoinGecko e fornece uma **sugestão de compra de Bitcoin** com base no preço atual.

⚠ **OBS:** Deve ser utilizado **Node.js 18 ou superior** para utilizar o módulo `fetch` nativo.
---

## **📌 Novo Endpoint: `GET /stock-insight`**  

O endpoint deve:  
1. **Fazer uma requisição HTTP** à API pública do CoinGecko para buscar o preço do **Bitcoin (BTC)** em **BRL** e **USD**.  
2. **Receber opcionalmente o parâmetro de query `currency=usd` ou `currency=brl`** (padrão é `usd`).  
3. **Comparar o preço somente com a moeda fornecida**, conforme a lógica de sugestão de compra.  
4. **Retornar um JSON** contendo o preço (na moeda especificada) e uma **sugestão de compra**.  

---

## **🔧 Lógica de Sugestão de Compra**

Se o usuário escolher **`currency=brl`**:  
- **< R$300.000**: `Bom momento para compra!`  
- **Entre R$450.000 e R$300.000**: `Preço razoável. Avalie antes de comprar.`  
- **> R$450.000**: `Bitcoin está caro. Pode ser melhor esperar.`  

Se o usuário escolher **`currency=usd`** (padrão):  
- **< $60.000**: `Bom momento para compra!`  
- **Entre $60.000 e $80.000**: `Preço razoável. Avalie antes de comprar.`  
- **> $80.000**: `Bitcoin está caro. Pode ser melhor esperar.`  

💡 **Exemplo de Retorno Esperado (para currency=usd):**  
```json
{
  "btc_price": 39500.75,
  "currency": "usd",
  "suggestion": "Bom momento para compra!"
}
```

### 🚀 Instruções para Implementação
1. Criar um novo arquivo server.js (ou atualizar o existente).
2. Adicionar um novo endpoint GET /stock-insight que faz uma requisição HTTP para CoinGecko.
3. Utilizar o fetch (nativo no Node.js 18+) para obter os preços do Bitcoin.
4. Implementar a lógica de sugestão de compra com base nos preços retornados.
5. Tratar erros adequadamente, caso a API do CoinGecko esteja indisponível.

###  🌐 Documentação CoinGecko
* Documentação da API:
[CoinGecko Simple Price - v3.0.1](https://docs.coingecko.com/v3.0.1/reference/simple-price)

* Exemplo de endpoint CoinGecko (BTC vs USD):

```bash
curl --request GET \
     --url 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd' \
     --header 'accept: application/json'
```

* Exemplo de endpoint CoinGecko (BTC vs BRL):

```bash
curl --request GET \
     --url 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=brl' \
     --header 'accept: application/json'
```

* Exemplo de endpoint CoinGecko (BTC vs USD + BRL):

```bash
curl --request GET \
     --url 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=brl%2Cusd' \
     --header 'accept: application/json'
```
