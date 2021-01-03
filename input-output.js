/**
 * Input Output module.
 *
 * For all the files and input output operations.
 */
const fs = require("fs");
const util = require("util");
const readFile = fileName => util.promisify(fs.readFile)(fileName, "utf8");
const writeFile = (fileName, content) =>
  util.promisify(fs.writeFile)(fileName, content, "utf8");

/**
 * @description
 * Reads the `input.txt` file and returns the secret array.
 *
 * @returns {Array} The secret array
 */
const getSecretInputData = async () => {
  const inputFileContents = await readFile("input.txt");
  const inputArr = inputFileContents.split("\n");

  return inputArr.filter(
    inp => !(inp === "" || inp === null || inp === undefined)
  );
};

/**
 * @description
 * Reads the `input.txt` file and returns the shares array.
 *
 * @returns {Array} The shares array
 */
const getShareInputData = async () => {
  const inputFileContents = await readFile("input.txt");
  const inputArr = inputFileContents.split("\n\n");
  const shares = [];

  for (const shareContent of inputArr) {
    const shareLine = shareContent.split("\n");
    const currentShare = [];

    for (const line of shareLine) {
      if (line !== "" && line !== undefined && line !== null) {
        currentShare.push(line.split(","));
      }
    }

    if (currentShare.length > 0) shares.push(currentShare);
  }

  return shares;
};

/**
 * @description
 * Write the `out` array to the `shares.txt` file.
 *
 * @param {Array} out Shares array
 */
const writeShareOutput = async out => {
  let data = "";
  for (let i = 0; i < out.length; i++) {
    data += `Share ${i + 1}\n`;
    data += out[i].join("\n");
    data += "\n\n";
  }

  writeFile("shares.txt", data);
};

/**
 * @description
 * Write the `out` array to the `secret.txt` file.
 *
 * @param {Array} out Secret array
 */
const writeSecretOutput = async out => {
  const data = out.join("\n");

  writeFile("secret.txt", data);
};

module.exports = {
  getSecretInputData,
  getShareInputData,
  writeShareOutput,
  writeSecretOutput
};
