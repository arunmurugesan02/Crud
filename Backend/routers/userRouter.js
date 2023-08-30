const express = require('express');
const router = express.Router();

const User = require('../controller/userController')

router.get('/',User.all)
router.get('/:id',User.all_id)
router.post('/',User.create)
router.put('/:id',User.update)
router.delete('/:id',User.delete)

module.exports = router;