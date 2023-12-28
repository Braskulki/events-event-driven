# events-event-driven

## About the project

- a simple MVP of an events application, where user can log into the application, search and create events, buy tickets for the events and set their preferences using tag's for filters

## Technologies

- Node with Typescript
- TypeORM
- Express
- PostgreSQL
- Kafka
- Docker
- Keycloak for authentication and session control

## Starting the project
- run docker compose without the project - only keycloak and postgres
    - docker compose up -d postgres keycloak
- configure keycloak as the following step
- update env's from project on file .env
- `npm run dev` for local running or `docker compose up -d` for docker run

## Keycloak configuration
- run script for initial user inside docker container
  - $HOME/keycloak/bin/add-user-keycloak.sh -u 'username' -p 'secpass' -r master
- configure new realm
  - clients -> service-backend
    - access type -> confidential
    - standard flow -> off
    - direct access and service account -> on
  - clients -> service-login
    - mappers
      - map properties that need to be on token
  - service account roles
    - realm-management
      - manage users

- add env variables to project


## TypeORM
- Create Migration
  - npx typeorm migration:create ./src/infra/database/migrations/AddPaymentStatus