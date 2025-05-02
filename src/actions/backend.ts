import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { IOption } from "../Interface/Option";
import { toPascalCase } from "../utils/formmat";

export const createModules = (opts: Array<IOption>) => {
    // router or controller
    const singleOpts = opts.find((o) => o.name === "router" || o.name === "r" || o.name === "controller" || o.name === "c");
    if (singleOpts) {
        if (singleOpts.value) {
            const path = singleOpts.value.split("/");
            const filename = path[path.length - 1];
            const dir = path.slice(0, path.length - 1).join("/");
            if (singleOpts.name === "router" || singleOpts.name === "r") {
                createRouter(filename, dir);
                console.log(`Router ${filename} has been created!`);
            } else if (singleOpts.name === "controller" || singleOpts.name === "c") {
                createController(filename, dir);
                console.log(`Controller ${filename} has been created!`);
            }
        } else {
            console.log("File name must be provided!");
            return;
        }
    }

    // module
    const moduleOpts = opts.find((o) => o.name === "module" || o.name === "m");
    if (moduleOpts) {
        if (moduleOpts.value) {
            const path = moduleOpts.value.split("/");
            const filename = path[path.length - 1];
            const dir = path.slice(0, path.length - 1).join("/");
            console.log(`Creating module: ${filename}`);
            createRouter(filename, dir);
            createController(filename, dir);
            console.log(`Module ${filename} has been created!`);
        } else {
            console.log("Module name must be provided!");
            return;
        }
    }
};

const createController = (name: string, dir: string | undefined) => {
    let content = readFileSync(`${__dirname}/../templates/controller.txt`, "utf8");
    content = content.replace(new RegExp("{{name}}", "g"), toPascalCase(name));
    if (dir) {
        if (!existsSync(dir)) {
            mkdirSync(dir, { recursive: true });
        }
    }
    writeFileSync(`${dir ?? "."}/${name}.controller.ts`, content);
};

const createRouter = (name: string, dir: string | undefined, controller: boolean = false) => {
    let content = readFileSync(`${__dirname}/../templates/router.txt`, "utf8");
    content = content.replace(new RegExp("{{name}}", "g"), toPascalCase(name));
    content = content.replace(new RegExp("{{controller}}", "g"), controller ? `import ${toPascalCase(name)}Controller from "./${name}.controller";` : "");
    if (dir) {
        if (!existsSync(dir)) {
            mkdirSync(dir, { recursive: true });
        }
    }
    writeFileSync(`${dir ?? "."}/${name}.router.ts`, content);
};
