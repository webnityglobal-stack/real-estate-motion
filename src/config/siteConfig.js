import { activeClient } from './activeClient';

import estateLuxe from './clients/estateluxe';
import clientTwo from './clients/client-two';

const clients = {
  estateluxe: estateLuxe,
  'client-two': clientTwo,
};

const siteConfig = clients[activeClient] ?? estateLuxe;

export default siteConfig;
