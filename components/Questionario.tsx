import QuestaoModel from '@/model/questao'
import styles from '../styles/Questionario.module.css'
import Questao from './Questao'
import Botao from './Botao'


interface QuestProps {
    questao: QuestaoModel
    ultima: boolean
    questaoRespondida: (questao: QuestaoModel) => void
    toNext: () => void
}


export default function Questionario(props: QuestProps) {

    function respostaEnviada(indice: number) {
        if (props.questao.naoRespondida) {
            props.questaoRespondida(props.questao.respostaEscolhida(indice))
        }
    }

    return (
        <div className={styles.questionario}>
            {props.questao ?
                <Questao questao={props.questao} onResponse={respostaEnviada} tempoEsgotado={props.toNext} duracao={10} />
                : false}
            <Botao onClick={props.toNext} texto={props.ultima ? 'Finalizar' : 'Próxima'} />
        </div>
    )
};
