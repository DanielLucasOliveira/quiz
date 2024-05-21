import styles from '../styles/Resposta.module.css'
import RespostaModel from "../model/resposta";

interface RespostaProps {
    resposta: RespostaModel
    indice: number
    letra: string
    backgroundLetra: string
    onResponse: (indice: number) => void
}

export default function Resposta(props: RespostaProps) {
    const resposta = props.resposta
    const respostaRevelada = resposta.revelada ? styles.resposta_revelada : ''
    return (
        <div className={styles.resposta}
            onClick={() => props.onResponse(props.indice)}>
            <div className={`${respostaRevelada} ${styles.conteudo_resposta}`}>
                <div className={styles.frente}>
                    <div className={styles.letra}
                        style={{ backgroundColor: props.backgroundLetra }}>
                        {props.letra}
                    </div>
                    <div className={styles.valor}>
                        {resposta.valor}
                    </div>
                </div>
                <div className={styles.verso}>
                    {resposta.certa ? (
                        <div className={styles.certa}>
                            <div>A resposta certa é...</div>
                            <div className={styles.valor}>{resposta.valor}</div>
                        </div>
                    ) : (
                        <div className={styles.errada}>
                            <div>A resposta informada está errada...</div>
                            <div className={styles.valor}>{resposta.valor}</div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}