import {Router} from 'express'
const router = Router()
import { 
    listarRutas,
    detalleRuta,
    registrarRuta,
    actualizarRuta,
    eliminarRuta 
} from '../controllers/rutas_controller.js'

router.get('/rutas',listarRutas)
router.get('/rutas/:id',detalleRuta)
router.post('/rutas/registro',registrarRuta)
router.put('/rutas/actualizar/:id',actualizarRuta)
router.delete('/rutas/eliminar/:id',eliminarRuta)

export default router