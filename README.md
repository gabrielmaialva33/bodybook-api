<h1 align="center">
  <br>
  <img src="https://raw.githubusercontent.com/gabrielmaialva33/bodybook-api/master/.github/assets/atlas.png" alt="BookBook" width="200">
  <br>
  BodyBook is a training book for fitness enthusiasts 🏋️‍♂️ powered by <a href="https://deno.com/">Deno</a> 🦕
  <br>
</h1>

<p align="center">
<img src="https://wakatime.com/badge/user/e61842d0-c588-4586-96a3-f0448a434be4/project/cbf8f909-625a-4433-b475-03b72f60f9a6.svg" alt="wakatime">
  <img src="https://img.shields.io/github/languages/top/gabrielmaialva33/bodybook-api?style=flat&logo=appveyor" alt="GitHub top language" >
  <img src="https://img.shields.io/github/languages/count/gabrielmaialva33/bodybook-api?style=flat&logo=appveyor" alt="GitHub language count" >
  <img src="https://img.shields.io/github/repo-size/gabrielmaialva33/bodybook-api?style=flat&logo=appveyor" alt="Repository size" >
  <img src="https://img.shields.io/github/license/gabrielmaialva33/bodybook-api?color=00b8d3?style=flat&logo=appveyor" alt="License" /> 
  <a href="https://github.com/gabrielmaialva33/bodybook-api/commits/master">
    <img src="https://img.shields.io/github/last-commit/gabrielmaialva33/bodybook-api?style=flat&logo=appveyor" alt="GitHub last commit" >
    <img src="https://img.shields.io/badge/made%20by-Maia-15c3d6?style=flat&logo=appveyor" alt="Maia" >  
  </a>
</p>

<p align="center">
  <a href="#bookmark-about">About</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#computer-technologies">Technologies</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#package-installation">Installation</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#wrench-configuration">Configuration</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#memo-documentation">Documentation</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#memo-license">License</a>
</p>

<br>

## :bookmark: About

**BodyBook API** is a REST API for the [BodyBook](bodybook.app) application, which is a social network for
fitness enthusiasts, where you can create events, share your workouts, follow other users and much more.

<br>

## :computer: Technologies

- **[Deno](https://deno.land/)**
- **[Hono](https://hono.dev/)**
- **[Kysely](https://kysely.dev/)**
- **[PostgreSQL](https://www.postgresql.org/)**

## :package: Installation

```bash
# clone the repository
git clone https://github.com/gabrielmaialva33/bodybook-api.git
# enter the directory
cd bodybook-api
# install the dependencies
deno cache
# run the application
deno run --allow-net --allow-read --allow-write --allow-env --unstable src/server.ts
```

### :wrench: **Configuration**

copy the `.env.example` file and rename it to `.env`

```bash
# application
APP_NAME=BodyBook
APP_HOST=localhost
APP_PORT=3333
# database
PG_URL=postgres://postgres:postgres@localhost:5432/bodybook
PG_POOL_SIZE=20
PG_LAZY_POOL=true
# jwt
JWT_SECRET=secret
JWT_EXPIRES_IN=1d
```

### :memo: **Documentation**

```md
# Use insomnia or postman to test the routes

file `bodybook-api.yaml` in root directory
```

### :writing_hand: **Author**

| [![Maia](https://avatars.githubusercontent.com/u/26732067?size=100)](https://github.com/gabrielmaialva33) |
|-----------------------------------------------------------------------------------------------------------|
| [Maia](https://github.com/gabrielmaialva33)                                                               |

## License

[MIT License](./LICENSE)
