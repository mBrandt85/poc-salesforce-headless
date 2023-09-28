import { Router } from 'express'

import auth from './auth'
import cadence from './cadence'
import customers from './customers'
import email from './email'
import leads from './leads'
import tasks from './tasks'

const router = Router()

router.use('/login', auth)
router.use('/cadence', cadence)
router.use('/customers', customers)
router.use('/email', email)
router.use('/leads', leads)
router.use('/tasks', tasks)

export default router