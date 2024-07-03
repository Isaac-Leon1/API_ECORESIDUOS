import {Router} from 'express'
const router = Router()

router.post('/login',(req,res)=>res.send("login"))

router.post('/registro',(req,res)=>res.send("registro"))

router.get('/confirmar/:token',(req,res)=>res.send("confirmar email"))

router.get('/recuperar-password',(req,res)=>res.send("enviar mail"))

router.get('/recuperar-password/:token',(req,res)=>res.send("verificar token"))

router.post('/nuevo-password/:token',(req,res)=>res.send("crear password"))

router.get('/perfil',(req,res)=>res.send("perfil"))

router.put('/administrador/actualizarpassword',(req,res)=>res.send("actualizar password"))

router.put('/administrador/:id',(req,res)=>res.send("actualizar perfil"))


export default router