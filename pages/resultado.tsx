import { useRouter } from "next/router";
import styles from '../styles/Resultado.module.css';
import Estatistica from "@/components/Estatistica";
import Botao from "@/components/Botao";

export default function Resultado() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const router = useRouter();

    const { total, certas } = router.query;

    // Verifique se 'certas' e 'total' não são 'undefined' e converta-os para números
    const totalNum = Number(total);
    const certasNum = Number(certas);

    // Certifique-se de que 'totalNum' e 'certasNum' são números válidos antes de realizar a operação
    const percentual = totalNum && certasNum ? Math.round((certasNum / totalNum) * 100) : 0;

    return (
        <div className={styles.resultado}>
            <h1>Resultado Final</h1>
            <div style={{ display: "flex" }}>
                <Estatistica texto="Perguntas" valor={totalNum} />
                <Estatistica texto="Certas" valor={certasNum} corFundo="#9CD2A4" />
                <Estatistica texto="Percentual" valor={`${percentual}%`} corFundo="#DE6A33" />
            </div>
            <Botao href="/" texto="Tentar Novamente" />
        </div>
    );
};
