import mongoose from "mongoose";
import Rutas from "../models/Rutas.js";

const listarRutas = async (req,res)=>{
    const rutas = await Rutas.find({estado:true}).where('rutas').equals(req.rutasBDD).select("-createdAt -updatedAt -__v")
    res.status(200).json(rutas)
}
const detalleRuta = async (req,res)=>{
    const {id} = req.params
    if( !mongoose.Types.ObjectId.isValid(id) ) return res.status(404).json({msg:`Lo sentimos, debe ser un id válido`});
    const rutasBDD = await Rutas.findById(id)
    if(!rutasBDD) return res.status(404).json({msg:`Lo sentimos, no existe la ruta con id: ${id}`})
    res.status(200).json({msg:rutasBDD})
}
const registrarRuta = async (req,res)=>{
    if (Object.values(req.body).includes("")) return res.status(400).json({msg:"Lo sentimos, debes llenar todos los campos"})
    try {
        const ruta = await Rutas.create(req.body)
        res.status(200).json({msg:`Registro exitoso de la ruta ${ruta._id}`,ruta})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}
const actualizarRuta = async (req,res)=>{
    const {id} = req.params
    if (Object.values(req.body).includes("")) return res.status(400).json({msg:"Lo sentimos, debes llenar todos los campos"})
    if( !mongoose.Types.ObjectId.isValid(id) ) return res.status(404).json({msg:`Lo sentimos, no existe la ruta con id: ${id}`});
    await Rutas.findByIdAndUpdate(req.params.id,req.body)
    res.status(200).json({msg:"Actualización exitosa de la ruta"})
}
const eliminarRuta = async (req,res)=>{
    const {id} = req.params
    if (Object.values(req.body).includes("")) return res.status(400).json({msg:"Lo sentimos, debes llenar todos los campos"})
    if( !mongoose.Types.ObjectId.isValid(id) ) return res.status(404).json({msg:`Lo sentimos, no existe la ruta con id: ${id}`})
    await Rutas.findByIdAndUpdate(req.params.id,{estado:false})
    res.status(200).json({msg:"Ruta eliminada correctamente"})
}
export {
    listarRutas,
    detalleRuta,
    registrarRuta,
    actualizarRuta,
    eliminarRuta
}
