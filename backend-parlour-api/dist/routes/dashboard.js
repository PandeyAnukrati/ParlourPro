"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const dashboardController_1 = require("../controllers/dashboardController");
const router = (0, express_1.Router)();
router.get('/stats', auth_1.authenticateJWT, dashboardController_1.getDashboardStats);
exports.default = router;
