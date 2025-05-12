#!/usr/bin/env node

import { createModules } from "./actions/backend";
import { dbCommand } from "./actions/database";
import { generateCommand } from "./actions/generate";
import { newCommand } from "./actions/new";
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
            { name: "--methods, -m", description: "Add methods to controller - must be separated with commas ','" },
            { name: "middleware, mi", description: "Create an empty middleware" },
            { name: "--multer", description: "if added on middleware creation command will create a multer upload middleware" },
            { name: "entity, e", description: "Create new entity" },
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
    })
    .command({
        name: "database, db",
        options: [
            { name: "seed", description: "Seed database with data based on project's seed files" },
            { name: "--create", description: "Add tag to the end of db seed command to Create seeder file(s)" },
        ],
        action: dbCommand,
    })
    .command({
        name: "new, n",
        options: [{ name: "server, s", description: "Create new backend project" }],
        action: newCommand,
    });
program.parse(process.argv);
