//linkando com o html 

const previousOperationText = document.querySelector("#previous-operation");
const currentOperationText = document.querySelector("#current-operation");
const buttons = document.querySelectorAll("#buttons-container buttons");

//conectar regra de negócios ao objeto. lógica da aplicação
class Calculator {
    constructor(previousOperationText, currentOperationText) {  //transformando propriedades do objeto
        this.previousOperationText = previousOperationText
        this.currentOperationText = currentOperationText  //valores impressos na tela
        this.currentOperation = "";                      //valor que está sendo digitado na hora
    }

    addDigit(digit) {  //adiciona os dígitos no visor
        this.currentOperation = digit
        this.updateScreen()   //atualiza o visor


        //Processando as operações
        processOperation(operation)

        // pegando valor atual e anterior
        let operationValue
        const previous = +this.previousOperationText.innerText;
        const current = +this.currentOperationText.innerText;

        //executando operações
        switch (operation) {
            case "+":
                operationValue = previous + current //valor em cima + debaixo
                this.updateScreen(operationValue, operation, current, previous)
                break;
            default:
                return;

        }
        //verificando se a operação atual já possui um "." para evitar erros
        if (digit === "." && this.currentOperationText.innerText.includes(".")) {
            return;
        }
    }

    //Mudança de valores vistos na calculador 
    updateScreen(operationValue = null, operation = null, current = null, previous = null) //são valores nulo antes de serem enviados através da operação
    {
        if (operationValue === null){
        this.currentOperationText.innerText += this.currentOperation;
        } else {
            //checando se o valor é 0, se for é add ao valor atual
            if (previous === 0) {
                operationValue = current
            }
        }
    }

    //colocando numeros da operação atual dentro do texto dessas operações atuais

}


const calc = new Calculator(operacaoAnteriorTxt, operacaoDigitadaTxt)


buttons.array.forEach(btn => {
    btn.addEventListener("click", (e) => {  //fazendo a caluculadora funcionar. evento de clique nos botões
        const value = e.target.innerText //pegar o valor do botão que a pessoa colocou, nesse caso o texto
        if (+value >= 0 || value === ".") { //conversão do valor para número. separar as classificações dos valores
            calc.addDigit(value);
        } else {
            calc.processOperation(value); //se não for um número ou ""."", vai ser uma operação

        }

    })
});