/** @format */

const router = require('express').Router();
const passport = require('passport');

const { apiUserGameGet, apiUserGameGetId, apiUserGameCreate, apiUserGameUpdate, apiUserGameDelete } = require('../controllers/user_game_api');
const {
  apiUserGameBiodataGet,
  apiUserGameBiodataGetId,
  apiUserGameBiodataCreate,
  apiUserGameBiodataUpdate,
  apiUserGameBiodataDelete,
} = require('../controllers/user_game_biodata_api');
const {
  viewsUserGameBiodataGet,
  viewsUserGameBiodataCreateForm,
  viewsUserGameBiodataGetId,
  viewsUserGameBiodataCreate,
  viewsUserGameBiodataUpdate,
  viewsUserGameBiodataDelete,
} = require('../controllers/user_game_biodata_views');
const {
  apiUserGameHistoryGet,
  apiUserGameHistoryGetId,
  apiUserGameHistoryCreate,
  apiUserGameHistoryUpdate,
  apiUserGameHistoryDelete,
} = require('../controllers/user_game_history_api');
const {
  viewsUserGameHistoryGet,
  viewsUserGameHistoryCreateForm,
  viewsUserGameHistoryGetId,
  viewsUserGameHistoryCreate,
  viewsUserGameHistoryUpdate,
  viewsUserGameHistoryDelete,
} = require('../controllers/user_game_history_views');
const {
  viewsUserGameGet,
  viewsUserGameGetId,
  viewsUserGameCreate,
  viewsUserGameUpdate,
  viewsUserGameDelete,
  viewsUserGameCreateForm,
} = require('../controllers/user_game_views');

const { viewsRegisterForm, viewsRegister } = require('../controllers/register');

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  res.redirect('/login');
}

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect('/view/usergames');
  }
  next();
}

router.get('/api/usergames', apiUserGameGet);
router.get('/api/usergames/:id', apiUserGameGetId);
router.post('/api/usergames', apiUserGameCreate);
router.put('/api/usergames/:id', apiUserGameUpdate);
router.delete('/api/usergames/:id', apiUserGameDelete);

router.get('/api/usergamesbiodata', apiUserGameBiodataGet);
router.get('/api/usergamesbiodata/:id', apiUserGameBiodataGetId);
router.post('/api/usergamesbiodata', apiUserGameBiodataCreate);
router.put('/api/usergamesbiodata/:id', apiUserGameBiodataUpdate);
router.delete('/api/usergamesbiodata/:id', apiUserGameBiodataDelete);

router.get('/api/usergameshistory', apiUserGameHistoryGet);
router.get('/api/usergameshistory/:id', apiUserGameHistoryGetId);
router.post('/api/usergameshistory', apiUserGameHistoryCreate);
router.put('/api/usergameshistory/:id', apiUserGameHistoryUpdate);
router.delete('/api/usergameshistory/:id', apiUserGameHistoryDelete);

router.get('/view/usergames', checkAuthenticated, viewsUserGameGet);
router.get('/view/usergames/create', checkAuthenticated, viewsUserGameCreateForm);
router.get('/view/usergames/edit/:id', checkAuthenticated, viewsUserGameGetId);
router.post('/view/usergames', checkAuthenticated, viewsUserGameCreate);
router.post('/view/usergames/:id', checkAuthenticated, viewsUserGameUpdate);
router.get('/view/usergames/delete/:id', checkAuthenticated, viewsUserGameDelete);

router.get('/view/usergamesbiodata', checkAuthenticated, viewsUserGameBiodataGet);
router.get('/view/usergamesbiodata/create', checkAuthenticated, viewsUserGameBiodataCreateForm);
router.get('/view/usergamesbiodata/edit/:id', checkAuthenticated, viewsUserGameBiodataGetId);
router.post('/view/usergamesbiodata', checkAuthenticated, viewsUserGameBiodataCreate);
router.post('/view/usergamesbiodata/:id', checkAuthenticated, viewsUserGameBiodataUpdate);
router.get('/view/usergamesbiodata/delete/:id', checkAuthenticated, viewsUserGameBiodataDelete);

router.get('/view/usergameshistory', checkAuthenticated, viewsUserGameHistoryGet);
router.get('/view/usergameshistory/create', checkAuthenticated, viewsUserGameHistoryCreateForm);
router.get('/view/usergameshistory/edit/:id', checkAuthenticated, viewsUserGameHistoryGetId);
router.post('/view/usergameshistory', checkAuthenticated, viewsUserGameHistoryCreate);
router.post('/view/usergameshistory/:id', checkAuthenticated, viewsUserGameHistoryUpdate);
router.get('/view/usergameshistory/delete/:id', checkAuthenticated, viewsUserGameHistoryDelete);

router.get('/register', checkNotAuthenticated, viewsRegisterForm);
router.post('/register', checkNotAuthenticated, viewsRegister);

router.get('/login', checkNotAuthenticated, (req, res) => {
  res.render('login');
});

router.post(
  '/login',
  checkNotAuthenticated,
  passport.authenticate('local', {
    successRedirect: '/view/usergames',
    failureRedirect: '/login',
    failureFlash: true,
  })
);

router.get('/', (req, res) => {
  res.redirect('/login');
});

router.get('/logout', (req, res) => {
  req.logOut();
  res.redirect('/login');
});

router.all('*', (req, res) => {
  res.redirect('/login');
});

module.exports = router;
