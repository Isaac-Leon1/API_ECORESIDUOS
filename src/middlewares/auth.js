import jwt from 'jsonwebtoken'
import Ciudadano from '../models/Ciudadano.js'
import Administrador from '../models/Administrador.js'
import dotenv from 'dotenv'
dotenv.config()

const verificarAutenticacion = async (req,res,next)=>{

    if(!req.headers.authorization) return res.status(404).json({msg:"Lo sentimos, debes proprocionar un token"})    
    const {authorization} = req.headers
    try {
        const {id,rol} = jwt.verify(authorization.split(' ')[1],process.env.JWT_SECRET)
        if (rol==="administrador"){
            req.admin = await Administrador.findById(id).lean().select("-password")
            next() // Continuar con la siguiente función
        }
        else{
            req.ciudadano = await Ciudadano.findById(id).lean().select("-password")
            next() // Continuar con la siguiente función
        }
    } catch (error) {
        return res.status(404).json({msg:"Formato del token no válido"})
    }
}

export default verificarAutenticacion