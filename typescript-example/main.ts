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

// const person2 = new Person(); ==> NO!, person is an interface

const kid: Kid = {
  name: 'Sole',
  lastName: 'Perez' // this property exists because Kid implement Person interface
}

console.log(kid);

const kidPerson: Person = new Kid(); // it is possible due to kid class inherits from Person class

console.log(kid);