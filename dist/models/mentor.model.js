"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mentor = exports.MentorSchema = void 0;
var mongoose_1 = require("mongoose");
var DatosPersonalesSchema = new mongoose_1.Schema({
    dni: {
        type: Number,
        required: [true, 'El dni es necesario en la entidad DatosPersonalea']
    },
    nombre: {
        type: String,
        required: [true, 'El nombre es necesario en la entidad DatosPersonalea']
    },
    celular: {
        type: Number,
        required: [true, 'El celular es necesario para la entidaad DatosPersonalea']
    },
    fecha_nacimiento: {
        type: String,
        required: [true, 'La Fecha de nacimiento es necesario para la entidaad DatosPersonalea']
    }
});
exports.MentorSchema = new mongoose_1.Schema({
    nivel: {
        type: Number,
        required: [true, 'El nivel del mentor es necesario para la entidaad Mentor']
    },
    datos_personales: {
        type: [DatosPersonalesSchema],
        required: [true, 'Los datos personales es necesario para la entidad Mentor']
    },
    tipo_mentor: {
        type: String,
        required: [true, 'El DNI_UP es necesario para la entidaad Mentor']
    },
    puntaje: {
        type: Number,
        required: [true, 'El Puntaje es necesario para la entidaad Mentor']
    },
    perfil: {
        type: [String],
        required: [true, "Los perfiles son necesarios para la entidad Mentor"]
    },
    mentorias: {
        type: [String],
        required: [true, "El arreglo de referencias de mentorias es necesaria en la entidad Mentor, de no tener Mentorias registradas se considera valido agregar un arregglo vacio"]
    }
});
;
;
exports.Mentor = (0, mongoose_1.model)('mentores', exports.MentorSchema);
