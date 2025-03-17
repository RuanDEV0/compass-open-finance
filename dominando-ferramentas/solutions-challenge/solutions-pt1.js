const ps = require("prompt-sync");
const prompt = ps();

function sumArray(array){
    let total = 0;
    for(let i = 0; i < array.length; i++){
        total += parseInt(array[i]);
    }
    return total;
}

function inputData(){

    let input = prompt("Enter elements array : ");

    // Remove colchetes da string de entrada do usuário
    let removeFirstColchete = input.replace("[", " ");
    let removeColchete = removeFirstColchete.replace("]", " ");
        
    let data = removeColchete.split(",");

    return data;
}

function firstChallenge(){

    let arrayFinal = inputData();

    if(!isNaN(sumArray(arrayFinal))){
        console.log("Sum of elements: "+ sumArray(arrayFinal));
    }else{
        console.log("Value invalid detected!");
    }
    
}

// ## **1️⃣ Somar Todos os Elementos de um Array Unidimensional**

firstChallenge();