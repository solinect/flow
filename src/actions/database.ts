import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { IOption } from "../Interface/Option";
import { config } from "dotenv";
import { parsePath, toPascalCase } from "../utils/format";
import path from "path";
import { promisify } from "util";
import { exec as execCB } from "child_process";

export const dbCommand = (opts: Array<IOption>) => {
    // load .env files
    config();

    //seeding
    const seedOpts = opts.find((o) => o.name === "seed");
    if (seedOpts) {
        const createSeed = opts.find((o) => o.name === "--create");
        if (createSeed) {
            if (seedOpts.value) {
                const { filename, dir } = parsePath(seedOpts.value.split("/"));
                createSeeds(filename, dir);
                console.log("Seeder file has been created!");
                return;
            } else {
                console.log("Seed file name is required!");
                return;
            }
        } else {
            const { filename, dir } = parsePath(seedOpts.value?.split("/") ?? []);
            execSeed(filename ?? null, dir ?? null);
        }
    }
};

export const createSeeds = (name: string, dir: string) => {
    // create seeder class
    let seederContent = readFileSync(`${__dirname}/../templates/seeds/seeder.txt`, "utf8");
    if (dir) {
        if (!existsSync(dir)) {
            mkdirSync(dir, { recursive: true });
        }
    }
    writeFileSync(`${dir ?? "."}/Seeder.ts`, seederContent);

    // create seed
    let content = readFileSync(`${__dirname}/../templates/seeds/seed.txt`, "utf8");
    content = content.replace(new RegExp("{{name}}", "g"), toPascalCase(`${name}-seeder`));
    if (dir) {
        if (!existsSync(dir)) {
            mkdirSync(dir, { recursive: true });
        }
    }
    writeFileSync(`${dir ?? "."}/${name}.seed.ts`, content);
};

export const execSeed = async (name?: string, dir?: string) => {
    try {
        //
        const projectDir = process.cwd();
        const buildSeedDir = path.join(projectDir, dir ? dir : `build/seeds`);

        //
        const exec = promisify(execCB);
        await exec("npm run build");
        const fullPath = path.join(buildSeedDir, "Seeder.js");
        const SeederModule = await import(fullPath);
        const SeederClass = SeederModule.default;

        // call
        if (typeof SeederClass === "function") {
            if (name) await SeederClass.callOne(name);
            else await SeederClass.callAll();
        }
        console.log("Done.");
        return;
    } catch (error) {
        console.log(error);
        return;
    }
};
