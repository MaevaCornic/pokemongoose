# Pokedex + MongoDB

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

----


# Et keskejdoua faire ? 

## Etape 0 - Lire et comprendre le code

- Jette un oeil à :
  - la connexion BDD
  - le modèle des `Pokemon`
  - les routes de l'app
  - les controlleurs associés à ces routes

## Etape 1 - Modifier la page d'un Pokémon

- Sur la page d'un Pokémon, afficher :
  - le nom de ces _précédentes évolutions_ s'il s'agit d'un Pokémon évolué
    - cliquer sur un nom redirige sur la page du Pokémon en question
  - le nom des _futures évolutions_, s'il en possède
    - cliquer sur un nom redirige sur la page du Pokémon en question

## Page de Fighting d'un Pokémon

- Créer une page `/pokemon/:id/fight`, où l'on voit figurer :
  - En haut, le Pokémon et ses types.
  - A gauche, le nom des Pokémons contre lequel il possède un avantage de type
  - A droite, le nom des Pokémons contre lequel il possède un désavantage de type

- Le CSS de la page n'a pas d'importance, ce qui compte c'est la logique pour parvenir à afficher les données ! Bonne chance ! 


- Rappel, la grille des avantages/désavantages de type (simplifiée) :


| Type | Fort contre | Faible contre |
| -- | -- | -- |
| Fighting | Ice, Normal | Bug, Poison |
| Dragon | Dragon | - |
| Water | Fire, Rock | Dragon, Water |
| Electric | Water, Flying | Dragon, Electric |
| Fire | Ice, Bug | Dragon, Water |
| Ice | Dragon, Grass | Water, Fire |
| Bug | Grass, Psychic | Fighting, Fire |
| Normal | - | Rock, Ghost |
| Grass | Water, Rock | Dragon, Fire |
| Poison | Grass | Ground, Rock |
| Psychic | Fighting, Poison | Psychic |
| Rock | Fire, Ice | Fighting, Ground |
| Ground | Electric, Fire | Bug, Grass |
| Ghost | Psychic, Ghost | Normal |
| Flying | Fighting, Bug | Electric, Rock |
