import { Router } from "express";
import { IDatosPersonales, Mentor } from '../models/mentor.model';

const mentorRoutes = Router();

interface MentorQuery {
    nivel?: Number;
    datos_personales?: Array<IDatosPersonales>;
    tipo_mentor?: String;
    puntaje?: Number;
    perfil?: Array<String>;
    mentorias?: Array<String>;
};

let getMentorQuery = (req: any): MentorQuery => {
    let query: MentorQuery = {};

    if (req.query.nivel != null) {
        query.nivel = Number(req.query.nivel);
    }
    if (req.query.datos_personales != null) {
        query.datos_personales = Array<IDatosPersonales>(req.query.datos_personales);
    }
    if (req.query.tipo_mentor != null) {
        query.tipo_mentor = String(req.query.tipo_mentor);
    }
    if (req.query.puntaje != null) {
        query.puntaje = Number(req.query.puntaje);
    }
    if (req.query.perfil != null) {
        query.perfil = Array<String>(req.query.perfil);
    }
    if (req.query.mentorias != null) {
        query.mentorias = Array<String>(req.query.mentorias);
    }
    return query;
}

mentorRoutes.get('/', (req, resp) => {

    let query: MentorQuery = getMentorQuery(req);
    console.log(query)
    Mentor.find(query)
        .then(mentorDB => resp.json({ ok: true, mensaje: mentorDB }))
        .catch(err => resp.json({ ok: false, mensaje: err }));
});

mentorRoutes.post('', (req, resp) => {

    const persona = {
        nivel: req.body.nivel,
        datos_personales: req.body.datos_personales,
        tipo_mentor: req.body.tipo_mentor,
        puntaje: req.body.puntaje,
        perfil: req.body.perfil,
        mentorias: req.body.mentorias,
    };

    Mentor.create(persona)
        .then(mentorDB => resp.json({ ok: true, mensaje: mentorDB }))
        .catch(err => resp.json({ ok: false, mensaje: err }));

});

mentorRoutes.put('', (req, resp) => {
    let query: MentorQuery = getMentorQuery(req);


    console.log(query);

    console.log(req.query);

    Mentor.findByIdAndUpdate(req.query.id, query, { new: true }, (err, mentorDB) => {
        if (err) throw err;
        if (!mentorDB) {
            resp.json({ ok: false, mensaje: "No existe un mentor con ese ID" });
        } else {
            resp.json({ ok: true, mensaje: mentorDB });
        }

    })

});

mentorRoutes.delete('', (req, resp) => {

    Mentor.findByIdAndDelete(req.query.id, (err: any, mentorDB: any) => {
        if (err) throw err;
        if (!mentorDB) {
            resp.json({ ok: false, mensaje: "No existe un mentor con ese ID" });
        } else {
            resp.json({ ok: true, mensaje: mentorDB });
        }
    })

});

export default mentorRoutes;