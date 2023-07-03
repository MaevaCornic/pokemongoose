const Pokemon = require('../models/pokemon');

const typeController = {

  typesPage: async (req, res) => {
    try {
      // Les ennuis commencent : il faut trouver tous les types.
      // Or ils sont inclus dans les pokemons, et non dans une collection à part.
      // on pourrait aller chercher tous les pokemons, et reconstruire la liste des types à la main.
      // Mais on peut aussi utiliser la fonction "distinct", qui fait exactement la même chose !
      const typeList = await Pokemon.distinct('type');

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
      const list = await Pokemon.find({ type: targetType });

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
