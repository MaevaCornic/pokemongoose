const Pokemon = require('../models/pokemon');

const pokemonController = {

  homePage: async (req, res) => {
    try {
      const allPokemons = await Pokemon.find();

      res.render('list', {
        pageTitle: 'Accueil',
        pokemonList: allPokemons
      });

    } catch (error) {
      console.error(error);
      res.status(500).send(error.message);
    }
  },

  detailsPage: async (req, res, next) => {
    try {
      const targetId = req.params.id;
      const targetPokemon = await Pokemon.findOne({
        id: targetId
      });

      if (targetPokemon) {
        res.render('details', {
          pageTitle: `Détails de ${targetPokemon.name}`,
          pokemon: targetPokemon
        });
      } else {
        // pokemon pas trouvé => 404 !
        next();
      }

    } catch (error) {
      console.error(error);
      res.status(500).send(error.message);
    }
  },

  fightPage: async (req, res, next) => {
    try {
      const pokemon = await Pokemon.findOne({ id: req.params.id });
      if (! pokemon) { return next(); }

      // const { weakerPokemons, strongerPokemons } = await fetchFightingPokemons(pokemon); // Solution 1
      const { weakerPokemons, strongerPokemons } = await fetchFightingPokemonsVersion2(pokemon); // Solution 2

      res.render('fight', {
        pageTitle: `Combattre avec ${pokemon.name}`,
        pokemon,
        weakerPokemons,
        strongerPokemons
      });

    } catch (error) {
      console.error(error);
      res.status(500).send(error.message);
    }

    async function fetchFightingPokemons(pokemon) {
      const weakerPokemons = await Pokemon.find({ weaknesses: { $in: pokemon.type } }, { name: 1 });
      const strongerPokemons = await Pokemon.find({ type: { $in: pokemon.weaknesses } }, { name: 1 });
      return { weakerPokemons, strongerPokemons };
    }

    async function fetchFightingPokemonsVersion2(pokemon) {
      const fightingRules = {
        'Fighting': { weakerTypes: ['Ice', 'Normal'], strongerTypes: ['Bug', 'Poison'] },
        'Dragon': { weakerTypes: ['Dragon'], strongerTypes: [] },
        'Water': { weakerTypes: ['Fire', 'Rock'], strongerTypes: ['Dragon', 'Water'] },
        'Electric': { weakerTypes: ['Water', 'Flying'], strongerTypes: ['Dragon', 'Electric'] },
        'Fire': { weakerTypes: ['Ice', 'Bug'], strongerTypes: ['Dragon', 'Water'] },
        'Ice': { weakerTypes: ['Dragon', 'Grass'], strongerTypes: ['Water', 'Fire'] },
        'Bug': { weakerTypes: ['Grass', 'Psychic'], strongerTypes: ['Fighting', 'Fire'] },
        'Normal': { weakerTypes: [], strongerTypes: ['Rock', 'Ghost'] },
        'Grass': { weakerTypes: ['Water', 'Rock'], strongerTypes: ['Dragon', 'Fire'] },
        'Poison': { weakerTypes: ['Grass'], strongerTypes: ['Ground', 'Rock'] },
        'Psychic': { weakerTypes: ['Fighting', 'Poison'], strongerTypes: ['Psychic'] },
        'Rock': { weakerTypes: ['Fire', 'Ice'], strongerTypes: ['Fighting', 'Ground'] },
        'Ground': { weakerTypes: ['Electric', 'Fire'], strongerTypes: ['Bug', 'Grass'] },
        'Ghost': { weakerTypes: ['Psychic', 'Ghost'], strongerTypes: ['Normal'] },
        'Flying': { weakerTypes: ['Fighting', 'Bug'], strongerTypes: ['Electric', 'Rock'] },
      };

      const weakerTypes = pokemon.type.map(type => fightingRules[type].weakerTypes).flat();
      const strongerTypes = pokemon.type.map(type => fightingRules[type].strongerTypes).flat();
      const [weakerPokemons, strongerPokemons] = await Promise.all([ // Promise.all pour gagner quelques nano secondes ici, mais pourquoi pas dans un bonus :)
        Pokemon.find({ type: { $in: weakerTypes } }, { name: 1 }),
        Pokemon.find({ type: { $in: strongerTypes } }, { name: 1 })
      ]);
      return { weakerPokemons, strongerPokemons };
    }
  }
};


module.exports = pokemonController;
