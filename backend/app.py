from flask import Flask, jsonify, request
from flask_cors import CORS
from data import barbearias, servicos, agendamentos
from datetime import datetime

app = Flask(__name__)
CORS(app)  # permite requests de qualquer origem localmente (ajuste em produção)

# GET /barbearias -> lista todas as barbearias
@app.route("/barbearias", methods=["GET"])
def listar_barbearias():
    return jsonify(barbearias), 200













# --- NOVA ROTA compatível com o frontend Next ---
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






# POST /agendamentos -> cria um agendamento
@app.route("/agendamentos", methods=["POST"])
def criar_agendamento():
    payload = request.get_json(force=True)

    # validação simples
    required = ["usuario_id", "barbearia_id", "servico_id", "data", "hora"]
    if not all(k in payload for k in required):
        return jsonify({"erro": "Campos faltando. Requer: usuario_id, barbearia_id, servico_id, data, hora"}), 400

    usuario_id = int(payload["usuario_id"])
    barbearia_id = int(payload["barbearia_id"])
    servico_id = int(payload["servico_id"])
    data_ag = payload["data"]
    hora_ag = payload["hora"]

    # Converter novo horário em datetime
    novo_horario = datetime.strptime(f"{data_ag} {hora_ag}", "%Y-%m-%d %H:%M")

    # Buscar agendamentos da mesma barbearia no mesmo dia
    agendamentos_existentes = [
        agendamento for agendamento in agendamentos
        if agendamento["barbearia_id"] == barbearia_id and agendamento["data"] == data_ag
    ]

    # Verificar conflito de horário (mínimo 30 minutos)
    for agendamento in agendamentos_existentes:
        horario_existente = datetime.strptime(f"{agendamento['data']} {agendamento['hora']}", "%Y-%m-%d %H:%M")

        diferenca_min = abs((horario_existente - novo_horario).total_seconds() / 60)

        if diferenca_min < 30:
            return jsonify({
                "erro": "Horário indisponível.",
                "detalhe": f"Existe um agendamento muito próximo ({int(diferenca_min)} minutos de diferença)."
            }), 400

    # Se passou na validação, criar o agendamento
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

# GET /meus-agendamentos/<usuario_id> -> lista só os agendamentos do usuário
@app.route("/meus-agendamentos/<int:usuario_id>", methods=["GET"])
def listar_meus_agendamentos(usuario_id):
    meus = [agendamento.copy() for agendamento in agendamentos if agendamento["usuario_id"] == usuario_id]

    # enriquecer com nome da barbearia e nome do serviço
    for agendamento in meus:
        barbearia = next((barbearia_item for barbearia_item in barbearias if barbearia_item["id"] == agendamento["barbearia_id"]), None)
        servico = next((servico_item for servico_item in servicos if servico_item["id"] == agendamento["servico_id"]), None)
        # ajustar caso os campos existam em pt/ing nos mocks
        agendamento["barbearia_nome"] = barbearia.get("name") or barbearia.get("nome") if barbearia else None
        agendamento["servico_nome"] = servico.get("nome") if servico else None
    return jsonify(meus), 200

# DELETE /agendamentos/<id> -> cancela/exclui agendamento
@app.route("/agendamentos/<int:id>", methods=["DELETE"])
def cancelar_agendamento(id):
    agendamento = next((agendamento_item for agendamento_item in agendamentos if agendamento_item["id"] == id), None)
    if not agendamento:
        return jsonify({"erro": "Agendamento não encontrado"}), 404
    agendamentos.remove(agendamento)
    return jsonify({"mensagem": "Agendamento cancelado com sucesso"}), 200

if __name__ == "__main__":
    # porta 5000 por padrão. Para mudar, troque host/port.
    app.run(host="0.0.0.0", port=5000, debug=True)
