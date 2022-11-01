const previousOperationText = document.querySelector("#previous-operation");
const currentOperationText = document.querySelector("#current-operation")
const buttons = document.querySelectorAll("#buttons-container button")

class Calculator {
    constructor(previousOperationText, currentOperationText) {
        this.previousOperationText = previousOperationText;
        this.currentOperationText = currentOperationText;
        this.currentOperation = "";
    }

    // add digit to calculator screen
    addDigit(digit) {
        // check if current already has a dot
        if(digit === "." && this.currentOperationText.innerText.includes(".")) {  // caso o texto atual já contenha um ponto, ignore-o
            return;
        }
        this.currentOperation = digit; // adiciona o dígito à operação atual
        this.updateScreen();
    }

    // Process all calculator screen
    processOperation(operation) {
        // check if current value is empty
        if(this.currentOperationText.innerText === "" && operation !== "C") { // caso o valor atual esteja vazio, e a operação passada não seja um CLEAR, verifique se há algo no valor anterior. Caso positivo, chame o método changeOperation com o novo operador para mudar a operação
            // Change operation
            if(this.previousOperationText.innerText !== "") {
                this.changeOperation(operation);
            }
            return;
        }

        // Get current and previous value
        let operationValue;
        const previous = +this.previousOperationText.innerText.split(" ")[0]; // armazena o valor anterior sem a operação
        const current = +this.currentOperationText.innerText; // armazena o valor atual

        switch(operation) {
            case "+":
                operationValue = previous + current;
                this.updateScreen(operationValue, operation, current, previous);
                break;
            case "-":
                operationValue = previous - current;
                this.updateScreen(operationValue, operation, current, previous);
                break;
            case "*":
                operationValue = previous * current;
                this.updateScreen(operationValue, operation, current, previous);
                break;
            case "/":
                operationValue = previous / current;
                this.updateScreen(operationValue, operation, current, previous);
                break;
            case "DEL":
                this.processDelOperator();
                break;
            case "CE":
                this.clearCurrentOperation();
                break; 
            case "C":
                this.processClearOperation();
                break;
            case "=":
                this.processEqualOperator();
                this.currentOperationText.innerHTML = this.previousOperationText.innerHTML.split(' ')[0];
                this.previousOperationText.innerHTML = '';           
            default:
                return;
        }
    }

    // Change values of calculator screen
    updateScreen(operationValue = null, operation = null, current = null, previous = null) {
        
        //console.log(operationValue, operation, current, previous)

        if(operationValue === null){
            this.currentOperationText.innerText += this.currentOperation; // intercala os dígitos digitados no valor atual
        } else {
            // Check if value is zero, if it is just add current value
            if (previous === 0) {
                operationValue = current; // caso o valor anterior seja igual a 0, o valor total passa a ser o valor atual
            }

            // Add current value to previous
            this.previousOperationText.innerText = `${operationValue} ${operation}`;
            this.currentOperationText.innerText = "";
        }
    }

    // Change math operation
    changeOperation(operation) {
        const mathOperations = ["*", "/", "+", "-"];

        if(!mathOperations.includes(operation)) { // aborta a lógica caso não recebamos alguma operação esperado
            return; 
        }

        this.previousOperationText.innerText = this.previousOperationText.innerText.slice(0, -1) + operation;
        
    }

    // Delete the last digit
    processDelOperator() {
        this.currentOperationText.innerText = this.currentOperationText.innerText.slice(0, -1);
    }

    // Clear current operation
    clearCurrentOperation() {
        this.currentOperationText.innerText = "";
    }
    
    // Clear all operation
    processClearOperation() {
        this.currentOperationText.innerText = "";
        this.previousOperationText.innerText = "";
    }

    // Process an operation
    processEqualOperator() {
        const operation = previousOperationText.innerHTML.split(" ")[1];
        this.processOperation(operation);
    }
}


const calc = new Calculator(previousOperationText, currentOperationText)

buttons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        const value = e.target.innerText;
        
        if(+value >= 0 || value === "."){  // converte a string "value" para num, e caso o botão seja um número positivo ou ponto, passa o dígito para o método addDigit();
            calc.addDigit(value)
        } else {
            calc.processOperation(value) // passa o valor para o método processOperation, caso seja C, CE, DEL, /, * , + , -, ou =
        }
    })
})