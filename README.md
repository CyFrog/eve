# eve
About ExoBot This bot powered with Telegraf library.
This telegram bot will tip and swap SLP Tokens. Add @AtomicTokenBot to your group To tip, reply to or @user with "@user tip [slp] #" (e.g. "@tommy tip honk 1000") Deposit and withdraw tokens using SLP aware wallet such as Badger, Crescent, Bitcoin.com SLP or ElectronCash SLP Setup notification for deposits with a separate service ExDeposits

Supported commands: /start /help /balance /deposit /withdraw
Installation and local launch
Clone this repo: git clone https://github.com/clashicism/ExoBot
Create AWS DynamoDB tables: - Session (primary key: key [string]) - Deposit (primary key: addresses [string])
AWS configure
Create .env file with the environment variables listed in .env.example
Install NodeJS 10x && npm 6x
Run in the root folder npm install
Run a local instance of RabbitMQ sudo docker run -p 5672:5672 -d --hostname my-rabbit --name some-rabbit rabbitmq:3
Run npm start
Creator: pytour
