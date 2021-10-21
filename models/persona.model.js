"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Persona = void 0;
var mongoose_1 = require("mongoose");
var personaSchema = new mongoose_1.Schema({
    dni: {
        type: Number,
        required: [true, 'El DNI es necesario para la entidaad Persona']
    },
    nombre: {
        type: String,
        required: [true, 'El Nombre es necesario para la entidaad Persona']
    },
    celular: {
        type: Number,
        required: [true, 'El celular es necesario para la entidaad Persona']
    },
    fechanac: {
        type: String,
        required: [true, 'La Fecha de Nacimiento es necesario para la entidaad Persona']
    }
});
;
exports.Persona = (0, mongoose_1.model)('personas', personaSchema);
