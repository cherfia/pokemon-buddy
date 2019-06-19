import axios from 'axios'
export async function setPokemon({ commit }, id) {
  const pokemon = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
  const species = await axios.get(
    `https://pokeapi.co/api/v2/pokemon-species/${id}`
  )
  var sprite
  switch (true) {
    case id < 10:
      sprite = `https://db.pokemongohub.net/images/official/full/00${id}.png`
      break
    case id < 100:
      sprite = `https://db.pokemongohub.net/images/official/full/0${id}.png`
      break
    default:
      sprite = `https://db.pokemongohub.net/images/official/full/${id}.png`
      break
  }
  const description = species.data.flavor_text_entries.find(desc => {
    return desc.language.name === 'en'
  })
  const family = species.data.genera.find(genus => {
    return genus.language.name === 'en'
  })
  pokemon.data.family = family.genus
  pokemon.data.description = description.flavor_text.replace(/\r?\n|\r/g, ' ')
  pokemon.data.artwork = sprite

  commit('SET_POKEMON', pokemon.data)
}
