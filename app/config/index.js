'use strict'

import logger from './components/logger'
import server from './components/server'
import session from './components/session'

module.exports = Object.assign({}, session, logger, server)
