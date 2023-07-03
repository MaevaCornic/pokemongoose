# Pokémongoose - Exercice de base 

## Vérifier que MongoDB tourne en local

- Lancer `mongo` dans un terminal. Si la main passe à l'interface Mongo, on est bon ! 
- Sinon : `sudo service mongod start`

## Restaurer les données

Ignorer cette étape si déjà fait en cockpit

- Importer les données du Pokédex
  - Depuis le dossier racine de ce repo : `mongorestore -d pokemon data/`
- Renommer la collection `samples_pokemon` en `pokedex`
  - `db.samples_pokemon.renameCollection("pokedex")`

## Setup l'application

- Oh, un `package.json`, c'est un projet Node (`npm`) ! Qu'est ce qu'on fait ? 
- Oh, un fichier `.env.example` sauvage apparait dans le repo. Qu'est-ce que ça peut bien vouloir dire !? 

## Lancer l'application

- On regarde ce qu'on peut bien trouver de pratique dans le `package.json` pour lancer notre app ! 

-----

# Exercice

Compléter les textes à trou ! 
- Définir le modèle Mongoose (`/models/pokemon.js`)
- Compéter les controlleurs des routes `/pokemon` (`/controllers/pokemonController`)
- Compéter les controlleurs des routes `/type` (`/controllers/typeController`)
