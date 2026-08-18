
        
    function addition(){
        var num1 = parseInt(document.getElementById('num1').value);
        var num2 = parseInt(document.getElementById('num2').value);
        var result = document.getElementById('result');
        result.innerHTML = "Addition of " + num1 + " and " + num2 + " is: " + (num1+num2);
        console.log("Addition of " + num1 + " and " + num2 + " is: " + (num1+num2));
    }
    
    function subtraction(){
        var num1 = parseInt(document.getElementById('num1').value);
        var num2 = parseInt(document.getElementById('num2').value);
        var result = document.getElementById('result');
        result.innerHTML = "Subtraction of " + num1 + " and " + num2 + " is: " + (num1-num2);
        console.log("Subtraction of " + num1 + " and " + num2 + " is: " + (num1-num2));
    }
    
    function multiplication(){
        var num1 = parseInt(document.getElementById('num1').value);
        var num2 = parseInt(document.getElementById('num2').value);
        var result = document.getElementById('result');
        result.innerHTML = "Multiplication of " + num1 + " and " + num2 + " is: " + (num1*num2);
        console.log("Multiplication of " + num1 + " and " + num2 + " is: " + (num1*num2));
    }
    
    function division(){
        var num1 = parseInt(document.getElementById('num1').value);
        var num2 = parseInt(document.getElementById('num2').value);
        var result = document.getElementById('result');
        result.innerHTML = "Division of " + num1 + " and " + num2 + " is: " + (num1/num2);
        console.log("Division of " + num1 + " and " + num2 + " is: " + (num1/num2));
    }

    function changeColor(){
        var colorChanged = false;
        var ps = document.getElementsByTagName("p");
        if(colorChanged = false){
            ps[3].style.color = "red";
            colorChanged = true;
        }
        if(colorChanged=true){
            ps[3].style.color = "black";
            colorChanged = false;
        }
        
    }

    function highlight(){
        var ps = document.getElementsByTagName("p");
        ps[4].style.backgroundColor = "yellow";
    }

    function unhighlight(){
        var ps = document.getElementsByTagName("p");
        ps[4].style.backgroundColor = "transparent";
    }