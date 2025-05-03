import { ICommand } from "./Interface/Command";
import { IOption } from "./Interface/Option";
import { parserCompare } from "./utils/compare";
import { pad } from "./utils/padding";

export class Program {
    private commands: Array<ICommand> = [];

    public command(data: ICommand) {
        this.commands.push(data);
        return this;
    }

    public parse(tokens: Array<string>) {
        tokens = tokens.slice(2);
        const options: Array<IOption> = [];

        const command = this.commands.find((o) => parserCompare(o.name, tokens[0]));
        if (!command || tokens[0] === "--help" || tokens[0] === "-h") {
            this.showHelp();
            return;
        }
        tokens = tokens.slice(1);
        for (let i = 0; i < tokens.length; i++) {
            // check if token name or value
            const check = command.options.find((o) => parserCompare(o.name, tokens[i]));
            if (check) {
                // if already exists add this token as value
                const exists = options.find(() => parserCompare(check.name, tokens[i]));
                if (exists && !exists.value) {
                    exists.value = tokens[i];
                }
                // if not push new option
                else options.push({ name: tokens[i] });
            } else if (!check && i > 0) {
                const option = options.find((o) => parserCompare(o.name, tokens[i - 1]));
                if (option) option.value = tokens[i];
            }
        }

        // exec action
        command.action(options);
    }

    public showHelp() {
        console.log(`Flow Usage:`);
        const colWidths = {
            command: Math.max(...this.commands.map((c) => Math.max(...c.options.map((o) => o.name.length))), "command".length),
            description: Math.max(...this.commands.map((c) => Math.max(...c.options.map((o) => o.description.length))), "Description".length),
        };
        this.commands.forEach((command) => {
            const coName = command.name.split(",").map((n) => n.trim());
            console.log(`\t ${coName[0]} ${coName.length > 1 ? `[alias: ${coName[1]}]` : ""} :`);

            command.options.forEach((option) => {
                const opName = option.name.split(",").map((n) => n.trim());
                console.log(`\t\t ${pad(`${opName[0]} ${opName.length > 1 ? `[alias: ${opName[1]}]` : ""}`, colWidths.command * 2)}   ${pad(option.description ?? "", colWidths.description)}`);
            });
        });
    }
}
