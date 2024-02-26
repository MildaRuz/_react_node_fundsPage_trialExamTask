const { jwtSecret } = require('../config');
const jwt = require('jsonwebtoken');
const { makeSqlQuery } = require('../helpers');

function getUserFromToken(token) {
  try {
    jwt.verify(token, jwtSecret);
    const tokenData = jwt.decode(token);
    return tokenData.user;
  } catch (error) {
    console.log(error);
    throw new Error('Token Invalid', 401, error);
  }
}

module.exports = {
  getAll: async (req, res, next) => {
    const token = req.header('Authorization');

    const user = token ? getUserFromToken(token) : undefined;

    const sql = `SELECT * FROM collect_funds ${user?.scope === 'admin' ? '' : 'WHERE admin_confirmation=1'}`;

    const [itemsArr, error] = await makeSqlQuery(sql);

    if (error) {
      console.log('getAll items error ===');
      return next(error);
    }

    res.json(itemsArr);
  },

  getSingle: async (req, res, next) => {
    const { idea_id } = req.params;

    const sql = 'SELECT * FROM `collect_funds` WHERE idea_id=?';

    const [itemsArr, error] = await makeSqlQuery(sql, [idea_id]);

    if (error) {
      console.log('getAll items error ===');
      return next(error);
    }

    if (itemsArr.length === 0) {
      return next(('Post was not found', error));
    }

    res.json(itemsArr[0]);
  },

  create: async (req, res, next) => {
    const { author_name, idea_name, description, rise_funds, img_url } = req.body;

    const argArr = [author_name, idea_name, description, rise_funds, img_url];
    const sql = `INSERT INTO collect_funds (author_name, idea_name, description, rise_funds, img_url, admin_confirmation) 
    VALUES (?,?,?,?,?, false)`;

    const [resObj, error] = await makeSqlQuery(sql, argArr);

    if (error) {
      console.log(' create item error ===', error);
      return next(error);
    }

    if (resObj.affectedRows !== 1) {
      console.log('create item no rows affected', resObj);
      return next('something went wrong in creating item', error);
    }

    res.status(201).json({
      id: resObj.idea_id,
      msg: 'success',
    });
  },

  createDonation: async (req, res, next) => {
    const { idea_id } = req.params;

    const { name, donated_sum } = req.body;

    const argArr = [name, donated_sum, idea_id];
    const sql = `INSERT INTO donated (name, donated_sum, idea_id) 
    VALUES (?,?,?)`;

    const [resObj, error] = await makeSqlQuery(sql, argArr);

    if (error) {
      console.log(' donate error ===', error);
      return next(error);
    }

    if (resObj.affectedRows !== 1) {
      console.log('donation no rows affected', resObj);
      return next('something went wrong in creating donation', error);
    }

    res.status(201).json({
      id: resObj.idea_id,
      msg: `Successfuly donated`,
    });
  },

  update: async (req, res, next) => {
    const { idea_id } = req.params;

    const { author_name, idea_name, description, rise_funds, img_url, admin_confirmation } = req.body;

    const sql =
      'UPDATE `collect_funds` SET `author_name`=?, `idea_name`=?, `description`=?, `rise_funds`=?, `img_url` = ?, `admin_confirmation`=? WHERE `idea_id`= ?';

    const [responseObject, error] = await makeSqlQuery(sql, [
      author_name,
      idea_name,
      description,
      rise_funds,
      img_url,
      admin_confirmation,
      idea_id,
    ]);

    if (error) {
      return next(error);
    }

    if (responseObject.affectedRows !== 1) {
      return next('Something wrong with fund edit', error);
    }

    if (admin_confirmation === 1) {
      return res.json({ message: 'Fund allready confirmed' });
    }

    res.status(200).json({
      id: idea_id,
      message: `Item with id: ${idea_id} updated successfully`,
    });
  },

  delete: async (req, res, next) => {
    const { idea_id } = req.params;

    const sql = 'DELETE FROM `collect_funds` WHERE idea_id=? LIMIT 1';

    const [resObj, error] = await makeSqlQuery(sql, [idea_id]);
    console.log('resObj ===', resObj);
    if (error) {
      console.log(' delete item error ===', error);
      return next(error);
    }

    if (resObj.affectedRows !== 1) {
      console.log('delete item no rows affected', resObj);
      return next('something went wrong', error);
    }

    res.status(200).json({
      msg: 'success',
    });
  },
};
