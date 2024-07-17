import {Router} from 'express'
const router = Router()
import { 
    listarRutas,
    detalleRuta,
    registrarRuta,
    actualizarRuta,
    eliminarRuta 
} from '../controllers/rutas_controller.js'
import { validacionRutas } from '../middlewares/validacionRutas.js'
import verificarAutenticacion from '../middlewares/auth.js'

router.get('/rutas',listarRutas)
router.get('/rutas/:id',detalleRuta)
router.post('/rutas/registro',validacionRutas,verificarAutenticacion,registrarRuta)
router.put('/rutas/actualizar/:id',verificarAutenticacion,actualizarRuta)
router.delete('/rutas/eliminar/:id',verificarAutenticacion,eliminarRuta)

export default router