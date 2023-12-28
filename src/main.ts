import './shared/module-alias';

import { Server } from '@src/infra/REST/express-adapter';
import { DatabaseProvider } from './infra/database/typeorm-adapter';
import { injectContainers } from './shared/dependencies-injection-register';
import KeycloakClient from './infra/authentication/keycloak/keycloak';

(async () => {
  await DatabaseProvider.initialize();

  injectContainers();

  await KeycloakClient.start();

  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { consumerTicketPayment } = require('./infra/messaging/consumers/ticket-payment');
  await consumerTicketPayment();

  new Server();
  // eslint-disable-next-line no-console
})().catch((err) => console.error(err));
