import fs from "fs";
import path from "path";

const inputfilepath = path.join(import.meta.dirname, "input.txt");
const outputfilepath = path.join(import.meta.dirname, "output.txt");

const readablestream = fs.createReadStream(inputfilepath, {
  encoding: "utf-8",
  highWaterMark: 16,
});


const writablestream = fs.createWriteStream(outputfilepath)

readablestream.pipe(writablestream)