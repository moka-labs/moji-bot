import { app } from './app';

app().then(client => {
  process.on('SIGINT', function() {
    client.disconnect({});
    process.exit(0);
  });
});
