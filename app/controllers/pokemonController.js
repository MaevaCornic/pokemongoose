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

};


module.exports = pokemonController;
