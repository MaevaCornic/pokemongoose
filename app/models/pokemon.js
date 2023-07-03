// on ne require pas le module mongoose, on require l'instance déjà connectée !
const { Schema, model } = require('../database');

// on commence par définir un schéma : c'est le format de données
// c'est ce qui nous permet de s'assurer une certaine cohérence entre tous les documents

const pokemonSchema = new Schema({
  id: Number, // id est un nombre
  num: String, // num est une chaine de caractères
  name: String, // name est une chaine de caractères
  img: String,
  type: [String], // type est un tableau de String
  height: String,
  weight: String,
  prev_evolution: [ {name: String, num: String} ],
  next_evolution: [ {name: String, num: String} ],
  weaknesses: [String]
});


// on crée le model à partir de:
// - un nom, arbitraire
// - un schéma
// - le nom de la collection
const Pokemon = model('Pokemon', pokemonSchema, 'pokedex');

// il nous reste à exporter le model
module.exports = Pokemon;
