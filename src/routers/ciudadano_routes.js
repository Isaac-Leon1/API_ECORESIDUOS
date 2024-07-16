import {Router} from 'express'
const router = Router()
import { 
    registro,
} from '../controllers/ciudadano_controller.js'
router.post('/ciudadano/register',registro)
export default router