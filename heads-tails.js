#!/usr/bin/env node

/*
Написать консольную игру "Орел или решка".

Игра загадывает случайное число (1 или 2) и предлагает пользователю угадывать его.
В качестве аргументов программа принимает на вход имя файла для логирования результатов каждой партии.
Лог-файл может быть представлен в виде любой структуры данных.

Insert into console:
./heads-tails.js
*/

const readline = require('readline');
const fs = require('fs');
const path = require('path');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const dir = path.join(__dirname, 'logs');

if (!fs.existsSync(dir)) { // Create dir if she doesn't exist
  fs.mkdir(dir, (err) => {
    if (err) throw new Error(err);
    console.log('Ok mkdir');
  });
}

const logFile = path.join(__dirname, 'logs', 'logs.txt'); // .join() - объединяет все переданные аргументы и нормализует
// let logFileContent = '';

const question = () => {
  const today = new Date()
  const number = Math.round(Math.random() + 1);  // 1 - Орел    2 - Решка
  // console.log('number = ', number);
  const numberString = number === 1 ? 'Орел' : 'Решка'
  let gameResult = 'Неверный ввод'

  return new Promise((resolve, reject) => {
    rl.question('Орел или Решка? ', (answer) => {
      answer = answer.toLowerCase()
      let answerNumber = 0
      if (answer === 'орел') answerNumber = 1
      if (answer === 'решка') answerNumber = 2
      // console.log('answerNumber = ', answerNumber);

      // const answerString = answerNumber === 0 ? 'Введите правильно ответ!' : number === 1 ? 'Орел' : 'Решка'
      if (answerNumber === 0) console.log('Введите правильно ответ!')
      else if (answerNumber === number) {
        gameResult = 'Угадано'
        console.log(`Вы угадали! 😁 ----- Это ${numberString}.`)
      }
      else {
        gameResult = 'Не угадано'
        console.log(`Вы не угадали 😋 ----- Это ${numberString}.`)
      }

      const logFileContent = 'Дата-время: ' + today.toLocaleString() + '  /  Загадано: ' + numberString + '  /  Ответ: ' + answer.charAt(0).toUpperCase() + answer.substr(1) + '  /  Результат: ' + gameResult + '\n'

      fs.appendFile(
        logFile,
        logFileContent,
        err => {
         if (err) throw new Error(err)
         // console.log('Ok');
        }
      );

      resolve()
    })
  })
}

const guessing = async () => {
  await question()
  guessing()
  // rl.close()
}

guessing()
