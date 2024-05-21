import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import styles from '../styles/Temporizador.module.css'

interface TempoProps {
    duracao: number
    tempoEsgotado: () => void
}

export default function Temporizador(props: TempoProps) {
    return (
        <div className={styles.temporizador}>
            <CountdownCircleTimer
                size={120}
                isPlaying
                duration={props.duracao}
                onComplete={props.tempoEsgotado}
                colors={['#76E917', '#F2DA01', '#F23101']}
                colorsTime={[10, 5, 0]} >
                {({ remainingTime }) => remainingTime}
            </CountdownCircleTimer>
        </div>
    )
};
