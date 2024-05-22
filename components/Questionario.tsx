import QuestaoModel from '@/model/questao'
import styles from '../styles/Questionario.module.css'
import Questao from './Questao'
import Botao from './Botao'
import { useRouter } from 'next/router'


interface QuestProps {
    questao: QuestaoModel
    ultima: boolean
    questaoRespondida: (questao: QuestaoModel) => void
    toNext: () => void
}


export default function Questionario(props: QuestProps) {

    const router = useRouter()

    const { dificuldade } = router.query

    const duracao = [
        { tempo: 25 },
        { tempo: 10 },
        { tempo: 5 },
    ];


    function respostaEnviada(indice: number) {
        if (props.questao.naoRespondida) {
            props.questaoRespondida(props.questao.respostaEscolhida(indice))
        }
    }

    return (
        <div className={styles.questionario}>
            {props.questao ?
                <Questao questao={props.questao} onResponse={respostaEnviada} tempoEsgotado={props.toNext} duracao={duracao[Number(dificuldade) - 1].tempo} />
                : false}
            <Botao onClick={props.toNext} texto={props.ultima ? 'Finalizar' : 'Próxima'} />
        </div>
    )
};
