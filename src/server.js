// Requerir los módulos
import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors';

import routerAdministradores from './routers/administrador_routes.js'
import routerRutas from './routers/rutas_routes.js'
import routerUsuarios from './routers/ciudadano_routes.js'

// Inicializaciones
const app = express()
dotenv.config()

// Configuraciones 
app.set('port',process.env.port || 3000)
app.use(cors())

// Middlewares 
app.use(express.json())

// Variables globales


// Rutas 
app.get('/',(req,res)=>{
    res.send("Server on")
})
app.use('/api',routerRutas)
app.use('/api',routerAdministradores)
app.use('/api',routerUsuarios)

// Manejo de una ruta que no sea encontrada
app.use((req,res)=>res.status(404).send("Endpoint no encontrado - 404"))


// Exportar la instancia de express por medio de app
export default  app