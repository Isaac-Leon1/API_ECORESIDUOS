import {Router} from 'express'
import { 
    registro,
    login,
    reportarIncidente,
    verificarToken,
    recuperarPassword,
    comprobarTokenPasword,
    nuevoPassword
} from '../controllers/ciudadano_controller.js'
import verificarAutenticacion from '../middlewares/auth.js'
import { validacionCiudadano } from '../middlewares/validacionCiudadanos.js'

const router = Router()

router.post('/ciudadano/register',validacionCiudadano,registro)
router.post('/ciudadano/login',login)
router.get('/ciudadano/verify/:token',verificarToken)
router.post('/ciudadano/recuperarcontrasena',validacionCiudadano,recuperarPassword)
router.get('/ciudadano/confirmar/:token',comprobarTokenPasword)
router.post('/ciudadano/nuevapassword/:token',nuevoPassword)

router.post('/ciudadano/reports',verificarAutenticacion,reportarIncidente)

export default router;
