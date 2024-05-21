import embaralharArray from "@/functions/embaralharArray"
import RespostaModel from "./resposta"

export default class QuestaoModel {
    #id: number
    #enunciado: string
    #respostas: RespostaModel[]
    #acertou: boolean
    // #respondida: boolean

    constructor(id: number, enunciado: string, respostas: any[], acertou = false) {
        this.#id = id
        this.#enunciado = enunciado
        this.#respostas = respostas
        this.#acertou = acertou
    }


    get id(): number {
        return this.#id
    }
    get enunciado(): string {
        return this.#enunciado
    }
    get respostas(): any[] {
        return this.#respostas
    }
    get acertou(): boolean {
        return this.#acertou
    }

    get respondida() {
        for (let resposta of this.#respostas) {
            if (resposta.revelada) return true
        }
        return false
    }

    get naoRespondida() {
        return !this.respondida
    }

    respostaEscolhida(indice: number): QuestaoModel {
        const acertou = this.#respostas[indice]?.certa
        const respostas = this.#respostas.map((resp, i) => {
            const respostaSelecionada = indice === i
            const deveRevelar = respostaSelecionada || resp.certa
            return deveRevelar ? resp.revelar() : resp
        })
        return new QuestaoModel(this.id, this.enunciado, respostas, acertou)
    }

    embaralharRespostas(): QuestaoModel {
        let respostasEmbaralhadas = embaralharArray(this.#respostas)
        return new QuestaoModel(this.#id, this.#enunciado, respostasEmbaralhadas, this.#acertou)
    }

    paraObjeto() {
        return {
            id: this.#id,
            enunciado: this.#enunciado,
            respostas: this.#respostas.map(resp => resp.paraObjeto()),
            respondida: this.respondida,
            acertou: this.#acertou
        }
    }

}