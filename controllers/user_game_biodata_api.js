/** @format */

const { user_game_biodata } = require('../models');

module.exports = {
  apiUserGameBiodataGet: (req, res) => {
    user_game_biodata
      .findAll()
      .then((result) => {
        if (result.length > 0) {
          res.status(200).json({ result });
        } else {
          res.status(404).json({ message: 'User Game Biodata Tidak di temukan', result });
        }
      })
      .catch((err) => {
        res.status(500).json({ err: err.message });
      });
  },
  apiUserGameBiodataGetId: (req, res) => {
    user_game_biodata
      .findOne({
        where: {
          id: req.params.id,
        },
      })
      .then((result) => {
        if (result) {
          res.status(200).json({ result });
        } else {
          res.status(404).json({ message: 'User Game Biodata dengan ID ' + req.params.id + ' Tidak di temukan', result });
        }
      })
      .catch((err) => {
        res.status(500).json({ err: err.message });
      });
  },
  apiUserGameBiodataCreate: (req, res) => {
    user_game_biodata
      .create({
        nama: req.body.nama,
        alamat: req.body.alamat,
        email: req.body.email,
        ttl: req.body.ttl,
        jenis_kelamin: req.body.jenis_kelamin,
        id_user: req.body.id_user,
      })
      .then((result) => {
        res.status(200).json({ result });
      })
      .catch((err) => {
        res.status(500).json({ err: err.message });
      });
  },
  apiUserGameBiodataUpdate: (req, res) => {
    user_game_biodata
      .update(
        {
          nama: req.body.nama,
          alamat: req.body.alamat,
          email: req.body.email,
          ttl: req.body.ttl,
          jenis_kelamin: req.body.jenis_kelamin,
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
            message: 'User Game Biodata dengan ID ' + req.params.id + ' Tidak di temukan',
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
  apiUserGameBiodataDelete: (req, res) => {
    user_game_biodata
      .destroy({
        where: {
          id: req.params.id,
        },
      })
      .then((result) => {
        if (result === 0) {
          res.status(404).json({
            message: 'User Game Biodata dengan ID ' + req.params.id + ' Tidak di temukan',
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
