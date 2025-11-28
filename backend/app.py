from flask import Flask, jsonify, request
from flask_cors import CORS
from data import barbearias, servicos, agendamentos
from datetime import datetime

app = Flask(__name__)
CORS(app)  # permite requests de qualquer origem localmente (ajustar em produção)
USUARIO_FAKE_ID = 1

# -------------------------------------------------------------------------

# GET /barbearias -> lista todas as barbearias
@app.route("/barbearias", methods=["GET"])
def listar_barbearias():
    return jsonify(barbearias), 200

# -------------------------------------------------------------------------

# GET /barbershops/<id> -> retorna o objeto da barbearia com array "services"
@app.route("/barbershops/<id>", methods=["GET"])
def get_barbershop(id):
    # busca por id como string (compatível com seu data.py atual)
    barbearia = next((b for b in barbearias if str(b["id"]) == str(id)), None)
    if not barbearia:
        return jsonify({"erro": "Barbearia não encontrada"}), 404

    # buscar serviços filtrando por barbearia_id (forçando string)
    services = [s for s in servicos if str(s.get("barbearia_id")) == str(id)]

    # retornar o objeto no formato que o Next espera:
    # { ...barbeariaProps, services: [...] }
    response = {**barbearia, "services": services}
    return jsonify(response), 200

# -------------------------------------------------------------------------

# POST /agendamentos -> cria um agendamento
@app.route("/agendamentos", methods=["POST"])
def criar_agendamento():
    payload = request.get_json(force=True)

    required = ["barbearia_id", "servico_id", "data", "hora"]
    if not all(k in payload for k in required):
        return jsonify({"erro": "Campos faltando. Requer: barbearia_id, servico_id, data, hora"}), 400

    usuario_id = USUARIO_FAKE_ID
    barbearia_id = int(payload["barbearia_id"])
    servico_id = int(payload["servico_id"])
    data_ag = payload["data"]
    hora_ag = payload["hora"]

    # verificar código 
    novo_horario = datetime.strptime(f"{data_ag} {hora_ag}", "%Y-%m-%d %H:%M") 

    agendamentos_existentes = [
        agendamento for agendamento in agendamentos
        if agendamento["barbearia_id"] == barbearia_id and agendamento["data"] == data_ag
    ]

    for agendamento in agendamentos_existentes:
        horario_existente = datetime.strptime(f"{agendamento['data']} {agendamento['hora']}", "%Y-%m-%d %H:%M")
        diferenca_min = abs((horario_existente - novo_horario).total_seconds() / 60)
        if diferenca_min < 30:
            return jsonify({
                "erro": "Horário indisponível.",
                "detalhe": f"Existe um agendamento muito próximo ({int(diferenca_min)} minutos de diferença)."
            }), 400

    novo_id = (agendamentos[-1]["id"] + 1) if agendamentos else 1

    novo = {
        "id": novo_id,
        "usuario_id": usuario_id,
        "barbearia_id": barbearia_id,
        "servico_id": servico_id,
        "data": data_ag,
        "hora": hora_ag
    }

    agendamentos.append(novo)
    return jsonify(novo), 201



# -------------------------------------------------------------------------


# GET /meus-agendamentos -> lista só os agendamentos do usuário mockado (sem precisar passar id)
@app.route("/meus-agendamentos", methods=["GET"])
def listar_meus_agendamentos():
    usuario_id = USUARIO_FAKE_ID

    # copiar agendamentos do usuário
    meus = [ag.copy() for ag in agendamentos if ag["usuario_id"] == usuario_id]

    for ag in meus:
        # usar str(...) nas comparações para evitar mismatch entre "1" e 1
        barbearia = next((b for b in barbearias if str(b.get("id")) == str(ag.get("barbearia_id"))), None)
        servico = next((s for s in servicos if str(s.get("id")) == str(ag.get("servico_id"))), None)

        # preencher campos úteis para o frontend
        ag["barbearia_nome"] = (barbearia.get("name") or barbearia.get("nome")) if barbearia else None
        ag["barbearia_address"] = barbearia.get("address") if barbearia else None
        ag["barbearia_image"] = barbearia.get("imageUrl") if barbearia else None

        # serviços podem ter campos em 'name' ou 'nome' — pegar ambos
        ag["servico_nome"] = servico.get("name") or servico.get("nome") if servico else None
        ag["servico_price"] = servico.get("price") if servico else None
        ag["servico_image"] = servico.get("imageUrl") if servico else None

        # opcional: converter data/hora para facilitar (não obrigatório)
        # ag["datetime_iso"] = f"{ag['data']}T{ag['hora']}:00"

        # debug rápido no console
        print("ENRICHED:", ag)

    return jsonify(meus), 200


# -------------------------------------------------------------------------

# DELETE /agendamentos/<id> -> cancela/exclui agendamento
@app.route("/agendamentos/<int:id>", methods=["DELETE"])
def cancelar_agendamento(id):
    agendamento = next((agendamento_item for agendamento_item in agendamentos if agendamento_item["id"] == id), None)
    if not agendamento:
        return jsonify({"erro": "Agendamento não encontrado"}), 404
    agendamentos.remove(agendamento)
    return jsonify({"mensagem": "Agendamento cancelado com sucesso"}), 200


# -------------------------------------------------------------------------



if __name__ == "__main__":
    # porta 5000 por padrão. Para mudar, troque host/port.
    app.run(host="0.0.0.0", port=5000, debug=True)
