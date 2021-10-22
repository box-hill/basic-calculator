// press button -> add numbers or operator (add eventlistenr)
// state 1: user has now pressed a valid number, waiting on more numbers or operator
// state 2: operator inputed, first number input is now complete
// state 3: user has started input for 3rd input;
// compute the output using function operate()?
// return state to 1 (using result as first number)

// function operate(){} which takes in two numbers and operator, returns operatedResult

let screen_input = {
    input1: '',
    input2: '',
    operator: '',
    state: 1, // 1 = on first input, 2 = operator inputted, 3 = on 2nd input
};
const screen = document.getElementById('screen');
const buttons = document.querySelectorAll('.container button');

buttons.forEach(button => {
    button.addEventListener('click', parseInput)
});


function parseInput(e){
    let userInput = e.target.innerHTML;
    if(checkInput(userInput)){
        updateVariables(userInput);
        //screen_input.input1 += userInput;
        
        

    }
    else alert('Did you try to change the content of the page... That was very cheeky of you');
    //console.log(e.target.dataset.key);
}

// takes an input (one character) then checks if its valid
function checkInput(input){
    if(input.length != 1) return false;
    let allowedChars = '0123456789C/x-+=.%';
    for (let i = 0; i < allowedChars.length; i++) {
        if(allowedChars.charAt(i) === input)return true;
    }
    return false;
}

function updateVariables(input){
    if(screen_input.state === 1 && Number.isInteger(parseInt(input))){
        screen_input.input1 += input;
        screen.innerHTML += input;
        return;
    }
    if(screen_input.state === 1 && !Number.isInteger(parseInt(input))){
        screen_input.state = 2;
        screen_input.operator = input;
        screen.innerHTML = input;
    }
    if (screen_input.state === 2 && Number.isInteger(parseInt(input))){
        screen_input.state = 3;
        screen_input.input2 = input;
        screen.innerHTML = input;
        return;
    }
    if (screen_input.state === 3 && Number.isInteger(parseInt(input, 10))) {
        screen_input.input2 += input;
        screen.innerHTML += input;
        return;
    }
    if(screen_input.state === 3 && input === '='){
        screen.innerHTML = operate(screen_input); // do calculations and update screen
    }
}

function operate(obj){
    if (obj.state != 3) return null; // only operate on state 3

    let first_arg = parseInt(obj.input1);
    let second_arg = parseInt(obj.input2);
    let result = 0;
    switch(obj.operator){
        case '+':
            result = first_arg + second_arg;
            break;
        case '-':
            result = first_arg - second_arg;
            break;
        case '/':
            result = first_arg / second_arg;
            break;
        case 'x':
            result = first_arg * second_arg;
            break;
        case '%':
            result = first_arg % second_arg;
            break;
    }
    
    obj.state = 1; // use result as next input1
  obj.input1 = result;
  return result;
}
