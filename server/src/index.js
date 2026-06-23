import { createApp } from "./app.js";
import { config } from "./config/index.js";

const app = createApp();

app.listen(config.port, config.host, () => {
  console.log(`API server running at ${config.publicUrl}`);
  console.log(`  Catalog:  ${config.publicUrl}${config.apiPrefix}/catalog`);
  console.log(`  Health:   ${config.publicUrl}${config.apiPrefix}/health`);
});
