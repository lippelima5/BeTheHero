import crypto from 'crypto';
import * as Yup from 'yup';

import connection from '../database/connection';

class OngController {

    async index(req, res) {
        const ongs = await connection('ongs').select('*');
        return res.json(ongs);
     }

    async store(req, res) {

        const schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string().required(),
            whatsapp: Yup.string().required(),
            city: Yup.string().required(),
            uf: Yup.string().required(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation Fails' });
        }

        const {name, email, whatsapp, city, uf} = req.body;
        const id = crypto.randomBytes(4).toString('HEX');

        await connection('ongs').insert({
            id,
            name,
            email,
            whatsapp,
            city,
            uf,
        })
        return res.json({ id });
    }
}

export default new OngController();