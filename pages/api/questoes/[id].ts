import { NextApiRequest, NextApiResponse } from "next";
import questoes from "../bancoDeQuestoes";
export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query;

    if (typeof id === 'string') {
        const questaoId = parseInt(id);
        
        const questao = questoes.filter(questao => questao.id === questaoId);

        if (questao.length === 1) {
            const selecionada = questao[0].embaralharRespostas();
            res.status(200).json(selecionada.paraObjeto());
        } else {
            res.status(204).send({ error: 'No content' });
        }
    } else {
        res.status(400).json({ error: 'Invalid id' }); // Retorna erro se 'id' não for string
    }
}