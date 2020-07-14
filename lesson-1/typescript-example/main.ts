interface Person {
  name: string;
  lastName: string;
}

class Kid implements Person {
  name: string;
  lastName: string;
}

const num: number = 1;

const person: Person = {
    lastName: 'Ramirez',
    name: 'Maria'
}

const registerPerson = (person: Person): void => {
    console.log(person);
    console.log(person.name);
}

// const person2 = new Person() ==> NO, person is an interface

const kid: Kid = new Kid();
kid.lastName = 'Perez';
kid.name = 'Sole' // this property exists because Kid implement Person interface
console.log(kid);

const kidPerson: Person = kid; // you can also do that for the same reason before

registerPerson(person);