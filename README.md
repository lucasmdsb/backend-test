# Trakto Image API

API para upload e otimização de imagens, com processamento assíncrono via fila RabbitMQ, persistência em MongoDB e suporte a formatos de saída como JPEG e WebP.

---

## Tecnologias utilizadas

- **Node.js** + **NestJS**
- **RabbitMQ** para processamento assíncrono
- **MongoDB** para persistência das tasks
- **Multer** para upload de arquivos
- **Sharp** para processamento de imagem
- **Docker** + **Docker Compose**
- **Swagger** para documentação da API
- **Jest** + **Supertest** para testes de integração

---

## Funcionalidades

- Upload de imagens via `POST /upload`
- Processamento em background via worker
- Otimização e conversão para `.jpg` e `.webp`
- Consulta de status via `GET /status/:taskId`
- Retry automático em falhas temporárias
- Logging estruturado para processamento
- Documentação Swagger em `/api`

---

## Como executar localmente

### 1. Clone o projeto:
```bash
git clone <repo>
cd backend-test
```

### 2. Suba os containers
```bash
docker-compose up --build
```

### 3. Acesse a API
- Upload: `POST /upload` (form-data com chave `file`)
- Status: `GET /status/:taskId`

---

## Como testar

### Upload de imagem via `curl`
```bash
curl -F 'file=@/caminho/para/uma/imagem.jpg' http://localhost:3000/upload
```

### Consulta de status de uma task
```bash
curl http://localhost:3000/status/<task_id>
```

Substitua `<task_id>` pelo ID retornado no upload.

---

## Execução de testes

```bash
npm install
npm run test:e2e
```

> Teste principal: upload de imagem com validação de retorno `taskId`

---

## Estrutura do projeto

- `app/`
  - `modules/upload/` - Controller e Service de upload
  - `modules/task/` - Lógica de persistência das tasks
- `worker/` - Processamento da fila com Sharp + Mongo
- `docker-compose.yml` - API, Mongo, RabbitMQ, Worker
- `test/` - Testes e2e com `supertest`

---

## Pontos Bônus implementados

- [x] API de consulta de status
- [x] Suporte a JPEG e WebP
- [x] Retry em falhas temporárias no worker
- [x] Logging estruturado por task
- [x] Teste e2e com Jest + Supertest

