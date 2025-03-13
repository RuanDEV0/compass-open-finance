let array = [12,4,334,45,6,5,2,1,4,15];

//Utilizando filter
console.log(array.filter(number => number < 5));


//Adicionando ao Array
array.push(100);
array.unshift(0);
array.splice(5,0,20,30,40)



//Consultando
console.log(array.indexOf(20));
console.log(array.includes(100));

console.log(array);

//Retorna dados do intervalo
console.log(array.slice(3,6));

//Quebrando o array
let arrayString = ["Testando", "Metodos", "Javascript"]
console.log("JOIN: "+arrayString.join(", "));


//Removendo do Array numeros
array.pop();
array.shift();
array.splice(4,3);

//Esvaziando array numeros
array.length = 0;


//Procurando por referencia
let movies = [
    {id: 1, title: "A007"},
    {id: 2, title: "RD2"},
    {id: 3, title: "Matrix"}
]

console.log(movies.find(movie => movie.title == "007"));