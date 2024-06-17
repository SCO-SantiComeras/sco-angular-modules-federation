/* Imports */
const express = require('express');
const router = express.Router();
const routerUrl = '/users'

/* Declarations */
const USERS_LIST = require('./users.constants');
const MODULES_LIST = require('../modules/modules.constants');

/* Routes */
router.get(`${routerUrl}/list-users`, async (req, res) => {
    if (USERS_LIST && USERS_LIST.length > 0) {
        return res.status(200).json(USERS_LIST);
    }
    
    return res.status(200).json([]);
});

router.get(`${routerUrl}/get-user/:name`, async (req, res) => {
    const { name } = req.params;
    if (!name) {
        return res.status(402).json({ code: 402, error: 'User name not provided'});
    }

    if (!USERS_LIST || USERS_LIST.length == 0) {
        return res.status(409).json({ code: 409, error: 'Users list not available'});
    }

    const existUser = USERS_LIST.find(c => c.name.toUpperCase() == name.toUpperCase());
    if (!existUser) {
        return res.status(404).json({ code: 404, error: `User name '${name}' not found`});
    }

    return res.status(200).json(existUser);
});

router.post(`${routerUrl}/login`, async (req, res) => {
    const user = req.body;
    if (!user.name) {
        return res.status(402).json({ code: 402, error: 'User name not provided'});
    } 

    if (!user.password) {
        return res.status(402).json({ code: 402, error: 'User password not provided'});
    } 

    if (!USERS_LIST || USERS_LIST.length == 0) {
        return res.status(409).json({ code: 409, error: 'Users list not available'});
    }

    const existUser = USERS_LIST.find(c => c.name.toUpperCase() == user.name.toUpperCase());
    if (!existUser) {
        return res.status(404).json({ code: 404, error: `Invalid credentials`});
    }

    if (user.password != existUser.password) {
        return res.status(401).json({ code: 404, error: `Invalid credentials`});
    }

    return res.status(200).json({ user: existUser, menu: MODULES_LIST });
});

router.post(`${routerUrl}/logout`, async (req, res) => {
    const user = req.body;
    if (!user.name) {
        return res.status(402).json({ code: 402, error: 'User name not provided'});
    } 

    if (!USERS_LIST || USERS_LIST.length == 0) {
        return res.status(409).json({ code: 409, error: 'Users list not available'});
    }

    const existUser = USERS_LIST.find(c => c.name.toUpperCase() == user.name.toUpperCase());
    if (!existUser) {
        return res.status(404).json({ code: 404, error: `User name '${user.name}' not found`});
    }

    return res.status(200).json(true);
});

module.exports = router;