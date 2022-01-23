#!/usr/bin/env node
/*
Необходимо написать утилиту командной строки, которая играет в игру "Загадай число". Программа загадывает число и выводит диапазон значений, в пределах которого число было загадано. Пользователь набирает числа в стандартный поток ввода и получает ответ больше или меньше, чем загаданное.
Примерный ход работы:
cmd Загадано число в диапазоне от 0 до 100
1
Больше
75
Меньше
55
Отгадано число 55
Insert into console: ./guess-number.js
*/
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const number = Math.trunc(Math.random() * 100);
// console.log('number = ', number);

function giveAnswer(num) {
  if (num > number) {
    rl.question('Меньше! ', (usernum) => {
      giveAnswer(usernum);
      // rl.close();
    });
  }
  else if (num < number) {
    rl.question('Больше! ', (usernum) => {
      giveAnswer(usernum);
      // rl.close();
    });
  }
  else {
    console.log('Отгадано число - ', num);
    rl.close();
  }
}

rl.question('Загадано целое число в диапазоне от 0 до 100. Введите это число! ', (somenum) => {
  giveAnswer(+somenum);
});
