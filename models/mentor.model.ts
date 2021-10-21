import {Schema, model, Document} from 'mongoose';

const mentorSchema  =new Schema({
    dni: {
        type: Number,
        required: [true, 'El DNI es necesario para la entidaad Mentor']
    },
    dniUp: {
        type: Number,
        required: [true, 'El DNI_UP es necesario para la entidaad Mentor']
    },
    puntaje: {
        type: Number,
        required: [true, 'El Puntaje es necesario para la entidaad Mentor']
    }
});

interface IMentor extends Document {
    dni: Number;
    dniUp: Number;
    puntaje: Number;
};

export const Mentor = model<IMentor>('mentor', mentorSchema);