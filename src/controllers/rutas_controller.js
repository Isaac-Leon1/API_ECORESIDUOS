
const listarRutas = (req,res)=>{
    res.send("Listar rutas")
}
const detalleRuta = (req,res)=>{
    res.send("Detalle de una ruta")
}
const registrarRuta = (req,res)=>{
    res.send("Registrar ruta")
}
const actualizarRuta = (req,res)=>{
    res.send("Actualizar ruta")
}
const eliminarRuta = (req,res)=>{
    res.send("Eliminar ruta")
}

export {
    listarRutas,
    detalleRuta,
    registrarRuta,
    actualizarRuta,
    eliminarRuta
}