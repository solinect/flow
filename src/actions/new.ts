import { IOption } from "../Interface/Option";
import { parsePath } from "../utils/format";
import { promisify } from "util";
import { exec as execCB } from "child_process";
import path from "path";

export const newCommand = (opts: Array<IOption>) => {
    // server opts
    const serverOpts = opts.find((o) => o.name === "server" || o.name === "s");
    if (serverOpts) {
        if (serverOpts.value) {
            const { filename, dir } = parsePath(serverOpts.value.split("/"));
            createServer(filename, dir);
        } else {
            console.log("Project name is required!");
            return;
        }
    }
};

const createServer = async (name?: string, dir?: string) => {
    try {
        const exec = promisify(execCB);
        // create project
        const workingDir = process.cwd();
        const projectDir = path.join(dir ?? ".", name ?? "server");
        const projectPath = path.join(workingDir, projectDir);
        console.log("Creating Project...");
        await exec(`npx typeorm init --name ${projectDir} --database mysql`);

        // install required npm packages
        console.log("Installling required npm packages...");
        const npmDeps = "npm install express dotenv bcrypt body-parser cors jsonwebtoken multer nodemailer nodemon uuid";
        const npmDevDeps = "npm install @types/bcrypt @types/cors @types/express @types/jsonwebtoken @types/multer @types/nodemailer @types/uuid --save-dev";
        await exec(`cd ${projectPath} && ${npmDeps} && ${npmDevDeps}`);
    } catch (error) {
        console.log(error);
        return;
    }
};
