#!/usr/bin/env node

import { createModules } from "./actions/backend";
import { IOption } from "./Interface/Option";
import { Program } from "./parser";

const program = new Program();

//
program
    .command({
        name: "create, c",
        options: [
            { name: "module, m", description: "Create new module - directory with router and controller" },
            { name: "router, r", description: "Create new backend router" },
            { name: "controller, c", description: "Create new backend controller" },
        ],
        action: createModules,
    })
    .command({
        name: "generate, g",
        options: [
            { name: "-k, --keys", description: "Generate encryption keys" },
            { name: "-e, --env", description: "Generate new .env file" },
        ],
        action: (options: Array<IOption>) => {
            console.log(options);
            console.log("Generate command!");
        },
    });
program.parse(process.argv);
