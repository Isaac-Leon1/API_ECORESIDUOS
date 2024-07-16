import {Router} from 'express'
import { 
    login,
    registro,
    confirmEmail,
    perfil,
    actualizarPerfil,
    actualizarPassword,
    recuperarPassword,
    comprobarTokenPasword,
    nuevoPassword
} from '../controllers/administrador_controller.js'
import verificarAutenticacion from '../middlewares/auth.js'

const router = Router()

router.post('/login',login)
router.post('/registro',registro)
router.get('/confirmar/:token',confirmEmail)
router.get('/recuperar-password',recuperarPassword)
router.get('/recuperar-password/:token',comprobarTokenPasword)
router.post('/nuevo-password/:token',nuevoPassword)

router.get('/perfil',verificarAutenticacion,perfil)
router.put('/administrador/actualizarpassword',verificarAutenticacion,actualizarPassword)
router.put('/administrador/:id',verificarAutenticacion,actualizarPerfil)

export default router