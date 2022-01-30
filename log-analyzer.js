#!/usr/bin/env node

/*
Написать программу-анализатор игровых логов. В качестве аргумента программа получает путь к файлу логов из задания 1.

По результатам анализа программа выводит в консоль следующие данные:

- общее количество партий;
- количество выигранных / проигранных партий;
- процентное соотношение выигранных партий.

Insert into console:
./log-analyzer.js
*/

const fs = require('fs');
const path = require('path');

const logFile = path.join(__dirname, 'logs', 'logs.txt');
let logs = []
let qtyGameWon = 0 // выигранная партия
let qtyGameLost = 0

fs.readFile(
  logFile,
  'utf-8',
  (err, data) => {
    if (err) throw new Error(err)
    console.log(data);

    logs = data.split('\n')
    logs.pop()

    logs.forEach( (string, index) => {
      const gameResult = string.slice(string.indexOf('Результат') + 10)
      console.log('gameResult : ', gameResult);
      if (gameResult.trim() === 'Угадано') qtyGameWon++
      if (gameResult.trim() === 'Не угадано') qtyGameLost++
    })

    const percentGameWon = qtyGameWon * 100 / logs.length
    const percentGameLost = qtyGameLost * 100 / logs.length

    console.log('Общее количество партий : ', logs.length);
    console.log('Количество выигранных партий : ', qtyGameWon);
    console.log('Количество проигранных партий : ', qtyGameLost);
    console.log('Процентное соотношение :\n', 'Выигранных партий : ', percentGameWon, '%\n', 'Проигранных партий : ', percentGameLost, '%');
  }
);
