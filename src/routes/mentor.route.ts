import { Router } from 'express';
import * as mentorController from '../controller/mentor.controller';

const mentorRouter = Router();

mentorRouter.get('/mentores', mentorController.MentorGetController);
mentorRouter.post('/mentores', mentorController.MentorPostController);
mentorRouter.put('/mentores', mentorController.MentorPutController);
mentorRouter.delete('/mentores', mentorController.MentorDeleteController);

export default mentorRouter;