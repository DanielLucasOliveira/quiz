import Questao from "@/components/Questao";
import QuestaoModel from "@/model/questao";
import RespostaModel from "@/model/resposta";
import { useState } from "react";

const questaoTeste = new QuestaoModel(1, "Melhor cor?", [
  RespostaModel.errada("Vermelho"),
  RespostaModel.errada("Laranja"),
  RespostaModel.errada("Azul"),
  RespostaModel.certa("Verde")])
export default function Home() {

  const [questao, setQuestao] = useState(questaoTeste)

  function respostaEnviada(indice: number) {
    setQuestao(questao.respostaEscolhida(indice))
    console.log(indice);
  }

  function tempoEsgotado() {
    if(questao.naoRespondida){
      setQuestao(questao.respostaEscolhida(-1))
    }
  }


  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh"
    }}>
      <Questao questao={questaoTeste} onResponse={respostaEnviada} tempoEsgotado={tempoEsgotado}/>
    </div>
  );
}
