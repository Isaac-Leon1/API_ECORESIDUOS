import {Schema, model} from 'mongoose'
import bcrypt from "bcryptjs"

const rutasSchema = new Schema({
    nombre:{
        type:String,
        require:true,
        trim:true
    },
    empiezaEn:{
        type:String,
        require:true,
        trim:true
    },
    finalizaEn:{
        type:String,
        trim:true,
        default:null
    },
    dias:{
        type:Number,
        trim:true,
        default:null
    },
    horario:{
        type:String,
        require:true,
        trim:true,
				unique:true
    },
    tipoResiduos:{
        type:String,
        require:true
    },
    status:{
        type:Boolean,
        default:true
    }
},{
    timestamps:true
})

export default model('Rutas',rutasSchema)