import { useRouter } from "next/router";
import styles from '../styles/Resultado.module.css';
import Estatistica from "@/components/Estatistica";
import Botao from "@/components/Botao";

export default function Resultado() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const router = useRouter();

    const { total, certas, usuario } = router.query;

    // Certifique-se de que 'totalNum' e 'certasNum' são números válidos antes de realizar a operação
    const percentual = Number(total) && Number(certas) ? Math.round((Number(certas) / Number(total)) * 100) : 0;

    return (
        <div className={styles.resultado}>
            <h1>{usuario} - Resultado Final</h1>
            <div style={{ display: "flex" }}>
                <Estatistica texto="Perguntas" valor={Number(total)} />
                <Estatistica texto="Certas" valor={Number(certas)} corFundo="#9CD2A4" />
                <Estatistica texto="Percentual" valor={`${percentual}%`} corFundo="#DE6A33" />
            </div>
            <Botao href="/" texto="Tentar Novamente" />
        </div>
    );
};
