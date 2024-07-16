import { sendMailToUser } from "../config/nodemailer.js";
import Usuarios from "../models/Ciudadano.js";

const registro = async (req,res)=>{
    const {
        email,
        password
    } = req.body
    if (Object.values(req.body).includes("")) return res.status(400).json({msg:"Lo sentimos, debes llenar todos los campos"})
    const verificarEmail = await Usuarios.findOne({email})
    if(verificarEmail) return res.status(400).json({msg:"Lo sentimos, el email ya existe"})
    const usuario = new Usuarios(req.body)
    usuario.password = await usuario.encrypPassword(password)
    const token = usuario.crearToken()
    await usuario.save()
    sendMailToUser(email,token)

    res.status(200).json({res:'Registro exitoso, verifica tu email para confirmar tu cuenta'})
}
export {registro}
