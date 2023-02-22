'use strict';

const { user } = require('../models/index.js');

module.exports = async (req, res, next) => {

  try {

    if (!req.headers.authorization)next(new Error('Invalid Login'));

    const token = req.headers.authorization.split(' ').pop();
    const validUser = await user.authenticateWithToken(token);

    req.user = validUser;
    req.token = validUser.token;

  } catch (e) {
    console.error(e);
    res.status(403).send('Invalid Login');
  }
}
