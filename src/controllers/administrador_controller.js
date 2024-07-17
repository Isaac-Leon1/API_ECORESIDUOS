import Administrador from '../models/Administrador.js';
import moongose from 'mongoose';
import generarToken from '../helpers/JWT.js';
import { sendMailToAdmin, sendMailToRecoveryPassword } from '../config/nodemailer.js';
import Reportes from '../models/Reportes.js';

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
const actualizarPerfil = async (req,res)=>{
    const {id} = req.params
    const {
        nombre,
        apellido,
        direccion,
        telefono
    } = req.body
    if (Object.values(req.body).includes("")) return res.status(400).json({msg:"Lo sentimos, debes llenar todos los campos"})
    if (!moongose.Types.ObjectId.isValid(id)) return res.status(404).json({msg:`Lo sentimos, el id ${id} no es válido`})
    
    await Administrador.findByIdAndUpdate(id,{nombre,apellido,direccion,telefono})

    res.status(200).json({msg:"Perfil actualizado correctamente"})
}
const actualizarPassword = async (req,res)=>{
    // Actividad 1 (Request)
    const {
        email,
        password,
        newpassword,
        confirmpassword
    } = req.body
    // Actividad 2 (Validaciones)
    //? Validar si los campos están vacíos
    if (Object.values(req.body).includes('')){
        return res.status(400).json({error:'Lo sentimos pero faltan datos'})
    }
    //? Validar si el email existe
    const administradorBDD = await Administrador.findOne({email})
    if (!administradorBDD){
        return res.status(404).json({error:'Lo sentimos, el email no existe'})
    }
    //? Validar si la contraseña es la misma
    const validarPassword = await administradorBDD.matchPassword(password)
    if (!validarPassword){
        return res.status(403).json({error:'Lo sentimos, la contraseña es incorrecta'})
    }
    //? Validar si la contraseña es la misma
    if (password === newpassword){
        return res.status(400).json({error:'Lo sentimos, la contraseña es la misma'})
    }
    //? Validar si las contraseñas coinciden
    if (newpassword !== confirmpassword){
        return res.status(400).json({error:'Lo sentimos, las contraseñas no coinciden'})
    }
    // Actividad 3 (Base de Datos)
    administradorBDD.password = await administradorBDD.encrypPassword(newpassword)
    await administradorBDD.save()
    // Actividad 4 (Respuesta)
    res.status(200).json({msg:'Contraseña actualizada'})
}
const recuperarPassword = async (req,res)=>{
    // Actividad 1 (Request)
    const {email} = req.body
    // Actividad 2 (Validaciones)
    
    //? Validar si los campos están vacíos
    if (Object.values(req.body).includes('')){
        return res.status(400).json({error:'Lo sentimos pero faltan datos'})
    }

    //? Validar si el email existe
    const administradorBDD = await Administrador.findOne({email})
    if (!administradorBDD){
        return res.status(404).json({error:'Lo sentimos, el email no existe'})
    }
    // Actividad 3 (Base de Datos)
    const token = administradorBDD.crearToken()
    administradorBDD.token = token
    await sendMailToRecoveryPassword(email,token)
    await administradorBDD.save()
    // Actividad 4 (Respuesta)
    res.status(200).json({msg:'Correo enviado, verifica tu email'})
}
const comprobarTokenPasword = async (req,res)=>{
    // Actividad 1 (Request) .../confirmar/
    const token = req.params?.token
    // Actividad 2 (Validaciones)
    //? Validar si el token existe
    if (!token){
        return res.status(400).json({error:'Lo sentimos, no se puede validar el token'})
    }
    //? Validar si el token es correcto
    const administradorBDD = await Administrador.findOne({token})
    if (!administradorBDD){
        return res.status(404).json({error:'Lo sentimos, el token no existe'})
    }
    // Actividad 3 (Base de Datos)
    await administradorBDD.save()
    // Actividad 4 (Respuesta)
    res.status(200).json({msg:'Token confirmado, puedes cambiar tu password'})
}
const nuevoPassword = async (req,res)=>{
    // Actividad 1 (Request)
    const {
        password,
        confirmpassword
    } = req.body
    // Actividad 2 (Validaciones)
    //? Validar si los campos están vacíos
    if (Object.values(req.body).includes('')){
        return res.status(400).json({error:'Lo sentimos pero faltan datos'})
    }
    //? Validar si las contraseñas coinciden
    if (password !== confirmpassword){
        return res.status(400).json({error:'Lo sentimos, las contraseñas no coinciden'})
    }
    //? Validar si la contraseña es la misma a la almacenada en la base de datos
    const administradorBDD = await Administrador.findOne({token:req.params.token})
    if (!administradorBDD){
        return res.status(404).json({error:'Lo sentimos, el token no existe'})
    }
    if (await administradorBDD.matchPassword(password)){
        return res.status(400).json({error:'Lo sentimos, la contraseña es la misma'})
    }
    // Actividad 3 (Base de Datos)
    administradorBDD.token = null
    administradorBDD.password = await administradorBDD.encrypPassword(password)
    await administradorBDD.save()
    // Actividad 4 (Respuesta)
    res.status(200).json({msg:'Contraseña actualizada, ya puedes iniciar sesión'})
}

const listarReportes = async (req,res) => {
    const reportes = await Reportes.find({state:true}).where('rutas').select("-createdAt -updatedAt -__v")
    res.status(200).json(reportes)
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
	nuevoPassword,
    listarReportes
}