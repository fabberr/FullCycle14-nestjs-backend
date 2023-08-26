## FullCycle14-nestjs-backend
Aplicação back-end escrita para o evento [Imersão Full Stack && Full Cycle 14](https://archive.is/Xu6mh).

#### Tecnologias/Linguagens utilizadas:
- [Docker](https://www.docker.com)
- [TypeScript](https://www.typescriptlang.org)
- [Node.js](https://nodejs.org/en)
- [NestJS](https://nestjs.com)
- [Prisma](https://www.prisma.io)
- [MongoDB](https://www.mongodb.com)
- [Google Maps API](https://console.cloud.google.com)

## Instalação

```bash
# Criar o diretório
$ mkdir -p /repos/fullcycle-14
$ cd /repos/fullcycle-14

# Clonar o repositório para o diretório local
$ git clone https://github.com/fabberr/FullCycle14-nestjs-backend.git nestjs-app
$ cd nestjs-app

# Gerar o Container Docker da aplicação
$ docker compose build
```

Os seguintes comandos devem ser executados de dentro do container.
Caso ainda não estiver rodando, use o comando `docker-compose up` para subir o container.
```bash
# Entrar no diretório raiz da aplicação
$ cd /home/node/app

# Instalar as dependências do projeto
$ npm install

# Gerar o client do Prisma
$ npx prisma generate
```

### Google API Key
Esta aplicação faz integração com APIs do Google Maps, e portanto é necessário gerar uma Chave de API (gratuita) através do [Google Cloud console](https://console.cloud.google.com).
1. Entre com uma conta do Google
   - Obs.: Uma vez logado, você tem acesso ao trial por 90 dias. Você ***NÃO*** será faturado automaticamento ao final do trial.
3. Navegue até o menu `APIs & Services`
4. Clique em `+ ENABLE APIS AND SERVICES` no topo da página
5. Consulte e habilite as APIs:
   - `Places API`
   - `Directions API`
   - `Maps JavaScript API`
6. Ainda no Menu `APIs & Services`, navegue até o menu `Credentials`
7. Clique em `+ CREATE CREDENTIALS` no topo da página e selecione a opção `API Key`
8. Pronto, sua Chave de API foi criada
   - Obs.: É recomendado acessar/visualizar/copiar a chave somente através do próprio Google Cloud console (menu `APIs & Services > Credentials`). ***Não salve esta chave localmente na sua máquina ou em outros serviçõs de cloud.***

### Variáveis de Ambiente
Após criar sua chave de API do Google, crie um arquivo chamado `.env` na raiz do repositório (utilize o arquivo `.env.example` como base) e popule a variável de ambiente `GOOGLE_API_KEY` com a chave gerada.
Popule também a variável `DATABASE_URL` com a [string de conexão do MongoDB](https://www.mongodb.com/docs/manual/reference/connection-string/#standard-connection-string-format).

Este arquivo deve ser armazenado apenas localmente e não deve ser subido para repositórios remotos (não remover regra para arquivos de extensão`.env` do `.gitignore`) para evitar que a sua chave de API do Google seja exposta.

```bash
# Copiar o arquivo .env base
$ cp .env.example .env
```

## Rodando a Aplicação

```bash
# Desenvolvimento
$ npm run start

# Desenvolvimento (watch mode)
$ npm run start:dev

# Debug
$ npm run start:debug

# REPL
$ npm run repl

# Build
$ npm run build

# Produção
$ npm run start:prod
```

Para confirmar que a aplicação está rodando, faça uma requisição GET para `http://localhost:3000/`.
Uma coleção de requests pode ser importada para testes da API pelo [Insomnia](https://insomnia.rest) através do arquivo `Insomnia.json`, na raiz do repositório.
