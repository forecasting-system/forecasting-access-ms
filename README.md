<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

 
## Description

Provides access to forecast. Listens to forecast generated events and stores them in database.

## Project setup

```bash
$ npm install
```

- NATS server must be up and running. 
- Create .env based on .env.template

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

### DB for development purposes

```bash
docker compose up --build
```