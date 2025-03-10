alert("Está funcionando o JavaScript");

let firstName = "Eduardo";
let lastName = "Sousa";
let age = 20;
let profession = "developer";


console.log(firstName);
console.log(lastName);
console.log(age);
console.log(profession);


const dateOfBirth = "14/07/2003";
console.log(dateOfBirth);


let people = {
    firstName,
    lastName,
    age,
    profession,
    dateOfBirth
};

console.log(people);


function saleStatus(status){
    console.log(status);
}

saleStatus("Approved");



function discount(porcentage, totalValue){
    return totalValue - (totalValue * porcentage / 100);
}

console.log("amount to be paid: "+ discount(35, 2500));