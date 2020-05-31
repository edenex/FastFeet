import * as Yup from 'yup';
import Recipient from '../models/Recipient';

class RecipientController {
  // Médoto store: Cadastrar destinatário
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      address: Yup.string().required(),
      number: Yup.string().notRequired(),
      complement: Yup.string().notRequired(),
      neighborhood: Yup.string().required(),
      city: Yup.string().required(),
      state: Yup.string()
        .required()
        .length(2),
      zipcode: Yup.string()
        .required()
        .length(8),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' });
    }

    // Recipient.findOne: procura algo (select) no banco de dados
    const recipientExists = await Recipient.findOne({
      where: { name: req.body.name },
    });

    if (recipientExists) {
      return res.status(400).json({ error: 'Recipient already exists.' });
    }

    // Recipient.create: Cria destinatário na base de dados
    const {
      id,
      name,
      address,
      number,
      complement,
      neighborhood,
      city,
      state,
      zipcode,
    } = await Recipient.create(req.body);

    return res.json({
      id,
      name,
      address,
      number,
      complement,
      neighborhood,
      city,
      state,
      zipcode,
    });
  }

  // Médoto update: alterar destinatário
  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      address: Yup.string().required(),
      number: Yup.string().notRequired(),
      complement: Yup.string().notRequired(),
      neighborhood: Yup.string().required(),
      city: Yup.string().required(),
      state: Yup.string()
        .required()
        .length(2),
      zipcode: Yup.string()
        .required()
        .length(8),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' });
    }

    const { name } = req.body;

    const recipientExists = await Recipient.findOne({ where: { name } });

    if (!recipientExists) {
      return res.status(400).json({ error: 'Recipient does not existis.' });
    }

    const {
      id,
      address,
      number,
      complement,
      neighborhood,
      city,
      state,
      zipcode,
    } = await recipientExists.update(req.body);

    return res.json({
      id,
      name,
      address,
      number,
      complement,
      neighborhood,
      city,
      state,
      zipcode,
    });
  }
}

export default new RecipientController();
