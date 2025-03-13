let productValue = Number(prompt("Enter value of product: "));

if(productValue >= 20){
    document.getElementById("result").innerHTML = "approved"
}else{
    document.getElementById("result").innerHTML = "denied"
}
