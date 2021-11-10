"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var server_1 = require("./server/server");
var cors_1 = __importDefault(require("cors"));
var mongoose_1 = __importDefault(require("mongoose"));
var body_parser_1 = __importDefault(require("body-parser"));
var persona_route_1 = __importDefault(require("./routes/persona.route"));
var mentor_route_1 = __importDefault(require("./routes/mentor.route"));
var servidor = new server_1.Server(2800);
//Body parser
servidor.app.use(body_parser_1.default.urlencoded({ extended: true }));
servidor.app.use(body_parser_1.default.json());
servidor.app.use((0, cors_1.default)());
//rutas del app
servidor.app.use('/personas', persona_route_1.default);
servidor.app.use('/mentores', mentor_route_1.default);
//conectar db
mongoose_1.default.connect('mongodb+srv://admin:12345@cluster0.bcg8b.mongodb.net/distribuidos?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true }, function (err) {
    if (err)
        throw err;
    console.log('Base de datos en linea');
});
//levantar express
servidor.start(function () {
    console.log("Servidor de la base de datos corriendo en el puerto " + servidor.port);
});
