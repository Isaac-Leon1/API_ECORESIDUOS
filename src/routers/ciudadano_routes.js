import {Router} from 'express'
import { 
    registro,
    login,
    reportarIncidente,
    verificarToken
} from '../controllers/ciudadano_controller.js'
import verificarAutenticacion from '../middlewares/auth.js'

const router = Router()

router.post('/ciudadano/register',registro)
router.post('/ciudadano/login',login)
router.get('/ciudadano/verify/:token',verificarToken)

router.post('/ciudadano/reports',verificarAutenticacion,reportarIncidente)

export default router;