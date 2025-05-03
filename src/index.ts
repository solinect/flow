#!/usr/bin/env node

import { createModules } from "./actions/backend";
import { generateCommand } from "./actions/generate";
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
            { name: "--methods, -m", description: "Added methods to controller - must be separated with commas ','" },
        ],
        action: createModules,
    })
    .command({
        name: "generate, g",
        options: [
            { name: "keys, k", description: "Generate encryption keys" },
            { name: "env, e", description: "Generate new .env file" },
        ],
        action: generateCommand,
    });
program.parse(process.argv);
