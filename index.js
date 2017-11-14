require('dotenv').config()

const Discord = require('discord.js');
const Commander = require('./commander.js');
const client = new Discord.Client();
const commands = new Commander(client)
const Item = require('./item.js')
const Mob = require('./mob.js')
const Map = require('./map.js')

client.on('ready', () => {
  console.log('I am ready!');
});

// Database
commands.register('item', (input, message) => new Item(input, message).answer())
commands.register('mob', (input, message) => new Mob(input, message).answer())
commands.register('map', (input, message) => new Map(input, message).answer())

// Help
const help = (input, message) => {
  let response = "os comandos disponíveis para busca no RagnaPlace são:\n"
  response += "!item <nome_do_item> \n"
  response += "!mob <nome_do_monstro> \n"
  response += "!map <nome_do_mapa> \n"

  message.reply(response)
}
commands.register('ragnaplace', help)
commands.register('database', help)

client.login(process.env.BOT_TOKEN);
