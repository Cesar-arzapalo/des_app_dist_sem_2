import { Router } from  "express";
import { Mentor } from '../models/mentor.model';

const mentorRoutes = Router();

interface MentorQuery {
        dni?: Number;
        dniup?: Number;
        mentoria?: Array<Number>;
        puntaje?: Number;
};

let getMentorQuery = (req: any): MentorQuery => {
    let query: MentorQuery = {}; 
    
    if(req.query.dni != null){
        query.dni = Number(req.query.dni);
    }

    query.dniup = Number(req.query.dniup);
    

    if(req.query.mentoria != null){
        query.mentoria = Array<Number>(req.query.mentoria);
    }

    if(req.query.puntaje != null){
        query.puntaje = Number(req.query.puntaje);
    }
    return query;
}

mentorRoutes.get('/' , (req, resp)=>{
    
    let query: MentorQuery = getMentorQuery(req);
    
    Mentor.find(query)
        .then(mentorDB => resp.json({ok: true, mensaje: mentorDB }) )
        .catch(err => resp.json({ok: false, mensaje: err }));
});

mentorRoutes.post('' , (req, resp)=>{
    
    const persona = {
        dni         : req.body.dni,
        dniup       : req.body.dniup,
        mentoria    : req.body.mentoria,
        puntaje     : req.body.puntaje
    };

    Mentor.create(persona)
        .then(mentorDB => resp.json({ok: true, mensaje: mentorDB }) )
        .catch(err => resp.json({ok: false, mensaje: err }));

});

mentorRoutes.put('' , (req, resp)=>{
    let query: MentorQuery = getMentorQuery(req);
    

    console.log(query);
    
    console.log(req.query);

    Mentor.findByIdAndUpdate(req.query.id, query, {new: true}, (err, mentorDB) => {
        if ( err ) throw err;
        if (!mentorDB) {
            resp.json({ok: false, mensaje: "No existe un mentor con ese ID" });
        } else {
            resp.json({ok: true, mensaje: mentorDB });
        }

    })
    
});

mentorRoutes.delete('' , (req, resp)=>{
    
    Mentor.findByIdAndDelete(req.query.id, (err: any, mentorDB: any) => {
        if ( err ) throw err;
        if (!mentorDB) {
            resp.json({ok: false, mensaje: "No existe un mentor con ese ID" });
        } else {
            resp.json({ok: true, mensaje: mentorDB });
        }
    })
    
});

export default mentorRoutes;