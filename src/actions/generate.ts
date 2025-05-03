import { IOption } from "../Interface/Option";
import { exec as execCB } from "child_process";
import { promisify } from "util";

export const generateCommand = (opts: Array<IOption>) => {
    // generate encryption keys
    const keysOpts = opts.find((o) => o.name === "keys" || o.name == "k");
    if (keysOpts) {
        generateKeys();
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
