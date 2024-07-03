const login =(req,res)=>{
    res.status(200).json({res:'login del administrador'})
}
const perfil=(req,res)=>{
    res.status(200).json({res:'perfil del administrador'})
}
const registro =(req,res)=>{
    res.status(200).json({res:'registro de un nuevo administrador'})
}
const confirmEmail = (req,res)=>{
    res.status(200).json({res:'confirmar email de registro de administrador'})
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