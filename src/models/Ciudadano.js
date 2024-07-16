import {Schema, model} from 'mongoose'
import bcrypt from "bcryptjs"

const ciudadanoSchema= new Schema({
    nombre:{
        type:String,
        require:true,
        trim:true
    },
    apellido:{
        type:String,
        require:true,
        trim:true
    },
    email:{
        type:String,
        require:true,
        trim:true,
		unique:true
    },
    telefono:{
        type:Number,
        trim:true,
        default:null
    },
    
    password:{
        type:String,
        require:true
    },
    token:{
        type:String,
        default:null
    },
    confirmEmail:{
        type:Boolean,
        default:false
    }
},{
    timestamps:true
})

// Método para cifrar el password del veterinario
ciudadanoSchema.methods.encrypPassword = async function(password){
    const salt = await bcrypt.genSalt(10)
    const passwordEncryp = await bcrypt.hash(password,salt)
    return passwordEncryp
}

// Método para verificar si el password ingresado es el mismo de la BDD
ciudadanoSchema.methods.matchPassword = async function(password){
    const response = await bcrypt.compare(password,this.password)
    return response
}

// Método para crear un token 
ciudadanoSchema.methods.crearToken = function(){
    const tokenGenerado = this.token = Math.random().toString(36).slice(2)
    return tokenGenerado
}

export default model('Ciudadano',ciudadanoSchema)