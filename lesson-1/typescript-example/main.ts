import { Person } from "./Person";
import { Kid } from "./Kid";

const num: number = 1;

const person: Person = {
    lastname: 'Ramirez',
    name: 'Maria'
}

const registerPerson = (person: Person): void => {
    console.log(person);
    console.log(person.name);
}

// const person2 = new Person() ==> NO, person is an interface

const kid: Kid = new Kid();
// kid.lastname = ''; ==> it is not possible because Kid only have lastname getter, now lastname is read-only
kid.name = 'Sole' // this property exists because Kid implement Person interface
console.log(kid);

const kidPerson: Person = kid; // you can also do that for the same reason before

console.log(registerPerson(person));