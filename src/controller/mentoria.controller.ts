import { IMentor } from '../models/mentor.model';
import { Mentoria } from '../models/mentoria.model';

interface MentoriaQuery {
    titulo?: String;
    descripcion?: String;
    duracion?: Number;
    fecha?: Date;
    mentor?: IMentor;
    mentorizados?: Array<IMentor>;
};

let getMentoriaQueryController = (req: any): MentoriaQuery => {
    let query: MentoriaQuery = {};
    if (req.query.titulo != null) {
        query.titulo = String(req.query.titulo);
    }
    if (req.query.descripcion != null) {
        query.descripcion = String(req.query.descripcion);
    }
    if (req.query.duracion != null) {
        query.duracion = Number(req.query.duracion);
    }
    if (req.query.fecha != null) {
        query.fecha = new Date(req.query.fecha);
    }
    if (req.query.mentor != null) {
        query.mentor = <IMentor>(req.query.mentor);
    }
    if (req.query.mentorizados != null) {
        query.mentorizados = Array<IMentor>(req.query.mentorizados);
    }
    return query;
}

export const MentoriaGetController = (req: any, resp: any)=> {

    let query: MentoriaQuery = getMentoriaQueryController(req);

    Mentoria.find(query)
        .then(mentoriaDB => resp.json({ ok: true, mensaje: mentoriaDB }))
        .catch(err => resp.json({ ok: false, mensaje: err }));
}

export const MentoriaPostController = (req: any, resp: any) => {

    const mentoria = {
        titulo: req.body.titulo,
        descripcion: req.body.descripcion,
        duracion: req.body.duracion,
        fecha: req.body.fecha,
        mentor: req.body.mentor,
        mentorizados: req.body.mentorizados,
    };

    Mentoria.create(mentoria)
        .then(mentoriaDB => resp.json({ ok: true, mensaje: mentoriaDB }))
        .catch(err => resp.json({ ok: false, mensaje: err }));

}

export const MentoriaPutController = (req: any, resp: any) => {
    let query: MentoriaQuery = getMentoriaQueryController(req);

    Mentoria.findByIdAndUpdate(req.query.id, query, { new: true }, (err, mentoriaDB) => {
        if (err) throw err;
        if (!mentoriaDB) {
            resp.json({ ok: false, mensaje: "No existe un mentor con ese ID" });
        } else {
            resp.json({ ok: true, mensaje: mentoriaDB });
        }

    })

}

export const MentoriaDeleteController = (req: any, resp:any ) => {

    Mentoria.findByIdAndDelete(req.query.id, (err: any, mentoriaDB: any) => {
        if (err) throw err;
        if (!mentoriaDB) {
            resp.json({ ok: false, mensaje: "No existe un mentor con ese ID" });
        } else {
            resp.json({ ok: true, mensaje: mentoriaDB });
        }
    })

}