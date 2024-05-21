import QuestaoModel from "@/model/questao";
import styles from '../styles/Questao.module.css'
import Enunciado from "./Enunciado";
import Resposta from "./Resposta";
import Temporizador from "./Temporizador";

interface QuestaoProps {
    questao: QuestaoModel
    duracao: number
    onResponse: (indice: number) => void
    tempoEsgotado: () => void
}

const letras = [
    { letra: 'A', cor: '#E40F0F' },
    { letra: 'B', cor: '#E4720F' },
    { letra: 'C', cor: '#E9CA17' },
    { letra: 'D', cor: '#9ADD12' },
]

export default function Questao(props: QuestaoProps) {
    const questao = props.questao;

    function renderizarRespostas() {
        return questao.respostas.map((resp, i) => {
            console.log(resp);
            
            return <Resposta key={`${questao.id}-${i}`} resposta={resp} indice={i} letra={letras[i].letra} backgroundLetra={letras[i].cor} onResponse={props.onResponse} />
        })
    }

    return (
        <div className={styles.questao}>
            <Enunciado texto={questao.enunciado} />
            <Temporizador key={questao.id} duracao={props.duracao} tempoEsgotado={props.tempoEsgotado} />
            {renderizarRespostas()}
        </div>
    )
};
