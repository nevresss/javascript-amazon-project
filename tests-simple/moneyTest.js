import formatCurrenncy from "../scripts/utils/money.js";


console.log('Test suite: formatCurrency');

console.log('converts cents into dollars');
if(formatCurrenncy(2095) === '20.95'){
    console.log('passed');
}else{
    console.log('failed');
}

console.log('works with zero');

if(formatCurrenncy(0) === '0.00'){
    console.log('passed');
}else{
    console.log('failed');
}

console.log('Round up to the nearest cent');
if(formatCurrenncy(2000.5) === '20.01'){
    console.log('passed');
}else{
    console.log('failed');
}

console.log('round up to the lowest cent');
if(formatCurrenncy(2000.4) === '20.00'){
    console.log('passed');
}else{
    console.log('failed');
}
