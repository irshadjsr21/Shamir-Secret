const io = require("./input-output");
const { createShares, getSecret } = require("./shamir-secret");

const run = async () => {
  const args = process.argv;
  let arg;
  if (args && args.length > 2) {
    arg = args[2].toLowerCase();
  }

  let inputs;
  let data;

  switch (arg) {
    case "generate":
      inputs = await io.getSecretInputData();
      data = createShares(inputs);
      io.writeShareOutput(data);
      break;
    case "combine":
      inputs = await io.getShareInputData();
      data = getSecret(inputs);
      io.writeSecretOutput(data);
      break;
    case "help":
    default:
      console.log(
        "Argument is required.\n\t`generate`: To create shares from secret.\n\t`combine`: To combine shares and get the secret."
      );
  }
};

run();
