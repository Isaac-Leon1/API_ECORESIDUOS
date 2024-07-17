import { check, validationResult } from 'express-validator'

export const validacionRutas =[
    check(["nombre","empiezaEn","finalizaEn","dias","horario","tipoResiduos"])
        .exists()
            .withMessage('Los campos "nombre" "empieza en" "finaliza en" "dias" "horario" y/o "tipoResiduos" son obligatorios')
        .notEmpty()
            .withMessage('Los campos "nombre" "empieza en" "finaliza en" "dias" "horario" y/o "tipoResiduos" no pueden estar vacíos')
        .customSanitizer(value => typeof value === 'string' ? value.trim() : value),

    check("nombre")
        .isLength({ min: 3, max: 20 })
            .withMessage('El campo "nombre" y/o "apellido" debe(n) tener entre 3 y 20 caracteres')
        .isAlpha('es-ES', { ignore: 'áéíóúÁÉÍÓÚñÑ' })
            .withMessage('El campo "nombre" debe contener solo letras')
        .customSanitizer(value => typeof value === 'string' ? value.trim() : value),

    check(["empiezaEn","finalizaEn"])
        .isLength({ min: 3, max: 25 })
            .withMessage('El campo "empieza en" y/o "finalizaEn" debe tener entre 3 y 25 caracteres')
        .customSanitizer(value => typeof value === 'string' ? value.trim() : value),

    check("tipoResiduos")
        .isIn(["Orgánico","Inorgánico"])
            .withMessage('El tipo de residuo debe ser "Orgánico" o "Inorgánico".')
        .customSanitizer(value => typeof value === 'string' ? value.trim() : value),


    (req,res,next)=>{
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            return next();
        } else {
            return res.status(400).send({ errors: errors.array() });
        }
    }
]