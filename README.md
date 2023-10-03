# Arthive! Server

> Arthive! 서비스의 API Server 입니다.

## Project Info

* 이 프로젝트는 Node.JS 18.x 기반으로 작성되었습니다.
* 이 프로젝트는 NestJS를 사용합니다.
* 이 프로젝트는 AWS Lambda로 배포됩니다.

## Initialize

1. direnv를 설치해주세요.
2. 아래와 같이 `.envrc` 파일을 생성해주세요.
   ```shell
    export AWS_ACCESS_KEY_ID=#AWS Access Key
    export AWS_SECRET_ACCESS_KEY=#AWS Secret Key
    export DB_HOST=#Database Hostname (Without schema)
    export DB_PORT=#Database Port
    export DB_DATABASE=#Database Name
    export DB_USERNAME=#Database Username
    export DB_PASSWORD=#Database Password
   ```
3. 아래 명령어를 실행해주세요.
   ```shell
   make init
   ```

## Scripts

* Initialize project(Link dependencies)
   ```shell
   make init
   ```
* Build project
   ```shell
   make build
   ```
* Run on local(offline)
   ```shell
   make offline
   ```
* Deploy to AWS
   ```shell
   make deploy
   ```
* Create `openapi.json` file
   ```shell
   make swagger
   ```