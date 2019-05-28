import { Person } from "./Person";

export class Kid implements Person {
    name: string;
    // lastname: string;

    // getter
    get lastname(): string {
        return this.name + 'XP';
    }
}