import { Router } from  "express";
import { Persona } from '../models/persona.model';

const personaRoutes = Router();


interface PersonaQuery {
        dni?: Number;
        nombre?: String;
        celular?: Number;
        fechanac?: String;
};

let getPersonaQuery = (req: any): PersonaQuery => {
    let query: PersonaQuery = {}; 
    
    if(req.query.nro != null){
        query.dni = Number(req.query.dni);
    }

    if(req.query.tipo != null){
        query.nombre = String(req.query.nombre);
    }

    if(req.query.tipo_alt != null){
        query.celular = Number(req.query.celular);
    }

    if(req.query.desc != null){
        query.fechanac = String(req.query.fechanac);
    }
    return query;
}

personaRoutes.get('/' , (req, resp)=>{
    
    let query: PersonaQuery = getPersonaQuery(req);
    
    Persona.find(query)
        .then(personaDB => resp.json({ok: true, mensaje: personaDB }) )
        .catch(err => resp.json({ok: false, mensaje: err }));

});



personaRoutes.post('' , (req, resp)=>{
    
    const persona = {
        dni         : req.body.dni,
        nombre      : req.body.nombre,
        celular     : req.body.celular,
        fechanac    : req.body.fechanac
    };

    

   
    console.log(req.query);

    Persona.create(persona)
        .then(personaDB => resp.json({ok: true, mensaje: personaDB }) )
        .catch(err => resp.json({ok: false, mensaje: err }));

    
});

personaRoutes.put('' , (req, resp)=>{
    let query: PersonaQuery = getPersonaQuery(req);
    

    console.log(query);
    
    console.log(req.query);

    Persona.findByIdAndUpdate(req.query.id, query, {new: true}, (err, personaDB) => {
        if ( err ) throw err;
        if (!personaDB) {
            resp.json({ok: false, mensaje: "No existe una persona con ese ID" });
        } else {
            resp.json({ok: true, mensaje: personaDB });
        }

    })
    
});

personaRoutes.delete('' , (req, resp)=>{
    
    Persona.findByIdAndDelete(req.query.id, (err: any, personaDB: any) => {
        if ( err ) throw err;
        if (!personaDB) {
            resp.json({ok: false, mensaje: "No existe una persona con ese ID" });
        } else {
            resp.json({ok: true, mensaje: personaDB });
        }
    })
    
});


export default personaRoutes;