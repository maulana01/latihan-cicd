/** @format */

const { user_game } = require('../models');
// const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
// require('dotenv').config();

module.exports = {
  viewsUserGameGet: (req, res) => {
    user_game
      .findAll()
      .then((result) => {
        if (result.length > 0) {
          // res.status(200).json({ result });
          res.render('usergames/index', { result });
        } else {
          // res.status(404).json({ message: 'User Game Tidak di temukan', result });
          res.render('usergames/index', { result });
        }
      })
      .catch((err) => {
        res.status(500).json({ err: err.message });
      });
  },
  viewsUserGameGetId: (req, res) => {
    user_game
      .findOne({
        where: {
          id: req.params.id,
        },
      })
      .then((result) => {
        if (result) {
          // res.status(200).json({ result });
          res.render('usergames/edit', { result });
        } else {
          res.status(404).json({ message: 'User Game dengan ID ' + req.params.id + ' Tidak di temukan', result });
        }
      })
      .catch((err) => {
        res.status(500).json({ err: err.message });
      });
  },
  viewsUserGameCreateForm: (req, res) => {
    res.render('usergames/create');
  },
  viewsUserGameCreate: async (req, res) => {
    try {
      const { username, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await user_game.create({
        username,
        password: hashedPassword,
      });
      // const token = jwt.sign({ id: user.id }, process.env.TOKEN_KEY, {
      //   expiresIn: '15m',
      // });
      // user.token = token;

      // res.status(200).json({ result: user });
      res.redirect('/view/usergames');
    } catch (error) {
      res.status(500).json({ err: error.message });
    }
  },
  viewsUserGameUpdate: async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    user_game
      .update(
        {
          username: username,
          password: hashedPassword,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      )
      .then((result) => {
        if (result[0] === 0) {
          res.status(404).json({
            message: 'User Game dengan ID ' + req.params.id + ' Tidak di temukan',
            result,
          });
        } else {
          // res.status(200).json({ result });
          res.redirect('/view/usergames');
        }
      })
      .catch((err) => {
        res.status(500).json({ err: err.message });
      });
  },
  viewsUserGameDelete: (req, res) => {
    user_game
      .destroy({
        where: {
          id: req.params.id,
        },
      })
      .then((result) => {
        if (result === 0) {
          res.status(404).json({
            message: 'User Game dengan ID ' + req.params.id + ' Tidak di temukan',
            result,
          });
        } else {
          // res.status(200).json({ result });
          res.redirect('/view/usergames');
        }
      })
      .catch((err) => {
        res.status(500).json({ err: err.message });
      });
  },
};
