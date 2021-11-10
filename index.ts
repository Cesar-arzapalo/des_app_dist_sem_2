import { Server } from './server/server';
import cors  from 'cors';

import mongoose, {ConnectOptions} from 'mongoose';
import bodyParser from 'body-parser';
import personaRoutes from './routes/persona.route';
import mentorRoutes from './routes/mentor.route';
import mentoriaRoutes from './routes/mentoria.route';


const servidor = new Server(2800);
//Body parser
servidor.app.use(bodyParser.urlencoded({extended:true}));
servidor.app.use(bodyParser.json());
servidor.app.use(cors())

//rutas del app
servidor.app.use('/personas', personaRoutes);
servidor.app.use('/mentoria', mentoriaRoutes);
servidor.app.use('/mentores', mentorRoutes);


//conectar db
mongoose.connect('mongodb+srv://admin:12345@cluster0.bcg8b.mongodb.net/distribuidos?retryWrites=true&w=majority',
                {useNewUrlParser: true, useUnifiedTopology: true}  as ConnectOptions, (err) =>{
                    if (err) throw err;
                    console.log('Base de datos en linea');
                });
//levantar express
servidor.start(()=> {
    console.log(`Servidor de la base de datos corriendo en el puerto ${servidor.port}`);
});
