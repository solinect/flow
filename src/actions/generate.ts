import { IOption } from "../Interface/Option";
import { exec as execCB } from "child_process";
import { appendFileSync, existsSync, readFileSync, writeFileSync } from "fs";
import { promisify } from "util";

export const generateCommand = (opts: Array<IOption>) => {
    // generate encryption keys
    const keysOpts = opts.find((o) => o.name === "keys" || o.name == "k");
    if (keysOpts) {
        generateKeys();
        return;
    }

    //generate .env file
    const envOpts = opts.find((o) => o.name === "env" || o.name === "e");
    if (envOpts) {
        generateEnv();
        return;
    }
};

const exec = promisify(execCB);
const generateKeys = async () => {
    console.log("Creating Private key...");
    await exec(`openssl genpkey -algorithm RSA -out private.key -pkeyopt rsa_keygen_bits:2048`);
    console.log("Creating Public Key...");
    await exec(`openssl rsa -pubout -in private.key -out public.pem`);
    console.log("Done.");
};

const generateEnv = () => {
    let content = readFileSync(`${__dirname}/../templates/dotenv.txt`, "utf8");
    writeFileSync(`./.env`, content);
    writeFileSync(`./.env.example`, content);

    // check if a .gitignore exists
    if (existsSync("./.gitignore")) {
        // if exists check if contains .env
        const gitigonre = readFileSync(".gitignore", "utf8");
        // if not append .env
        if (!/(^|\s)\.env(?=\s|$)/.test(gitigonre)) {
            appendFileSync(".gitignore", "\n.env");
            console.log(".env has been appended to .gitignore file");
        }
    }
    console.log("Environment files has been created");
};
