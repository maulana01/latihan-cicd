/** @format */

const { user_game_biodata } = require('../models');
const moment = require('moment');

module.exports = {
  viewsUserGameBiodataGet: (req, res) => {
    user_game_biodata
      .findAll()
      .then((result) => {
        if (result.length > 0) {
          // res.status(200).json({ result });
          res.render('usergamesbiodata/index', { result, moment });
        } else {
          // res.status(404).json({ message: 'User Game Biodata Tidak di temukan', result });
          res.render('usergamesbiodata/index', { result });
        }
      })
      .catch((err) => {
        res.status(500).json({ err: err.message });
      });
  },
  viewsUserGameBiodataGetId: (req, res) => {
    user_game_biodata
      .findOne({
        where: {
          id: req.params.id,
        },
      })
      .then((result) => {
        if (result) {
          // res.status(200).json({ result });
          res.render('usergamesbiodata/edit', { result, moment });
        } else {
          res.status(404).json({ message: 'User Game Biodata dengan ID ' + req.params.id + ' Tidak di temukan', result });
        }
      })
      .catch((err) => {
        res.status(500).json({ err: err.message });
      });
  },
  viewsUserGameBiodataCreateForm: (req, res) => {
    res.render('usergamesbiodata/create');
  },
  viewsUserGameBiodataCreate: (req, res) => {
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
        // res.status(200).json({ result });
        res.redirect('/view/usergamesbiodata');
      })
      .catch((err) => {
        res.status(500).json({ err: err.message });
      });
  },
  viewsUserGameBiodataUpdate: (req, res) => {
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
          // res.status(200).json({ result });
          res.redirect('/view/usergamesbiodata');
        }
      })
      .catch((err) => {
        res.status(500).json({ err: err.message });
      });
  },
  viewsUserGameBiodataDelete: (req, res) => {
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
          // res.status(200).json({ result });
          res.redirect('/view/usergamesbiodata');
        }
      })
      .catch((err) => {
        res.status(500).json({ err: err.message });
      });
  },
};
