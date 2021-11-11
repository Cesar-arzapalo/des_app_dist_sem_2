"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var mentor_model_1 = require("../models/mentor.model");
var mentorRoutes = (0, express_1.Router)();
;
var getMentorQuery = function (req) {
    var query = {};
    if (req.query.nivel != null) {
        query.nivel = Number(req.query.nivel);
    }
    if (req.query.datos_personales != null) {
        query.datos_personales = Array(req.query.datos_personales);
    }
    if (req.query.tipo_mentor != null) {
        query.tipo_mentor = String(req.query.tipo_mentor);
    }
    if (req.query.puntaje != null) {
        query.puntaje = Number(req.query.puntaje);
    }
    if (req.query.perfil != null) {
        query.perfil = Array(req.query.perfil);
    }
    if (req.query.mentorias != null) {
        query.mentorias = Array(req.query.mentorias);
    }
    return query;
};
mentorRoutes.get('/', function (req, resp) {
    var query = getMentorQuery(req);
    console.log(query);
    mentor_model_1.Mentor.find(query)
        .then(function (mentorDB) { return resp.json({ ok: true, mensaje: mentorDB }); })
        .catch(function (err) { return resp.json({ ok: false, mensaje: err }); });
});
mentorRoutes.post('', function (req, resp) {
    var persona = {
        nivel: req.body.nivel,
        datos_personales: req.body.datos_personales,
        tipo_mentor: req.body.tipo_mentor,
        puntaje: req.body.puntaje,
        perfil: req.body.perfil,
        mentorias: req.body.mentorias,
    };
    mentor_model_1.Mentor.create(persona)
        .then(function (mentorDB) { return resp.json({ ok: true, mensaje: mentorDB }); })
        .catch(function (err) { return resp.json({ ok: false, mensaje: err }); });
});
mentorRoutes.put('', function (req, resp) {
    var query = getMentorQuery(req);
    console.log(query);
    console.log(req.query);
    mentor_model_1.Mentor.findByIdAndUpdate(req.query.id, query, { new: true }, function (err, mentorDB) {
        if (err)
            throw err;
        if (!mentorDB) {
            resp.json({ ok: false, mensaje: "No existe un mentor con ese ID" });
        }
        else {
            resp.json({ ok: true, mensaje: mentorDB });
        }
    });
});
mentorRoutes.delete('', function (req, resp) {
    mentor_model_1.Mentor.findByIdAndDelete(req.query.id, function (err, mentorDB) {
        if (err)
            throw err;
        if (!mentorDB) {
            resp.json({ ok: false, mensaje: "No existe un mentor con ese ID" });
        }
        else {
            resp.json({ ok: true, mensaje: mentorDB });
        }
    });
});
exports.default = mentorRoutes;
