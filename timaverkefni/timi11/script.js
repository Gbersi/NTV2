"use strict";
const user = {
    firstName: "gunnsteinn",
    age: 30,
};
const adminUser = {
    firstName: "gunnsteinn",
    age: 30,
};
// "external service, types are not defined since we cannot guarantee it from an endpoint"
const userService = (param) => {
    if (param === 1) {
        return user;
    }
    return adminUser;
};
const getUser = () => {
    /*
      ... some logic to get user from an external service
    */
    const data = userService(1);
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
const returnDoubleAgeOfPerson = (person) => {
    person.age = 40;
    return person.age * 2;
};
const age = 10;
const firstName = "Gunnsteinn";
const arrayOfNumbers = [1, 2, 3, 4, 5, "asdf"];
const numberObject = {
    foo: 10,
    bar: 20,
};
const gunnsteinn = {
    alive: true,
    canStartFire: true,
    eyeCount: 2,
    legCount: 2,
    nippleCount: 2,
    warmBlooded: true,
};
const bird = {
    alive: true,
    eyeCount: 2,
    flying: true,
    legCount: 2,
    warmBlooded: true,
};
