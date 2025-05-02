import { IOption } from "./Option";

export interface ICommand {
    name: string;
    options: Array<IOption>;
    action: (opts: any) => void;
}
