const express = require('express');
const LogEntry = require('../models/LogEntry');
const { API_KEY } = process.env;
const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const allLogs = await LogEntry.find();
    if (!allLogs) {
      return res.status(404).json({ msg: 'No logs found' });
    }
    res.status(200).json({ data: allLogs });
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const isInDB = await LogEntry.findById({ _id: req.params.id });
    if (!isInDB) {
      return res.status(404).json({ msg: 'Id is not in DB' });
    }
    const deleteEntry = await isInDB.deleteOne();
    return res
      .status(200)
      .json({ msg: 'Log deleted from db', log: deleteEntry });
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  console.log(req.headers);
  try {
    if (req.headers['x-api-key'] !== API_KEY) {
      return res.status(401);
    }
    const newLogEntry = await LogEntry.create(req.body);
    if (!newLogEntry) {
      return res.status(400).json({ msg: 'Error while creating log' });
    }
    return res.status(200).json({ msg: 'Log created', data: newLogEntry });
  } catch (error) {
    next(error);
    return res.json({ msg: error.message });
  }
});

module.exports = router;
