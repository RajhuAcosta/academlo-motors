import app from './app.js';
import { auth, sync } from './config/database/database.js';
import { envs } from './config/environments/environments.js';

async function main() {
  try {
    await auth();
    await sync();
  } catch (error) {
    console.log(error);
  }
}

main();

app.listen(envs.PORT, () => {
  console.log(`Server running on PORT #${envs.PORT}`);
});
