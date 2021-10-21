import {Schema, model, Document} from 'mongoose';

const personaSchema  =new Schema({
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

interface IPersona extends Document {
    dni: Number;
    nombre: String;
    celular: Number;
    fechanac: String;
};

export const Persona = model<IPersona>('personas', personaSchema);