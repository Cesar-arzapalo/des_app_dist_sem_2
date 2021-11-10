import { Router } from  "express";
import { IMentor } from '../models/mentor.model';
import { Mentoria } from '../models/mentoria.model';

const mentoriaRoutes = Router();

interface MentoriaQuery {
    titulo?         : String;
    descripcion?    : String;
    duracion?       : Number;
    fecha?          : Date;
    mentor?         : IMentor;
    mentorizados?   : Array<IMentor>;
};

let getMentoriaQuery = (req: any): MentoriaQuery => {
    let query: MentoriaQuery={}; 
    query.titulo = String(req.query.titulo);
    query.descripcion = String(req.query.descripcion);
    query.duracion =Number(req.query.duracion);
    query.fecha = new Date(req.query.fecha);
    query.mentor  = <IMentor>(req.query.mentor);
    query.mentorizados  = Array<IMentor>(req.query.mentorizados);
    return query;
}

mentoriaRoutes.get('/' , (req, resp)=>{
    
    let query: MentoriaQuery = getMentoriaQuery(req);
    
    Mentoria.find(query)
        .then(mentoriaDB => resp.json({ok: true, mensaje: mentoriaDB }) )
        .catch(err => resp.json({ok: false, mensaje: err }));
});

mentoriaRoutes.post('' , (req, resp)=>{
    
    const persona = {
        nivel               : req.body.nivel,
        datos_personales    : req.body.datos_personales,
        tipo_mentor         : req.body.tipo_mentor,
        puntaje             : req.body.puntaje,
        perfil              : req.body.perfil,
        mentorias           : req.body.mentorias,
    };

    Mentoria.create(persona)
        .then(mentoriaDB => resp.json({ok: true, mensaje: mentoriaDB }) )
        .catch(err => resp.json({ok: false, mensaje: err }));

});

mentoriaRoutes.put('' , (req, resp)=>{
    let query: MentoriaQuery = getMentoriaQuery(req);
    

    console.log(query);
    
    console.log(req.query);

    Mentoria.findByIdAndUpdate(req.query.id, query, {new: true}, (err, mentoriaDB) => {
        if ( err ) throw err;
        if (!mentoriaDB) {
            resp.json({ok: false, mensaje: "No existe un mentor con ese ID" });
        } else {
            resp.json({ok: true, mensaje: mentoriaDB });
        }

    })
    
});

mentoriaRoutes.delete('' , (req, resp)=>{
    
    Mentoria.findByIdAndDelete(req.query.id, (err: any, mentoriaDB: any) => {
        if ( err ) throw err;
        if (!mentoriaDB) {
            resp.json({ok: false, mensaje: "No existe un mentor con ese ID" });
        } else {
            resp.json({ok: true, mensaje: mentoriaDB });
        }
    })
    
});

export default mentoriaRoutes;