#!/usr/bin/env node
/*
Написать утилиту получения текущей даты и времени с богатым интерфейсом. Для реализации парсинга аргументов командной строки предлагаем использовать yargs
Текущая дата и время в формате ISO: cmd current
Текущий год: cmd current --year или cmd current -y
Текущий месяц: cmd current --month или cmd current -m
Дата в календарном месяце: cmd current --date или cmd current -d
Необходимо добавить возможность получать даты в прошлом или будущем через команды add и sub:
cmd add -d 2 - дата и время в формате ISO на два дня вперед cmd sub --month 1 - дата и время в формате ISO на 1 месяц назад
Example: ./date.js sub -d 2
*/

const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')
const argv = yargs(hideBin(process.argv)).argv

const today = new Date()
const curYear = today.getFullYear()
const curMonth = ("0" + (today.getMonth() + 1)).slice(-2)
// const curNumber = today.toLocaleString().slice(0, 2)
const curNumber = today.getDate()
// const curTime = today.toLocaleString().slice(0)
const curTime = {
  hours: today.getHours(),
  minutes: today.getMinutes(),
  seconds: today.getSeconds()
}

// console.log('Today = ', today);
// console.log('curTime : ', curTime);

// for (let prop in argv) {
//   console.log("obj." + prop + " = " + argv[prop]);
//   // Wright: ./date.js current --year
//   // Get:  obj._ = current
//   // obj.year = true
//   // obj.$0 = date.js
// }

switch(argv['_'][0]) {
  case 'add':
    getSomeDate('future')
    break;

  case 'sub':
    getSomeDate('past')
    break;

  default:
    getCurrentDate() // 'current'
    break;
}

function getCurrentDate() {
  if (argv.y || argv.year) console.log('Current year: ', curYear)
  else if (argv.m || argv.month) console.log('Current month: ', curMonth)
  else if (argv.d || argv.date) console.log('Current date: ', today.toLocaleString().slice(0,10))
  else console.log('Current ISO date: ', today.toISOString()) // вернёт 2022-01-23T07:43:00.017Z
}

function getSomeDate(time) {
  if (argv.d || argv.date) {
    const qtyDays = time === 'future' ? Number(argv.d || argv.date) : -Number(argv.d || argv.date)
    const otherDate = new Date(curYear, +curMonth, (curNumber + qtyDays), curTime.hours, curTime.minutes, curTime.seconds)
    if (time === 'future') console.log('Future date after ', argv.d || argv.date, ' days: ', otherDate)
    else console.log('Past date before ', argv.d || argv.date, ' days: ', otherDate)
  }
  if (argv.m || argv.month) {
    const qtyMonths = time === 'future' ? Number(argv.m || argv.month) : -Number(argv.m || argv.month)
    const otherDate = new Date(curYear, (+curMonth + qtyMonths - 1), curNumber, curTime.hours, curTime.minutes, curTime.seconds)
    if (time === 'future') console.log('Future date after ', argv.m || argv.month, ' months: ', otherDate)
    else console.log('Past date before ', argv.m || argv.month, ' months: ', otherDate)
  }
}
