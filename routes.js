const express = require('express')
const controllers = require('./controllers')
const router = express.Router();

router.post('/message/save/', controllers.saveMessage)
router.get('/message/read/', controllers.readMessage);
router.get('/message/read/:name', controllers.readMessageName);
router.get('/message/delete/:name', controllers.deleteMessage);

module.exports = router;