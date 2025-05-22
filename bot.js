const TelegramBot = require('node-telegram-bot-api');

const token = process.env.TELEGRAM_BOT_TOKEN;

const bot = new TelegramBot(token, { polling: true});


const reminders = [
   'sleep',
   'dream',
   'love',
   'drink',
   'lazy'
]

bot.on('message', (msg) => {
  reminders.push(msg.text)
  console.log(msg.text)
  bot.sendMessage(1825527066, '✅', {
    disable_notification: true,
    reply_markup: {
      inline_keyboard: [[
        { text: "🎯 Рандомная цель", callback_data: 'random_goal' }
      ]]
    }
  });
});


// Обработка кнопки "🎯 Рандомная цель"
bot.on('callback_query', (callbackQuery) => {
  const msg = callbackQuery.message;
  const goal = reminders[Math.floor(Math.random() * reminders.length)];
  bot.sendMessage(msg.chat.id, `🎯 Цель: ${goal}`);
});



  


const now = new Date();
const h = now.getHours();
const m = now.getMinutes();
const s = now.getSeconds();
console.log(`🚀 SCRIPT: ${h}:${m}:${s}`);

let dayOfWeek = now.getDay();

const timeAlarm = [36000, 28800, 19800, 23400, 28800, 21000, 34200]
const diffAlarm = [2000, 3000, 4000, 5000, 10000, 9000, 8000]

const allMinutes = h*60+m



if (allMinutes >= timeAlarm[dayOfWeek]){
  dayOfWeek += 1
  var timeout = ((1439-allMinutes)*60 + timeAlarm[dayOfWeek] + 60-s);// 1439 это все минуты в 23 часах +59 минут
}else
  var timeout = ((timeAlarm[dayOfWeek] - allMinutes-1)*60 + 60-s);  

console.log(timeout)
// пн
setTimeout(() => {
  bot.sendMessage(1825527066, reminders[Math.floor(Math.random() * reminders.length)])
  setInterval(() =>
    bot.sendMessage(1825527066, reminders[Math.floor(Math.random() * reminders.length)])
  , 604800000) // 604800 секунд в неделе
  
  //вт
  setTimeout(() => {
    bot.sendMessage(1825527066, reminders[Math.floor(Math.random() * reminders.length)])
    setInterval(() =>
      bot.sendMessage(1825527066, reminders[Math.floor(Math.random() * reminders.length)])
    , 604800000) // 604800 секунд в неделе
  
    //ср
    dayOfWeek += 1
   
    setTimeout(() => {
      bot.sendMessage(1825527066, reminders[Math.floor(Math.random() * reminders.length)])
      setInterval(() =>
        bot.sendMessage(1825527066, reminders[Math.floor(Math.random() * reminders.length)])
      , 604800000) // 604800 секунд в неделе
  

      // чт
      dayOfWeek += 1
      
      setTimeout(() => {
        bot.sendMessage(1825527066, reminders[Math.floor(Math.random() * reminders.length)])
        setInterval(() =>
          bot.sendMessage(1825527066, reminders[Math.floor(Math.random() * reminders.length)])
        , 604800000) // 604800 секунд в неделе
  
        // пт
        dayOfWeek += 1
        
        setTimeout(() => {
          bot.sendMessage(1825527066, reminders[Math.floor(Math.random() * reminders.length)])
          setInterval(() =>
            bot.sendMessage(1825527066, reminders[Math.floor(Math.random() * reminders.length)])
          , 604800000) // 604800 секунд в неделе
  
          //сб
          dayOfWeek += 1
          
          setTimeout(() => {
            bot.sendMessage(1825527066, reminders[Math.floor(Math.random() * reminders.length)])
            setInterval(() =>
              bot.sendMessage(1825527066, reminders[Math.floor(Math.random() * reminders.length)])
            , 604800000) // 604800 секунд в неделе
  
  
            dayOfWeek += 1
  
          }, diffAlarm[dayOfWeek]);

        }, diffAlarm[dayOfWeek]);

      }, diffAlarm[dayOfWeek]);

    }, diffAlarm[dayOfWeek]);

  }, diffAlarm[dayOfWeek]);
  
}, timeout*1000);




