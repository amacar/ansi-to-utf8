const { readFileSync, writeFileSync, readdirSync } = require("fs");
const { resolve } = require("path");
const iconv = require("iconv-lite");

const dirName = "./convert";
const fileNames = readdirSync(dirName);

fileNames.forEach((fileName) => {
  const path = resolve(dirName, fileName);
  const file = readFileSync(path);
  const str = iconv.decode(file, "win1250");
  const buf = iconv.encode(str, "utf8");
  writeFileSync(path, buf);
});
