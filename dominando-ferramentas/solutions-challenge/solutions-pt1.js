const user = require("prompt-sync");
const prompt = user();

// ## **1️⃣ Somar Todos os Elementos de um Array Unidimensional**

let input = prompt("Enter elements array : ");
// Remove colchetes da string de entrada do usuário
input = input.replace("[", " ");
input = input.replace("]", " ");

input = input.split(",");

if(!isNaN(sumArray(input))){
    console.log("Sum of elements: "+ sumArray(input));
}else{
    console.log("Value invalid detected!");
}

function sumArray(array){
    let total = 0;
    for(let i = 0; i < array.length; i++){
        total += parseInt(array[i]);
    }
    return total;
}



//## **2️⃣ Verificar se um Número é Primo**

input = prompt("Enter number: ");
let result = isNaN(input) ? "Value invalid detected!" : `${input} is number prime? ${isPrimo(input)}`
console.log(result);

function isPrimo(number){
    let cont = 0;
    for(let i = 1; i <= number; i++){
        if(number % i == 0){
            cont++;
        }
    }

    return cont == 2 ? true : false;
}


// //## **3️⃣ Verificar se uma String é um Palíndromo** 
// Em alguns casos não está ignorando acentos.

let word = prompt("Enter string: ");
console.log(word + " is palíndromo? "+ isPalindromo(word));

function isPalindromo(parameter){
    word = word.trim();
    word = word.toLowerCase();

    let array = word.split("");
    let result = array.filter(strings => strings.replace(" ", ""));

    let beforeReverse = result.join("");
    let afterReverse = result.reverse().join("")

    return beforeReverse == afterReverse ? true : false;
}