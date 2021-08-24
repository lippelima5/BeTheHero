import * as Yup from 'yup';

import connection from '../database/connection';

class SessionController {

    async store(req, res) {

        const schema = Yup.object().shape({
            id: Yup.string().required(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation Fails' });
        }

        const { id } = req.body;        
        const ong = await connection('ongs')
            .where('id', id)
            .select('name')
            .first();

        if (!ong) {
            return res.status(400).json({ error: 'Validation Fails,  unknown ID' });
        }
            
        return res.json(ong);
     }
}

export default new SessionController();
