//Javascript objekt till json med stringify
/* const person = {
    namn: "Anna",
    age: 25,
    yrke: "Utvecklare"
}

//Konvertera JS objekt till json
const jsonSträng = JSON.stringify(person)

console.log(jsonSträng)
 */

//Göra om JSON till JS
const jsonSträng = '{"namn": "Anna", "Age":25, "yrke": "Utvecklare" }'

//Konvertera JSON till JS Objekt
const personObject = JSON.parse(jsonSträng)

//console.log(personObject)
console.log(personObject.namn)
console.log(personObject.Age)
console.log(personObject.yrke)
