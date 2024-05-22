import Questionario from "@/components/Questionario";
import QuestaoModel from "@/model/questao";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const BASE_URL = 'http://localhost:3000/api'

export default function Home() {

  const router = useRouter()

  console.log(router.query);
  

  const [ids, setIds] = useState<number[]>([])
  const [questao, setQuestao] = useState<QuestaoModel>()
  const [corretas, setCorretas] = useState<number>(0)

  async function loadingQuestionsIds() {
    const resp = await fetch(`${BASE_URL}/questionario`)
    const idsQuestoes = await resp.json();
    setIds(idsQuestoes)
  }

  async function loadingQuestions(idQuestao: number) {
    const resp = await fetch(`${BASE_URL}/questoes/${idQuestao}`)
    const json = await resp.json();
    setQuestao(QuestaoModel.criarComjson(json))

  }

  function questaoRespondida(questao: QuestaoModel) {
    setQuestao(questao)
    const certa = questao.acertou
    setCorretas(corretas + (certa ? 1 : 0))
  }

  function nextId() {
    if (questao) {
      return ids[ids.indexOf(questao.id) + 1]
    }
  }

  function toNext() {
    const proximoId = nextId()
    proximoId ? proximaPergunta(proximoId) : finalizar()
  }

  function proximaPergunta(proximoId: number) {
    loadingQuestions(proximoId)
  }

  function finalizar() {
    router.push({
      pathname: "/resultado",
      query: {
        total: ids.length,
        certas: corretas,
        usuario: router.query.username
      }
    })
  }

  useEffect(() => {
    loadingQuestionsIds();
  }, [])

  useEffect(() => {
    ids.length > 0 && loadingQuestions(ids[0])
  }, [ids])


  return questao ? (

    <Questionario questao={questao} ultima={nextId() === undefined} questaoRespondida={questaoRespondida} toNext={toNext} />

  ) : false ;
}


