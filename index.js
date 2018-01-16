require('dotenv').config()

const Discord = require('discord.js');
const Commander = require('./commander.js');
const client = new Discord.Client();
const commands = new Commander(client)
const Item = require('./item.js')
const Mob = require('./mob.js')
const Map = require('./map.js')
const Skill = require('./skill.js')

client.on('ready', () => {
  console.log('I am ready!');
  client.user.setGame('Digite !ragnaplace')
});

// Database
commands.register('item', (input, message) => new Item(input, message).answer())
commands.register('mob', (input, message) => new Mob(input, message).answer())
commands.register('map', (input, message) => new Map(input, message).answer())
commands.register('skill', (input, message) => new Skill(input, message).answer())

// Help
const help = (input, message) => {
  message.channel.send("", {
    "embed": {
        color: 0x2e4089,
        title: "Ajuda do RagnaPlace",
        url: "https://ragnaplace.com",
        description: "Estes são os comandos disponíveis para busca no RagnaPlace.",
        fields: [
          {
              name: "Pesquisa por Monstros",
              value: "!mob <nome ou ID do monstro>"
          },
          {
              name: "Pesquisa por Itens",
              value: "!item <nome ou ID do item>"
          },
          {
              name: "Pesquisa por Mapas",
              value: "!map <nome ou warp do mapa>"
          },
          {
              name: "Pesquisa por Habilidades",
              value: "!skill <nome da habilidade>"
          },
        ]
    }
  });
}

commands.register('ragnaplace', help)
commands.register('database', help)

client.login(process.env.BOT_TOKEN);
