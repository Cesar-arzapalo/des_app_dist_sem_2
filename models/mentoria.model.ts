import {Schema, model, Document} from 'mongoose';
import {IMentor, MentorSchema} from './mentor.model';
const mentoriaSchema  =new Schema({
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
        type: MentorSchema,
        required:[true, "Los datos del mentor es necesaria en la entidad Mentoria"]
    },
    mentorizados:{
        type: [MentorSchema],
        required: [true, "El arreglo de mentorizados es necesaria en la entidad Mentoria"]
    }
});

interface IMentoria extends Document {
    titulo: String;
    descripcion: String;
    duracion: Number;
    fecha: Date;
    mentor:IMentor;
    mentorizados: Array<IMentor>;
};

export const Mentoria = model<IMentoria>('mentorias', mentoriaSchema);