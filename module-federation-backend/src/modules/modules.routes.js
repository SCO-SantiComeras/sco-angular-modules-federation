/* Imports */
const express = require('express');
const router = express.Router();
const routerUrl = '/modules'

/* Declarations */
const MODULES_LIST = require('./modules.constants');

/* Routes */
router.get(`${routerUrl}/list-modules`, async (req, res) => {
    if (MODULES_LIST && MODULES_LIST.length > 0) {
        return res.status(200).json(MODULES_LIST);
    }
    
    return res.status(200).json([]);
});

router.get(`${routerUrl}/get-module/:moduleName`, async (req, res) => {
    const { moduleName } = req.params;
    if (!moduleName) {
        return res.status(402).json({ code: 402, error: 'Module name not provided'});
    }

    if (!MODULES_LIST || MODULES_LIST.length == 0) {
        return res.status(409).json({ code: 409, error: 'Modules list not available'});
    }

    const existModule = MODULES_LIST.find(c => c.moduleName.toUpperCase() == moduleName.toUpperCase());
    if (!existModule) {
        return res.status(404).json({ code: 404, error: `Module name '${moduleName}' not found`});
    }

    return res.status(200).json(existModule);
});

module.exports = router;