const Pokemon = require('../models/pokemon');

const typeController = {

  typesPage: async (req, res) => {
    try {
      // TODO: récupérer la liste des types
      const typeList = [];

      res.render('type', {
        pageTitle: 'Liste des types',
        typeList
      });

    } catch (error) {
      console.error(error);
      res.status(500).send(error.message);
    }
  },

  pokemonByType: async (req, res) => {
    try {
      const targetType = req.params.type;
      // TODO: récupérer tout les pokémons ayant le type targetType
      const list = [];

      res.render('list', {
        pageTitle: `Pokemon du type ${targetType}`,
        pokemonList: list
      });

    } catch (error) {
      console.error(error);
      res.status(500).send(error.message);
    }
  }

};

module.exports = typeController;
