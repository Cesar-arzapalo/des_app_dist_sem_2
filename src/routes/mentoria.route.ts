import { Router } from "express";
import { MentoriaDeleteController, MentoriaGetController, MentoriaPostController, MentoriaPutController } from "../controller/mentoria.controller";

const mentoriaRoutes = Router();

mentoriaRoutes.get('/', MentoriaGetController);

mentoriaRoutes.post('', MentoriaPostController);

mentoriaRoutes.put('', MentoriaPutController);

mentoriaRoutes.delete('', MentoriaDeleteController);

export default mentoriaRoutes;