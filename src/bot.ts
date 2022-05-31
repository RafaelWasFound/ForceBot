import 'dotenv/config';

import ForceClient from './structures/ForceClient';

new ForceClient({
  intents: 513,
  shards: 'auto',
}).run(process.env.TOKEN as string);
