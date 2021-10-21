"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var persona_model_1 = require("../models/persona.model");
var personaRoutes = (0, express_1.Router)();
;
var getPersonaQuery = function (req) {
    var query = {};
    if (req.query.nro != null) {
        query.dni = Number(req.query.dni);
    }
    if (req.query.tipo != null) {
        query.nombre = String(req.query.nombre);
    }
    if (req.query.tipo_alt != null) {
        query.celular = Number(req.query.celular);
    }
    if (req.query.desc != null) {
        query.fechanac = String(req.query.fechanac);
    }
    return query;
};
personaRoutes.get('/', function (req, resp) {
    var query = getPersonaQuery(req);
    persona_model_1.Persona.find(query)
        .then(function (personaDB) { return resp.json({ ok: true, mensaje: personaDB }); })
        .catch(function (err) { return resp.json({ ok: false, mensaje: err }); });
});
personaRoutes.post('', function (req, resp) {
    var persona = {
        dni: req.body.dni,
        nombre: req.body.nombre,
        celular: req.body.celular,
        fechanac: req.body.fechanac
    };
    console.log(req.query);
    persona_model_1.Persona.create(persona)
        .then(function (personaDB) { return resp.json({ ok: true, mensaje: personaDB }); })
        .catch(function (err) { return resp.json({ ok: false, mensaje: err }); });
});
personaRoutes.put('', function (req, resp) {
    var query = getPersonaQuery(req);
    console.log(query);
    console.log(req.query);
    persona_model_1.Persona.findByIdAndUpdate(req.query.id, query, { new: true }, function (err, personaDB) {
        if (err)
            throw err;
        if (!personaDB) {
            resp.json({ ok: false, mensaje: "No existe una persona con ese ID" });
        }
        else {
            resp.json({ ok: true, mensaje: personaDB });
        }
    });
});
personaRoutes.delete('', function (req, resp) {
    persona_model_1.Persona.findByIdAndDelete(req.query.id, function (err, personaDB) {
        if (err)
            throw err;
        if (!personaDB) {
            resp.json({ ok: false, mensaje: "No existe una persona con ese ID" });
        }
        else {
            resp.json({ ok: true, mensaje: personaDB });
        }
    });
});
exports.default = personaRoutes;
