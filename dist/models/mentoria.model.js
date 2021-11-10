"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mentoria = void 0;
var mongoose_1 = require("mongoose");
var mentor_model_1 = require("./mentor.model");
var mentoriaSchema = new mongoose_1.Schema({
    titulo: {
        type: String,
        required: [true, 'El titulo de la mentoria es necesario para la entidaad Mentoria']
    },
    descripcion: {
        type: String,
        required: [true, 'La descripcion es necesaria para la entidad Mentoria']
    },
    duracion: {
        type: Number,
        required: [true, 'La duracion de la mentoria (expresada en minutos) es necesaria para la entidad Mentoria']
    },
    fecha: {
        type: Date,
        required: [true, 'La fecha de la mentoria es necesaria para la Entidad Mentoria']
    },
    mentor: {
        type: mentor_model_1.MentorSchema,
        required: [true, "Los datos del mentor es necesaria en la entidad Mentoria"]
    },
    mentorizados: {
        type: [mentor_model_1.MentorSchema],
        required: [true, "El arreglo de mentorizados es necesaria en la entidad Mentoria"]
    }
});
;
exports.Mentoria = (0, mongoose_1.model)('mentorias', mentoriaSchema);
