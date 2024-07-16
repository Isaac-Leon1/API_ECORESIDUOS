import Administrador from '../models/Administrador.js';
import generarToken from '../helpers/JWT.js';
import { sendMailToAdmin } from '../config/nodemailer.js';

const login = async (req,res)=>{
    // Actividad 1 (Request): Obtener los valores de email y password del body
    const {email,password} = req.body

    // Actividad 2 (Validación): Verificar si los campos email y password están vacíos
    if (Object.values(req.body).includes("")) return res.status(400).json({msg:"Lo sentimos, debes llenar todos los campos"})
    
    //? Validar si el email existe
    const administradorBDD = await Administrador.findOne({email})
    if(!administradorBDD) return res.status(404).json({msg:"Lo sentimos, el email no existe"})

    //? Validar si el email está confirmado
    if(!administradorBDD?.confirmEmail) return res.status(404).json({msg:"Lo sentimos, debes confirmar tu email"})

    //? Validar si el password es correcto
    const match = await administradorBDD.matchPassword(password)
    if (!match) return res.status(400).json({msg:"Lo sentimos, la contraseña es incorrecta"})
    
    // Actividad 3 (Base de datos)
    //? Generar token
    const token = generarToken(administradorBDD._id, "administrador")
    const {_id,nombre,apellido,direccion,telefono,email:emailBDD} = administradorBDD;

    // Actividad 4 (Respuesta)
    res.status(200).json({_id,token,nombre,apellido,direccion,telefono,email:emailBDD})
}
const perfil=(req,res)=>{
    const {
        nombre,
        apellido,
        direccion,
        telefono,
        email
    } = req.admin
    res.status(200).json(
        {
            nombre,
            apellido,
            direccion,
            telefono,
            email
        }
    )
}
const registro = async (req,res)=>{
    // Actividad 1 (Request)
    const {
        nombre,
        apellido,
        direccion,
        telefono,
        email,
        password
    } = req.body

    // Actividad 2 (Validación)
    if (Object.values(req.body).includes("")) return res.status(400).json({msg:"Lo sentimos, debes llenar todos los campos"})
    
    //? Validar si el email ya existe
    const verificarEmail = await Administrador.findOne({email})
    if(verificarEmail) return res.status(400).json({msg:"Lo sentimos, el email ya existe"})

    // Actividad 3 (Base de datos)
    const administrador = new Administrador(req.body)
    //? Cifrar password
    administrador.password = await administrador.encrypPassword(password)
    const token = administrador.crearToken()
    await administrador.save()
    sendMailToAdmin(email,token)
    res.status(200).json({res:'Registro exitoso, verifica tu email para confirmar tu cuenta'})
}
const confirmEmail = async (req,res)=>{
    // Actividad 1 (Request)
    const {token} = req.params
    if (!token) return res.status(404).json({msg:"Lo sentimos, debes proporcionar un token"})
    
    // Actividad 2 (Buscar en base de datos)
    const administradorBDD = await Administrador.findOne({token})
    if(!administradorBDD) return res.status(404).json({msg:"Lo sentimos, el token no es válido"})
    
    // Actividad 3 (Guardar en base de datos)
    administradorBDD.confirmEmail = true
    administradorBDD.token = null
    await administradorBDD.save()
    res.status(200).json({res:'Email confirmado correctamente'})
}
const actualizarPerfil = (req,res)=>{
    res.status(200).json({res:'actualizar perfil de un administrador registrado'})
}
const actualizarPassword = (req,res)=>{
    res.status(200).json({res:'actualizar password de un administrador registrado'})
}
const recuperarPassword= (req,res)=>{
    res.status(200).json({res:'enviar mail recuperación'})
}
const comprobarTokenPasword= (req,res)=>{
    res.status(200).json({res:'verificar token mail'})
}
const nuevoPassword= (req,res)=>{
    res.status(200).json({res:'crear nuevo password'})
}

export {
    login,
    perfil,
    registro,
    confirmEmail,
    actualizarPerfil,
    actualizarPassword,
	recuperarPassword,
    comprobarTokenPasword,
	nuevoPassword
}