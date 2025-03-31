const user: any = {
  firstName: "gunnsteinn",
  age: 30,
};
const adminUser: any = {
  firstName: "gunnsteinn",
  age: 30,
};

type User = {
  firstName: string;
  age: number;
  role: "consumer";
};

type AdminUser = {
  employeeNumber: number;
  name: string;
  role: "admin";
};

type Profile = {
  imageCount: number;
};

// "external service, types are not defined since we cannot guarantee it from an endpoint"
const userService = (param: number) => {
  if (param === 1) {
    return user;
  }

  return adminUser;
};

const getUser = (): AdminUser | User | Profile => {
  /*
    ... some logic to get user from an external service
  */
  const data = userService(1) as AdminUser | User | Profile;

  if ("role" in data) {
    if (data.role === "admin") {
      // A function to handle admin users could be used here
      return data;
    }
    // A function to handle non-admin users could be used here
    return data;
  }
  // A function to handle profiles could be used here
  return data;
};

type ReturnDoubleAgeOfPersonType = (person: User) => number;

const returnDoubleAgeOfPerson: ReturnDoubleAgeOfPersonType = (person) => {
  person.age = 40;
  return person.age * 2;
};

const age: number = 10;
const firstName: string = "Gunnsteinn";

const arrayOfNumbers = [1, 2, 3, 4, 5, "asdf"] as const;

type NumberObject = Record<string, number>;

const numberObject: NumberObject = {
  foo: 10,
  bar: 20,
};

type Organism = {
  alive: boolean;
};

type Animal = Organism & {
  legCount: number;
};

type Mammal = Animal & {
  warmBlooded: true;
  eyeCount: 2;
  nippleCount: number;
};

type Reptile = Animal & {
  warmBlooded: boolean;
  eyeCount: 2;
};

type Human = Mammal & {
  legCount: 2;
  nippleCount: 2;
  canStartFire: true;
};

const gunnsteinn: Human = {
  alive: true,
  canStartFire: true,
  eyeCount: 2,
  legCount: 2,
  nippleCount: 2,
  warmBlooded: true,
};

type FlyingAnimal<T extends Animal> = T & {
  flying: true;
};

const bird: FlyingAnimal<Reptile> = {
  alive: true,
  eyeCount: 2,
  flying: true,
  legCount: 2,
  warmBlooded: true,
};
