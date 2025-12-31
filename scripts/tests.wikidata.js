const fetch = require('node-fetch')

const fs = require('fs')
const { wdk } = require('@larsgw/wikibase-sdk/commonjs/wikidata.org')
const response = require('../packages/plugin-wikidata/lib/response.js')

const items = [
  'Q21972834',
  'Q27795847',
  'Q1',
  'Q23571040',
  'Q7878315',
  'Q50237325',
  'Q43361',
  'Q63862629',
  'Q7017193',
  'Q61642258',
  'Q51615345',
  'Q124174815',

  // ImageJ
  'Q1659584',
  'Q390551',

  // Review article
  'Q28078908',
  'Q56536869',
  'Q38801956',
  'Q27724394',
  'Q7318358',
  'Q2662845',
  'Q12024',
  'Q10876',
  'Q260335',
  'Q1933995',
  'Q1197786'
]

async function getItems (ids) {
  return {
    entities: Object.assign(...await Promise.all(wdk
      .getManyEntities({ ids })
      .map(url => fetch(url)
        .then(res => res.json())
        .then(res => res.entities)
      )
    ))
  }
}

getItems(items)
  .then(({ entities }) => response.fillCacheAsync(entities))
  .then(results => getItems(Object.keys(results)))
  .then(entities => JSON.stringify(entities, null, 2))
  .then(result => fs.writeFileSync('test/data/api/wikidata.json', result))
