import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { IOption } from "../Interface/Option";
import { parsePath, toPascalCase, toSqlTableName } from "../utils/format";

export const createModules = (opts: Array<IOption>) => {
    const methodsOpts = opts.find((o) => o.name === "--methods" || o.name === "-m");
    const methods = methodsOpts ? methodsOpts.value.split(",").map((m) => m.trim()) : ["list"];

    // router or controller
    const singleOpts = opts.find((o) => o.name === "router" || o.name === "r" || o.name === "controller" || o.name === "c");
    if (singleOpts) {
        if (singleOpts.value) {
            const { filename, dir } = parsePath(singleOpts.value.split("/"));
            if (singleOpts.name === "router" || singleOpts.name === "r") {
                createRouter(filename, dir);
                console.log(`Router ${filename} has been created!`);
            } else if (singleOpts.name === "controller" || singleOpts.name === "c") {
                createController(filename, dir, methods);
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
            const { filename, dir } = parsePath(moduleOpts.value.split("/"));
            console.log(`Creating module: ${filename}`);
            createRouter(filename, dir, true);
            createController(filename, dir, methods);
            console.log(`Module ${filename} has been created!`);
        } else {
            console.log("Module name must be provided!");
            return;
        }
    }

    //middleware
    const middlewareOpts = opts.find((o) => o.name === "midleware" || o.name === "mi");
    if (middlewareOpts) {
        if (middlewareOpts.value) {
            const multerOpts = opts.find((o) => o.name === "--multer");
            const { filename, dir } = parsePath(middlewareOpts.value.split("/"));
            createMiddleware(filename, dir, multerOpts ? "multer" : "empty");
            console.log(`Middleware ${multerOpts ? "multer upload" : filename} has been created!`);
        } else {
            console.log("Module name must be provided!");
            return;
        }
    }

    //entity
    const entityOpts = opts.find((o) => o.name === "entity" || o.name === "e");
    if (entityOpts) {
        if (entityOpts.value) {
            const { filename, dir } = parsePath(entityOpts.value.split("/"));
            createEntity(filename, dir);
            console.log(`Entity ${filename} has been created!`);
        } else {
            console.log("Entity name must be provided!");
            return;
        }
    }
};

const createController = (name: string, dir: string | undefined, methodNames: string[] = ["list"]) => {
    let content = readFileSync(`${__dirname}/../templates/controller.txt`, "utf8");
    let methodContent = readFileSync(`${__dirname}/../templates/method.txt`, "utf8");
    const nameReg = new RegExp("{{name}}", "g");
    const methodsReg = new RegExp("{{methods}}", "g");

    // create methods to include in the controller
    const methods = methodNames.map((m) => methodContent.replace(nameReg, m));
    methods.unshift("\t");
    content = content.replace(nameReg, toPascalCase(name));
    content = content.replace(methodsReg, methods.join("\n\t"));
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

const createMiddleware = (name: string, dir: string, type: "empty" | "multer" = "empty") => {
    let content = readFileSync(`${__dirname}/../templates/middleware/${type}.txt`, "utf8");
    content = content.replace(new RegExp("{{name}}", "g"), toPascalCase(name));
    if (dir) {
        if (!existsSync(dir)) {
            mkdirSync(dir, { recursive: true });
        }
    }
    writeFileSync(`${dir ?? "."}/${name}.middleware.ts`, content);
};

const createEntity = (name: string, dir: string) => {
    let content = readFileSync(`${__dirname}/../templates/entity.txt`, "utf8");
    content = content.replace(new RegExp("{{table_name}}", "g"), toSqlTableName(name).toLowerCase());
    content = content.replace(new RegExp("{{name}}", "g"), toPascalCase(name));
    if (dir) {
        if (!existsSync(dir)) {
            mkdirSync(dir, { recursive: true });
        }
    }
    writeFileSync(`${dir ?? "."}/${toPascalCase(name)}.ts`, content);
};
