function outcome(){
    let num1 = Number(document.getElementById("num-one").value);
    let num2 = Number(document.getElementById("num-two").value);
    let result = 0;

    if(document.getElementById("box1").checked){
        result = num1 + num2;
    }else if(document.getElementById("box2").checked){
        result = num1 - num2;
    }else if(document.getElementById("box3").checked){
        result = num1 * num2;
    }else{
        if(num2 != 0)
            result = num1 / num2;
        else
            alert("Impossible divide by 0!")
    }

    document.getElementById("resultArea").innerHTML = "Result: " + String(result);

}