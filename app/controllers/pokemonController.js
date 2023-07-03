const Pokemon = require('../models/pokemon');

const pokemonController = {

  homePage: async (req, res) => {
    try {
      // TODO: récupérer tout les pokemons
      const allPokemons = [];

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
      // TODO: trouvé le pokemon avec l'id targetId
      const targetPokemon = {};

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

};


module.exports = pokemonController;
