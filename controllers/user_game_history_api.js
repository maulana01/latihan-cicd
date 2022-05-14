/** @format */

const { user_game_history } = require('../models');

module.exports = {
  apiUserGameHistoryGet: (req, res) => {
    user_game_history
      .findAll()
      .then((result) => {
        if (result.length > 0) {
          res.status(200).json({ result });
        } else {
          res.status(404).json({ message: 'User Game History Tidak di temukan', result });
        }
      })
      .catch((err) => {
        res.status(500).json({ err: err.message });
      });
  },
  apiUserGameHistoryGetId: (req, res) => {
    user_game_history
      .findOne({
        where: {
          id: req.params.id,
        },
      })
      .then((result) => {
        if (result.length > 0) {
          res.status(200).json({ result });
        } else {
          res.status(404).json({ message: 'User Game History dengan ID ' + req.params.id + ' Tidak di temukan', result });
        }
      })
      .catch((err) => {
        res.status(500).json({ err: err.message });
      });
  },
  apiUserGameHistoryCreate: (req, res) => {
    user_game_history
      .create({
        id_user: req.body.id_user,
        skor: req.body.skor,
        waktu_login: req.body.waktu_login,
      })
      .then((result) => {
        res.status(200).json({ result });
      })
      .catch((err) => {
        res.status(500).json({ err: err.message });
      });
  },
  apiUserGameHistoryUpdate: (req, res) => {
    user_game_history
      .update(
        {
          skor: req.body.skor,
          waktu_login: req.body.waktu_login,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      )
      .then((result) => {
        if (result) {
          res.status(200).json({ result });
        } else {
          res.status(404).json({ message: 'User Game History dengan ID User ' + req.params.id + ' Tidak di temukan', result });
        }
      })
      .catch((err) => {
        res.status(500).json({ err: err.message });
      });
  },
  apiUserGameHistoryDelete: (req, res) => {
    user_game_history
      .destroy({
        where: {
          id: req.params.id,
        },
      })
      .then((result) => {
        if (result) {
          res.status(200).json({ result });
        } else {
          res.status(404).json({ message: 'User Game History dengan ID History ' + req.params.id + ' Tidak di temukan', result });
        }
      })
      .catch((err) => {
        res.status(500).json({ err: err.message });
      });
  },
};
