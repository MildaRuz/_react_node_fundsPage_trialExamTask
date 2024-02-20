const { makeSqlQuery } = require('../helpers');

module.exports = {
  getAll: async (req, res, next) => {
    const sql = 'SELECT * FROM `collect_funds`';

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
    const sql = `INSERT INTO collect_funds (author_name, idea_name, description, rise_funds, img_url) 
    VALUES (?,?,?,?,?)`;

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

  update: async (req, res, next) => {
    const { idea_id } = req.params;

    const { author_name, idea_name, description, rise_funds, img_url } = req.body;

    const sql =
      'UPDATE `collect_funds` SET `author_name`=?, `idea_name`=?, `description`=?, `rise_funds`=?, `img_url` = ? WHERE `idea_id`= ?';

    const [responseObject, error] = await makeSqlQuery(sql, [
      author_name,
      idea_name,
      description,
      rise_funds,
      img_url,
      idea_id,
    ]);

    if (error) {
      return next(error);
    }

    if (responseObject.affectedRows !== 1) {
      return next('Something wrong with fund edit', error);
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
