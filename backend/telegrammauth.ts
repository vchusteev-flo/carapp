import { parse, validate, type InitData } from '@telegram-apps/init-data-node';
import 'dotenv/config';
import express, {
  type ErrorRequestHandler,
  type RequestHandler,
  type Response,
} from 'express';
import { Markup, Telegraf } from 'telegraf'; // для отправки файлов по URL 
const webAppUrl = process.env.DEV_WEB_APP_URL || '';

/**
 * Sets init data in the specified Response object.
 * @param res - Response object.
 * @param initData - init data.
 */
function setInitData(res: Response, initData: InitData): void {
  res.locals.initData = initData;
}

/**
 * Extracts init data from the Response object.
 * @param res - Response object.
 * @returns Init data stored in the Response object. Can return undefined in case,
 * the client is not authorized.
 */
function getInitData(res: Response): InitData | undefined {
  return res.locals.initData;
}

/**
 * Middleware which authorizes the external client.
 * @param req - Request object.
 * @param res - Response object.
 * @param next - function to call the next middleware.
 */
const authMiddleware: RequestHandler = (req: express.Request, res: express.Response, next: any) => {
  // We expect passing init data in the Authorization header in the following format:
  // <auth-type> <auth-data>
  // <auth-type> must be "tma", and <auth-data> is Telegram Mini Apps init data.
  const [authType, authData = ''] = (req.header('authorization') || '').split(' ');

  switch (authType) {
    case 'tma':
      try {
        // Validate init data.
        validate(authData, token, {
          // We consider init data sign valid for 1 hour from their creation moment.
          expiresIn: 3600,
        });

        // Parse init data. We will surely need it in the future.
        setInitData(res, parse(authData));
        return next();
      } catch (e) {
        return next(e);
      }
    // ... other authorization methods.
    default:
      return next(new Error('Unauthorized'));
  }
};

/**
 * Middleware which shows the user init data.
 * @param _req
 * @param res - Response object.
 * @param next - function to call the next middleware.
 */
const showInitDataMiddleware: RequestHandler = (_req, res, next) => {
  const initData = getInitData(res);
  if (!initData) {
    return next(new Error('Cant display init data as long as it was not found'));
  }
  res.json(initData);
};

/**
 * Middleware which displays the user init data.
 * @param err - handled error.
 * @param _req
 * @param res - Response object.
 */
const defaultErrorMiddleware: ErrorRequestHandler = (err, _req, res) => {
  res.status(500).json({
    error: err.message,
  });
};

// Your secret bot token.
const token = process.env.DEV_TELEGRAM_BOT_TOKEN || '';

// Create an Express applet and start listening to port 3000.
const app = express();

app.use(authMiddleware);
app.get('/', showInitDataMiddleware);
app.use(defaultErrorMiddleware);



const bot = new Telegraf(token)

let usersData = {};

bot.start((ctx: any) => {
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
	
	const getContactBtn = Markup.button.contactRequest('Запрос пользователя', true)
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
bot.launch()

app.listen(3300);

// After the HTTP server was launched, try sending an HTTP GET request to the URL 
// http://localhost:3000/ with an Authorization header containing data in the required format.