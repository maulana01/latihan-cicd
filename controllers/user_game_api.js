/** @format */

const { user_game } = require('../models');
// const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
// require('dotenv').config();

module.exports = {
  apiUserGameGet: (req, res) => {
    user_game
      .findAll()
      .then((result) => {
        if (result.length > 0) {
          res.status(200).json({ result });
        } else {
          res.status(404).json({ message: 'User Game Tidak di temukan', result });
        }
      })
      .catch((err) => {
        res.status(500).json({ err: err.message });
      });
  },
  apiUserGameGetId: (req, res) => {
    user_game
      .findOne({
        where: {
          id: req.params.id,
        },
      })
      .then((result) => {
        if (result) {
          res.status(200).json({ result });
        } else {
          res.status(404).json({ message: 'User Game dengan ID ' + req.params.id + ' Tidak di temukan', result });
        }
      })
      .catch((err) => {
        res.status(500).json({ err: err.message });
      });
  },
  apiUserGameCreate: async (req, res) => {
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

      res.status(200).json({ result: user });
    } catch (error) {
      res.status(500).json({ err: error.message });
    }
  },
  apiUserGameUpdate: async (req, res) => {
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
          res.status(200).json({ result });
        }
      })
      .catch((err) => {
        res.status(500).json({ err: err.message });
      });
  },
  apiUserGameDelete: (req, res) => {
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
          res.status(200).json({ result });
        }
      })
      .catch((err) => {
        res.status(500).json({ err: err.message });
      });
  },
};
