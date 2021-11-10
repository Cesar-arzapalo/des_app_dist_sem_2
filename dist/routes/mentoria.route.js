"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var mentoria_model_1 = require("../models/mentoria.model");
var mentoriaRoutes = (0, express_1.Router)();
;
var getMentoriaQuery = function (req) {
    var query = {};
    query.titulo = String(req.query.titulo);
    query.descripcion = String(req.query.descripcion);
    query.duracion = Number(req.query.duracion);
    query.fecha = new Date(req.query.fecha);
    query.mentor = (req.query.mentor);
    query.mentorizados = Array(req.query.mentorizados);
    return query;
};
mentoriaRoutes.get('/', function (req, resp) {
    var query = getMentoriaQuery(req);
    mentoria_model_1.Mentoria.find(query)
        .then(function (mentoriaDB) { return resp.json({ ok: true, mensaje: mentoriaDB }); })
        .catch(function (err) { return resp.json({ ok: false, mensaje: err }); });
});
mentoriaRoutes.post('', function (req, resp) {
    var persona = {
        nivel: req.body.nivel,
        datos_personales: req.body.datos_personales,
        tipo_mentor: req.body.tipo_mentor,
        puntaje: req.body.puntaje,
        perfil: req.body.perfil,
        mentorias: req.body.mentorias,
    };
    mentoria_model_1.Mentoria.create(persona)
        .then(function (mentoriaDB) { return resp.json({ ok: true, mensaje: mentoriaDB }); })
        .catch(function (err) { return resp.json({ ok: false, mensaje: err }); });
});
mentoriaRoutes.put('', function (req, resp) {
    var query = getMentoriaQuery(req);
    console.log(query);
    console.log(req.query);
    mentoria_model_1.Mentoria.findByIdAndUpdate(req.query.id, query, { new: true }, function (err, mentoriaDB) {
        if (err)
            throw err;
        if (!mentoriaDB) {
            resp.json({ ok: false, mensaje: "No existe un mentor con ese ID" });
        }
        else {
            resp.json({ ok: true, mensaje: mentoriaDB });
        }
    });
});
mentoriaRoutes.delete('', function (req, resp) {
    mentoria_model_1.Mentoria.findByIdAndDelete(req.query.id, function (err, mentoriaDB) {
        if (err)
            throw err;
        if (!mentoriaDB) {
            resp.json({ ok: false, mensaje: "No existe un mentor con ese ID" });
        }
        else {
            resp.json({ ok: true, mensaje: mentoriaDB });
        }
    });
});
exports.default = mentoriaRoutes;
