//linkando com o html 

const previousOperationText = document.querySelector("#previous-operation");
const currentOperationText = document.querySelector("#current-operation");
const buttons = document.querySelectorAll("#buttons-container button");

//conectar regra de negócios ao objeto. lógica da aplicação
class Calculator {
    constructor(previousOperationText, currentOperationText) {  //transformando propriedades do objeto
        this.previousOperationText = previousOperationText
        this.currentOperationText = currentOperationText  //valores impressos na tela
        this.currentOperation = "";                      //valor que está sendo digitado na hora
    }

    addDigit(digit) {   //add números no visor
        console.log(digit);
        if (digit === "." && this.currentOperationText.innerText.includes(".")) {
            return;
        }

        this.currentOperation = digit;
        this.updateScreen();
    }

    //Processando as operações
    processOperation(operation) {

        //checando se o valor digitado está vazio. para mudar a operação a ser feita
        if (this.currentOperationText.innerText === "" && operation !== "C") {
            if (this.currentOperationText.innerText !== "") {
                //mudando a operação
                this.changeOperation(operation);
            }
            return
        }

        // pegando valor atual e anterior
        let operationValue;
        const previous = +this.previousOperationText.innerText.split(" ")[0];
        const current = +this.currentOperationText.innerText;

        //executando operações
        switch (operation) {
            case "+":
                operationValue = previous + current //valor em cima + debaixo
                this.updateScreen(operationValue, operation, current, previous)
                break;
            case "-":
                operationValue = previous - current //valor em cima - debaixo
                this.updateScreen(operationValue, operation, current, previous)
                break;
            case "/":
                operationValue = previous / current //valor em cima / pelo debaixo
                this.updateScreen(operationValue, operation, current, previous)
                break;
            case "*":
                operationValue = previous * current //valor em cima * pelo debaixo
                this.updateScreen(operationValue, operation, current, previous)
                break;
            case "DEL":
                this.processDellOperator();
                break;
            case "CE":
                this.processClearCurrentOperation();
                break;
            case "C":
                this.processClearOperation();
                break;
            case "=":
                this.processEqualOperator();
                break;
            default:
                return;
        }
    }


    //Mudança de valores vistos na calculador 
    updateScreen(operationValue = null, operation = null, current = null, previous = null) //são valores nulo antes de serem enviados através da operação
    {
        if (operationValue === null) {
            this.currentOperationText.innerText += this.currentOperation;
        } else {
            //checando se o valor é 0, se for é add ao valor atual
            if (previous === 0) {
                operationValue = current
            }

            // adicione o valor atual ao anterior
            this.previousOperationText.innerText = `${operationValue} ${operation}`; //string concatenada com o valor mais a operação
            this.currentOperationText.innerText = ""; //zerando o valor da operação
        }
    }

    changeOperation(operation) {
        const mathOperations = ["*", "/", "+", "-"];
        if (!mathOperations.includes(operation)) {     //verificando se a operação qeu o usuário digitou está entre as da calc
            return
        }
        // podendo alterar a operação digitada


        this.previousOperationText.innerText = this.previousOperationText.innerText.slice(0, -1) + operation;
    }


    processDellOperator() {               //deletando o dígito
        this.currentOperationText.innerText = this.currentOperationText.innerText.slice(0, -1);
    }


    processClearCurrentOperation() {
        this.currentOperationText.innerText = "";  //apagando operação digitada
    }

    processClearOperation() {
        this.currentOperationText.innerText = "";   //apagando tudo
        this.previousOperationText.innerText = "";
    }


    processEqualOperator() {      //processando as operações com o =
        const operation = previousOperationText.innerText.split(" ")[1]
        this.processOperation(operation);
    }
}
//colocando numeros da operação atual dentro do texto dessas operações atuais

const calc = new Calculator(previousOperationText, currentOperationText)

buttons.forEach(btn => {
    btn.addEventListener("click", (e) => {  //fazendo a caluculadora funcionar. evento de clique nos botões
        const value = e.target.innerText //pegar o valor do botão que a pessoa colocou, nesse caso o texto
        if (+value >= 0 || value === ".") { //conversão do valor para número. separar as classificações dos valores
            calc.addDigit(value);
        } else {
            calc.processOperation(value); //se não for um número ou ""."", vai ser uma operação
        }

    });
});
// 


