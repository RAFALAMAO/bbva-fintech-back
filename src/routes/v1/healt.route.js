'use strict';

const express = require('express');
const HealthCheckController = require('../../controllers/HealthCheck.controller');

const api = express.Router();

api.get('/healthcheck', [], HealthCheckController.check);

module.exports = api;
