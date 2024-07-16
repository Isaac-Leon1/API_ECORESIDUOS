import { Schema, model } from 'mongoose'

const reporteSchema = new Schema({
    fecha: {
        type: Date,
        require: true
    },
    hora: {
        type: String,
        require: true
    },
    lugar: {
        type: String,
        require: true
    },
    descripcion: {
        type: String,
        require: true
    },
    ciudadano: {
        type: Schema.Types.ObjectId,
        ref: 'Ciudadano',
        require: true
    },
    estado: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})

export default model('Reportes', reporteSchema)