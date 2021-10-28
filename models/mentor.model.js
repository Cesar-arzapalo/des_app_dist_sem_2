"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mentor = void 0;
var mongoose_1 = require("mongoose");
var mentorSchema = new mongoose_1.Schema({
    dni: {
        type: Number,
        required: [true, 'El DNI es necesario para la entidaad Mentor']
    },
    dniUp: {
        type: Number,
        required: [false]
    },
    mentoria: {
        type: [Number],
        required: [true, 'El DNI_UP es necesario para la entidaad Mentor']
    },
    puntaje: {
        type: Number,
        required: [true, 'El Puntaje es necesario para la entidaad Mentor']
    }
});
;
exports.Mentor = (0, mongoose_1.model)('mentores', mentorSchema);
