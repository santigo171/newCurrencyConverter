const currencyListButton1 = document.getElementById("currencyListButton1");
const currencyListButton2 = document.getElementById("currencyListButton2");
const currencyList1 = document.getElementById("currencyList1");
const currencyList2 = document.getElementById("currencyList2");
const currencyInput1 = document.getElementById("currencyInput1");
const currencyInput2 = document.getElementById("currencyInput2");
const changeValues_img = document.getElementById("change-values");

let iList1 = 0, iList2 = 0;
let currencyContainer, currentCurrency_p;
let currencyHistory = ["Julian"], lastCurrency, currentCurrency;
const currencyListMoney = ["USD", "EUR", "COP", "MXN", "ARS", "PEN", "VES", "BOB", "BRL", "CLP", "CRC", "CUP", "PYG", "UYU", "RUB"];

function showCurrencyList(number) {
    if (number === 1) {
        if(!iList1) {
            currencyList1.style.display = 'block';
            currencyListButton1.innerHTML = "Hide";
            iList1 = 1;
        } else {
            currencyList1.style.display = 'none';
            currencyListButton1.innerHTML = "Change currency";
            iList1 = 0;
        }
    } else if (number === 2) {
        if(!iList2) {
            currencyList2.style.display = 'block';
            currencyListButton2.innerHTML = "Hide";
            iList2 = 1;
        } else {
            currencyList2.style.display = 'none';
            currencyListButton2.innerHTML = "Change currency";
            iList2 = 0;
        }    
    }
}

function getValueOfCurrency(currency) {
    switch (currency) {
        case "USD": return 1;
        case "EUR": return 1.21475;
        case "COP": return 0.000287809;
        case "MXN": return 0.0500623;
        case "ARS": return 0.0115015;
        case "PEN": return 0.274329;
        case "VES": return 0.000000578366;
        case "BOB": return 0.145329;
        case "BRL": return 0.186869;
        case "CLP": return 0.00136386;
        case "CRC": return 0.00163868;
        case "CUP": return 0.0377358;
        case "PYG": return 0.000145356;
        case "UYU": return 0.0237869;
        case "RUB": return 0.0133104;
    }
}

function operation(currency1, currency1Mount, currency2) {
    if (currency1 == currency2) {
        return currency1Mount
    }
    currency1Value = getValueOfCurrency(currency1);
    currency2Value = getValueOfCurrency(currency2);
    let result = (currency1Mount  * currency1Value) / currency2Value;
    if (result !== 0) {return result}
}

function changeValues() {
    currencyInput2.setAttribute('value', "999999999999999");
    currencyInput1.setAttribute('value', "222222222222222");

    currentCurrency1_p = document.getElementById("currentCurrency1");
    currentCurrency2_p = document.getElementById("currentCurrency2");
    newCurrentCurrency1 = currentCurrency2_p.innerHTML;
    newCurrentCurrency2 = currentCurrency1_p.innerHTML;

    currentCurrency1.innerHTML = newCurrentCurrency1;
    currentCurrency2.innerHTML = newCurrentCurrency2;
}

function convertCurrency(number) {
    currencyContainer = document.getElementById("currencyContainer" + number);
    currencyInput = document.getElementById("currencyInput" + number)
    if (number == 1) {
        otherCurrencyContainer = document.getElementById("currencyContainer" + 2);
        otherCurrencyInput = currencyInput2;
    }
    else if (number == 2) {
        otherCurrencyContainer = document.getElementById("currencyContainer" + 1);
        otherCurrencyInput = currencyInput1;
    }
    currency1 = currencyContainer.classList[1];
    currency1Mount = currencyInput.value;
    currency2 = otherCurrencyContainer.classList[1];
    
    textToPrint = operation(currency1, currency1Mount, currency2).toFixed(2);
    otherCurrencyInput.setAttribute('value', textToPrint);
}

function currencyContainerStyles(number, currencyCode) {
    currencyContainer = document.getElementById("currencyContainer" + number);
    currentCurrency_p = document.getElementById("currentCurrency" + number);

    currencyName_id = currencyCode + number;
    currencyName = document.getElementById(currencyName_id).innerText.slice(0, -5);

    currencyHistory.unshift(currencyCode);
    lastCurrency = currencyHistory[1];
    currentCurrency = currencyHistory[0];
    currencyHistory.pop();

    currencyContainer.classList.remove(lastCurrency);
    currencyContainer.classList.add(currentCurrency);
    currentCurrency_p.innerHTML = currencyName;

    showCurrencyList(number);
    convertCurrency(number);
}

function main() {
    currencyListButton1.addEventListener('click', () => showCurrencyList(1));
    currencyListButton2.addEventListener('click', () => showCurrencyList(2));

    let currencyGetElement = function (number, currencyCode) {
        return "const " + currencyCode + " = document.getElementById('" + currencyCode + number + "');"
    }
    
    let currencyListener = function (number, currencyCode) {
        return currencyCode + number + ".addEventListener('click', () => currencyContainerStyles(" + number + ", '" + currencyCode + "'))"
    }
    let i = 0;
    
    for (;currencyListMoney[i];) {
        eval(currencyGetElement(1, currencyListMoney[i]));
        eval(currencyGetElement(2, currencyListMoney[i]));
        eval(currencyListener(1, currencyListMoney[i])); //Ciclo for que le agrega addEventListener a cada moneda 😎
        eval(currencyListener(2, currencyListMoney[i]));
        i++;
    }

    changeValues_img.addEventListener('click', () => changeValues());
}

main();




