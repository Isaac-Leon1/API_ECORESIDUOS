import {Schema, model} from 'mongoose'

const rutasSchema = new Schema({
    nombre:{
        type:String,
        required:true,
        trim:true
    },
    empiezaEn:{
        type:String,
        required:true,
        trim:true
    },
    finalizaEn:{
        type:String,
        trim:true,
        default:null
    },
    dias:{
        type: Array,
        default:null
    },
    horario:{
        type:String,
        required:true,
        trim:true,
    },
    tipoResiduos:{
        type:String,
        required:true
    },
    estado:{
        type:Boolean,
        default:true
    }
},{
    timestamps:true
})

export default model('Rutas',rutasSchema)