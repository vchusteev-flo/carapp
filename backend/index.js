const { Telegraf, Input, Markup } = require('telegraf'); // для отправки файлов по URL 
require("dotenv").config();
const cors = require('cors'); // Import cors
const express = require("express");

const PORT = 4000;
const token = process.env.TELEGRAM_BOT_TOKEN;
const webAppUrl = process.env.WEB_APP_URL;

const app = express();
app.use(cors());
app.use(express.json());

const bot = new Telegraf(token)

let usersData = {};

bot.start((ctx) => {
	const userId = ctx.from.id;
  const firstName = ctx.from.first_name;
  const lastName = ctx.from.last_name;
  const username = ctx.from.username;
	
	console.log('start')
	console.log(ctx, 'ctx')
  console.log(`User ID: ${userId}`);
  console.log(`First Name: ${firstName}`);
  console.log(`Last Name: ${lastName}`);
  console.log(`Username: ${username}`);
	console.log(`WebAppUrl: ${webAppUrl}`)
	
  usersData[userId] = { firstName, lastName, username };

	const getContactBtn = Markup.button.contactRequest('Запрос пользователя', 1)
  ctx.reply(
    'Добро пожаловать! Нажмите на кнопку ниже, чтобы запустить приложение',
    Markup.keyboard([
      Markup.button.webApp('Data Pulse App', webAppUrl),
    ])
  )

	// Добавляем кнопку для перехода на нужную страницу
	ctx.reply(
		"Launch mini app from inline keyboard!",
		Markup.inlineKeyboard([Markup.button.webApp("Launch", webAppUrl)]),
	)

	// Передача данных в веб-приложение
// 	ctx.reply(
// 		"Launch mini app from keyboard!",
// 		Markup.keyboard([Markup.button.webApp("Launch", webAppUrl)]),
// 	)
})

bot.command("setmenu", ctx =>
// 	// sets Web App as the menu button for current chat
	ctx.setChatMenuButton({
		text: "Launch",
		type: "web_app",
		web_app: { url: webAppUrl },
	}),
);

// bot.command("keyboard", ctx =>
// 	ctx.reply(
// 		"Launch mini app from keyboard!",
// 		Markup.keyboard([Markup.button.webApp("Launch", webAppUrl)]).resize(),
// 	),
// );

bot.on('message', async (ctx) => {
	console.log('on message')
  const userId = ctx.from.id;
  const firstName = ctx.from.first_name;
  const lastName = ctx.from.last_name;
  const username = ctx.from.username;
	console.log(`User ID: ${userId}`);
	console.log(`First Name: ${firstName}`);
	console.log(`Last Name: ${lastName}`);
	console.log(`Username: ${username}`);

	console.log(ctx.update.message.web_app_data)
	// { button_text: 'Launch', data: 'hello from mini app' }
	console.log(ctx.update.message.from)  
	/* {
		id: 623646166,
		is_bot: false,
		first_name: 'Vladimir',
		username: 'Chusteev',
		language_code: 'ru'
	} */
	console.log(ctx.update.message.from.chat)
});

bot.launch()

app.use((req, res, next) => {
	console.log(req.method, req.url);
	return next();
});

app.get("/", (req, res) => {
	res.sendFile(__dirname + "/index.html");
});

// app.get("/bot/command", (req, res) => {
//   // Simulate a Telegram context object
//   const ctx = {
//     reply: (text, markup) => {
//       console.log(text,'text');
//       console.log(markup, 'markup');
//     }
//   };
// 	console.log(bot.ctx, 'bot.context')
// 	console.log(bot, 'bot')

//   // Manually call the inlinekb command handler

//   res.send('Command executed');
// });

// app.get('/user/:id', (req, res) => {
// 	console.log('/user/:id');
//   const userId = req.params.id;
// 	console.log(usersData,'users data')
//   // Поиск данных пользователя в объекте
//   const userData = usersData[userId];

//   if (userData) {
// 		console.log(userData, 'sended')
//     res.json(userData);
//   } else {
// 		console.log('User not found');
//     res.status(404).json({ error: 'User not found' });
//   }
// });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});