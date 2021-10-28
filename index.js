const { readFileSync, writeFileSync, readdirSync, chmodSync } = require("fs");
const { resolve } = require("path");
const iconv = require("iconv-lite");
const isUtf8 = require("is-utf8");

const dirName = "./convert";
const fileNames = readdirSync(dirName);

const isBom = (file) => file[0] === 0xef && file[1] === 0xbb && file[2] === 0xbf;

fileNames.forEach((fileName) => {
  const path = resolve(dirName, fileName);
  if (!path.endsWith(".srt")) return;

  chmodSync(path, 0o666);
  const file = readFileSync(path);
  const isFileUtf8 = isUtf8(file);

  if (isFileUtf8 && isBom(file)) return;

  const str = iconv.decode(file, isFileUtf8 ? "utf8" : "win1250");
  const buf = iconv.encode(str, "utf8", { addBOM: true });
  writeFileSync(path, buf);
});
