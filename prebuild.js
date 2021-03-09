/**
Alican KUKLACI
*/

const fs = require("fs");

async function ControllerOP() {
  const p1 = "./repositories/controller/";
  const r1 = [];
  const indexPath = `${p1}index.ts`;
  // fs.unlinkSync(indexPath);
  fs.readdir(p1, (err, files) => {
    files.forEach((file) => {
      if (file !== "index.ts")
        r1.push(`export * from './${file.substr(0, file.length - 3)}'`);
    });
    let write = "";
    r1.forEach((element) => {
      write += element + "\n";
    });
    fs.writeFileSync(indexPath, write);
  });
}

ControllerOP();

//   import './foo.controller';
