const { envs } = require("./config/environments/environments");
const { auth, sync } = require("./config/database/database");
const app = require("./app");

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