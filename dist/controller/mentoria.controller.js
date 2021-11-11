"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MentoriaDeleteController = exports.MentoriaPutController = exports.MentoriaPostController = exports.MentoriaGetController = void 0;
var mentoria_model_1 = require("../models/mentoria.model");
;
var getMentoriaQueryController = function (req) {
    var query = {};
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
        query.mentor = (req.query.mentor);
    }
    if (req.query.mentorizados != null) {
        query.mentorizados = Array(req.query.mentorizados);
    }
    return query;
};
var MentoriaGetController = function (req, resp) {
    var query = getMentoriaQueryController(req);
    mentoria_model_1.Mentoria.find(query)
        .then(function (mentoriaDB) { return resp.json({ ok: true, mensaje: mentoriaDB }); })
        .catch(function (err) { return resp.json({ ok: false, mensaje: err }); });
};
exports.MentoriaGetController = MentoriaGetController;
var MentoriaPostController = function (req, resp) {
    var mentoria = {
        titulo: req.body.titulo,
        descripcion: req.body.descripcion,
        duracion: req.body.duracion,
        fecha: req.body.fecha,
        mentor: req.body.mentor,
        mentorizados: req.body.mentorizados,
    };
    mentoria_model_1.Mentoria.create(mentoria)
        .then(function (mentoriaDB) { return resp.json({ ok: true, mensaje: mentoriaDB }); })
        .catch(function (err) { return resp.json({ ok: false, mensaje: err }); });
};
exports.MentoriaPostController = MentoriaPostController;
var MentoriaPutController = function (req, resp) {
    var query = getMentoriaQueryController(req);
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
};
exports.MentoriaPutController = MentoriaPutController;
var MentoriaDeleteController = function (req, resp) {
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
};
exports.MentoriaDeleteController = MentoriaDeleteController;
