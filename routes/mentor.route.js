"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var mentor_model_1 = require("../models/mentor.model");
var mentorRoutes = (0, express_1.Router)();
;
var getMentorQuery = function (req) {
    var query = {};
    if (req.query.dni != null) {
        query.dni = Number(req.query.dni);
    }
    query.dniup = Number(req.query.dniup);
    if (req.query.mentoria != null) {
        query.mentoria = Array(req.query.mentoria);
    }
    if (req.query.puntaje != null) {
        query.puntaje = Number(req.query.puntaje);
    }
    return query;
};
mentorRoutes.get('/', function (req, resp) {
    var query = getMentorQuery(req);
    mentor_model_1.Mentor.find(query)
        .then(function (mentorDB) { return resp.json({ ok: true, mensaje: mentorDB }); })
        .catch(function (err) { return resp.json({ ok: false, mensaje: err }); });
});
mentorRoutes.post('', function (req, resp) {
    var persona = {
        dni: req.body.dni,
        dniup: req.body.dniup,
        mentoria: req.body.mentoria,
        puntaje: req.body.puntaje
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
