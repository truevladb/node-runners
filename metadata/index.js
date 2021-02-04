const express = require('express')
const path = require('path')
const moment = require('moment')
const { HOST } = require('./src/constants')
const db = require('./src/database')

const PORT = process.env.PORT || 5000

const app = express()
  .set('port', PORT)
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')

// Static public files
app.use(express.static(path.join(__dirname, 'public')))

app.get('/api/nft.json', function(req, res) {
  const data = {
    "description": "Join the resistance and fight for the decentralised tomorrow.",
    "external_link": "https://www.noderunners.io/",
    "name": "NodeRunners",
    "image": "https://pbs.twimg.com/profile_images/1316686360124764162/X37JdHCx_400x400.jpg"
}
  res.send(data)
})

app.get('/api/token/:token_id', function(req, res) {
  const tokenId = parseInt(req.params.token_id).toString()
  const person = db[tokenId]
  const data = {
    'attributes': [
      {
        "trait_type": "Strength",
        "value": person.strength,
        "max_value": 42
      },
      {
        "trait_type": "Defense",
        "value": person.defense,
        "max_value": 42
      },
      {
        "trait_type": "Rarity",
        "value": person.rarity
      },
      {
        "trait_type": "Series",
        "value": person.series
      },
      {
        "trait_type": "Sub-series",
        "value": person.sub_series
      },
      {
        "trait_type": "isFoil",
        "value": person.is_foil
      }
    ],
    'description': person.description,
    'image': `${HOST}/images/${tokenId}.png`,
    'name': person.name,
    'external_url': `https://docs.opensea.io/docs/3-viewing-your-items-on-opensea/${tokenId}`,
    'background_color': "000000"
  }
  res.send(data)
})

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
})
