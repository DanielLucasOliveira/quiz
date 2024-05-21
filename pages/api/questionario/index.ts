import { NextApiRequest, NextApiResponse } from "next";
import questoes from "../bancoDeQuestoes";
import embaralharArray from "@/functions/embaralharArray";
export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const ids = questoes.map(questao => questao.id)
    res.status(200).json(embaralharArray(ids))
};
