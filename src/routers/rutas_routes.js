import {Router} from 'express'
const router = Router()


router.get('/rutas',(req,res)=>res.send("Listar rutas de recoleccion"))
router.get('/rutas/:id',(req,res)=>res.send("Obtener una ruta de recoleccion por ID"))
router.post('/rutas/registro',(req,res)=>res.send("Registrar ruta de recoleccion"))
router.put('/rutas/actualizar/:id',(req,res)=>res.send("Actualizar ruta de recoleccion"))
router.delete('/rutas/eliminar/:id',(req,res)=>res.send("Eliminar ruta de recoleccion"))

export default router