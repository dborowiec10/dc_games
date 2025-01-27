from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
from flask_socketio import SocketIO, send, emit, join_room, leave_room
import json
from datetime import datetime, timedelta
import time
from jwt import (
    JWT,
    jwk_from_dict,
    jwk_from_pem,
)
import datastore
import marketplace


app = Flask(__name__)
app.config['CORS_HEADERS'] = 'Content-Type'
app.config['SECRET_KEY'] = 'adminsupersecretkey'
cors = CORS(app)
socketio = SocketIO(app, cors_allowed_origins="*")

jwt_key_priv = None
jwt_key_pub = None

socketio_listeners = {
    'connect': []
}

@socketio.on('connect')
def connect():
    user = datastore.find_user_by_id(request.args["uid"])
    if user:
        user.async_session = request.sid

@socketio.on('disconnect')
def disconnect():
    user = datastore.find_user_by_session_id(request.sid)
    if user:
        user.async_session = None

def send_message(channel, message, broadcast=False):
    socketio.emit(channel, message, broadcast=broadcast)

def start():
    global jwt_key_priv
    global jwt_key_pub

    # load public and private keys for jwt
    with open('auth.key', 'rb') as prv_kf:
        jwt_key_priv = jwk_from_pem(prv_kf.read())

    with open('auth.key.pub', 'rb') as pub_kf:
        jwt_key_pub = jwk_from_pem(pub_kf.read())

    # run flask app
    app.run(debug=False)

    # run socket server
    socketio.run(app)
    

# validate the password provided equals the stored password for a user
def check_password(user, password):
    if user.password == password:
        return True
    else:
        return False

# create new jwt for user (during login)
def jwt_for_user(user):
    init = time.time()
    exp = datetime.now() + timedelta(hours=3)
    exp = time.mktime(exp.timetuple())
    message = {
        'iss': 'dc_games',
        'sub': user.id,
        'iat': init,
        'exp': exp
    }
    jwt = JWT()
    return jwt.encode(message, jwt_key_priv, 'RS256'), exp

# decode jwt and retrieve specific user associated with it
def get_user_from_req():
    auth_header = request.headers.get('Authorization')
    if auth_header:
        auth_token = auth_header.split(" ")[1]
    else:
        auth_token = ''
    if auth_token:
        jwt = JWT()
        m = jwt.decode(auth_token, jwt_key_pub)
        user_id = m['sub']
        user = datastore.find_user_by_id(user_id)
        now = datetime.now()
        exp = datetime.utcfromtimestamp(m['exp'])
        if m['iss'] == 'dc_games' and user and exp > now:
            return user
        else:
            return None
    else:
        return None


# endpoint for logging a user in
@app.route('/login', methods=['POST'])
@cross_origin()
def login_user():
    data = json.loads(request.data)
    user = None
    print(data)
    if 'username' in data and data['username'] != None and 'password' in data and data['password'] != None:
        user = datastore.find_user_by_username(data['username'])
    if user != None and check_password(user, data['password']):
        jwt, exp = jwt_for_user(user)
        user.jwt = jwt
        return jsonify(data={"id_token": jwt, "expires_at": exp, "user": user.serialize()}), 200
    else:
        if user != None:
            user.jwt = None
        return jsonify(data={"error": "Incorrect username or password!"}), 401


# endpoint for retrieving areas
@app.route('/areas', methods=['GET'])
@cross_origin()
def get_areas():
    user = get_user_from_req()
    if user == None:
        return jsonify(data={"error": "Unauthorized!"}), 401
    else:
        return jsonify(areas=[a.serialize() for a in datastore.get_areas()]), 200


# endpoint for retrieving areas owned by specific company
@app.route('/areas/company/<id>', methods=['GET'])
@cross_origin()
def get_areas_for_company(id):
    user = get_user_from_req()
    if user == None:
        return jsonify(data={"error": "Unauthorized!"}), 401
    else:
        comp = datastore.find_company_by_id(id)
        if comp == None:
            return jsonify(data={"error": "Could not find specified company!"}), 200
        else:
            areas = comp.get_areas()
            return jsonify(areas=[a.serialize() for a in areas]), 200


# endpoint for retrieving building types
@app.route('/building_types', methods=['GET'])
@cross_origin()
def get_building_types():
    user = get_user_from_req()
    if user == None:
        return jsonify(data={"error": "Unauthorized!"}), 401
    else:
        return jsonify(building_types=datastore.get_building_types()), 200


# endpoint for retrieving rack types
@app.route('/rack_types', methods=['GET'])
@cross_origin()
def get_rack_types():
    user = get_user_from_req()
    if user == None:
        return jsonify(data={"error": "Unauthorized!"}), 401
    else:
        return jsonify(rack_types=datastore.get_rack_types()), 200


# endpoint for retrieving rack switch types
@app.route('/rack_switch_types', methods=['GET'])
@cross_origin()
def get_rack_switch_types():
    user = get_user_from_req()
    if user == None:
        return jsonify(data={"error": "Unauthorized!"}), 401
    else:
        return jsonify(rack_switch_types=datastore.get_rack_switch_types()), 200

# endpoint for retrieving rack pdu types
@app.route('/rack_pdu_types', methods=['GET'])
@cross_origin()
def get_rack_pdu_types():
    user = get_user_from_req()
    if user == None:
        return jsonify(data={"error": "Unauthorized!"}), 401
    else:
        return jsonify(rack_pdu_types=datastore.get_rack_pdu_types()), 200

# endpoint for retrieving accelerator types
@app.route('/accelerator_types', methods=['GET'])
@cross_origin()
def get_accelerator_types():
    user = get_user_from_req()
    if user == None:
        return jsonify(data={"error": "Unauthorized!"}), 401
    else:
        return jsonify(accelerator_types=datastore.get_accelerator_types()), 200

# endpoint for retrieving cpu types
@app.route('/cpu_types', methods=['GET'])
@cross_origin()
def get_cpu_types():
    user = get_user_from_req()
    if user == None:
        return jsonify(data={"error": "Unauthorized!"}), 401
    else:
        return jsonify(cpu_types=datastore.get_cpu_types()), 200

# endpoint for retrieving memory types
@app.route('/memory_types', methods=['GET'])
@cross_origin()
def get_memory_types():
    user = get_user_from_req()
    if user == None:
        return jsonify(data={"error": "Unauthorized!"}), 401
    else:
        return jsonify(memory_types=datastore.get_memory_types()), 200


# endpoint for retrieving psu types
@app.route('/psu_types', methods=['GET'])
@cross_origin()
def get_psu_types():
    user = get_user_from_req()
    if user == None:
        return jsonify(data={"error": "Unauthorized!"}), 401
    else:
        return jsonify(psu_types=datastore.get_psu_types()), 200

# endpoint for retrieving server cooling types
@app.route('/server_cooling_types', methods=['GET'])
@cross_origin()
def get_server_cooling_types():
    user = get_user_from_req()
    if user == None:
        return jsonify(data={"error": "Unauthorized!"}), 401
    else:
        return jsonify(server_cooling_types=datastore.get_server_cooling_types()), 200


# endpoint for retrieving server types
@app.route('/server_types', methods=['GET'])
@cross_origin()
def get_server_types():
    user = get_user_from_req()
    if user == None:
        return jsonify(data={"error": "Unauthorized!"}), 401
    else:
        return jsonify(server_types=datastore.get_server_types()), 200
        

# endpoint for retrieving companies
@app.route('/companies', methods=['GET'])
@cross_origin()
def get_companies():
    user = get_user_from_req()
    if user == None:
        return jsonify(data={"error": "Unauthorized!"}), 401
    else:
        return jsonify(companies=[c.serialize() for c in datastore.get_companies()]), 200


# endpoint for retrieving a specific company
@app.route('/companies/<id>', methods=['GET'])
@cross_origin()
def get_company(id):
    user = get_user_from_req()
    if user == None:
        return jsonify(data={"error": "Unauthorized!"}), 401
    else:
        comp = datastore.find_company_by_id(id)
        if comp == None:
            return jsonify(data={"error": "Company not found!"}), 200
        else:
            return jsonify(company=comp), 200
                

# endpoint for retrieving users
@app.route('/users', methods=['GET'])
@cross_origin()
def get_users():
    user = get_user_from_req()
    if user == None:
        return jsonify(data={"error": "Unauthorized!"}), 401
    else:
        return jsonify(users=[u.serialize() for u in datastore.get_users()]), 200


# endpoint for retrieving a specific user
@app.route('/users/<id>', methods=['GET'])
@cross_origin()
def get_user(id):
    user = get_user_from_req()
    if user == None:
        return jsonify(data={"error": "Unauthorized!"}), 401
    else:
        usr = datastore.find_user_by_id(id)
        if usr == None:
            return jsonify(data={"error": "User not found!"}), 200 
        else:
            return jsonify(user=usr), 200        


# endpoint for buying areas
@app.route('/areas', methods=['POST'])
@cross_origin()
def buy_area():
    data = json.loads(request.data)
    user = get_user_from_req()
    if user == None:
        return jsonify(data={"error": "Unauthorized!"}), 401
    elif data == None:
        return jsonify(data={"error": "Bad Request!"}), 400
    else:
        res, error = marketplace.buy_area(user, data["id"])
        if error != None:
            return jsonify(data={"error": error})
        else:
            return jsonify(data={"success": res}), 200


# endpoint for buying buildings
@app.route('/buildings', methods=['POST'])
@cross_origin()
def buy_building():
    data = json.loads(request.data)
    user = get_user_from_req()
    if user == None:
        return jsonify(data={"error": "Unauthorized!"}), 401
    elif data == None:
        return jsonify(data={"error": "Bad Request!"}), 400
    else:
        res, error = marketplace.buy_building(user, data["type"])
        if error != None:
            return jsonify(data={"error": error})
        else:
            return jsonify(data={"success": res}), 200

# endpoint for buying racks
@app.route('/racks', methods=['POST'])
@cross_origin()
def buy_rack():
    data = json.loads(request.data)
    user = get_user_from_req()
    if user == None:
        return jsonify(data={"error": "Unauthorized!"}), 401
    elif data == None:
        return jsonify(data={"error": "Bad Request!"}), 400
    else:
        res, error = marketplace.buy_rack(user, data["type"], data["quantity"])
        if error != None:
            return jsonify(data={"error": error})
        else:
            return jsonify(data={"success": res}), 200


# endpoint for buying servers
@app.route('/servers', methods=['POST'])
@cross_origin()
def buy_server():
    data = json.loads(request.data)
    user = get_user_from_req()
    if user == None:
        return jsonify(data={"error": "Unauthorized!"}), 401
    elif data == None:
        return jsonify(data={"error": "Bad Request!"}), 400
    else:
        res, error = marketplace.buy_server(user, data["type"], data["quantity"])
        if error != None:
            return jsonify(data={"error": error})
        else:
            return jsonify(data={"success": res}), 200
            

# endpoint for retrieving buildings owned by specific company
@app.route('/buildings/company/<id>', methods=['GET'])
@cross_origin()
def get_buildings_for_company(id):
    user = get_user_from_req()
    if user == None:
        return jsonify(data={"error": "Unauthorized!"}), 401
    else:
        comp = datastore.find_company_by_id(id)
        if comp == None:
            return jsonify(data={"error": "Could not find specified company!"}), 200
        else:
            return jsonify(buildings=list(map(lambda b: b.serialize(), comp.get_buildings()))), 200


# endpoint for retrieving racks owned by specific company
@app.route('/racks/company/<id>', methods=['GET'])
@cross_origin()
def get_racks_for_company(id):
    user = get_user_from_req()
    if user == None:
        return jsonify(data={"error": "Unauthorized!"}), 401
    else:
        comp = datastore.find_company_by_id(id)
        if comp == None:
            return jsonify(data={"error": "Could not find specified company!"}), 200
        else:
            return jsonify(racks=list(map(lambda r: r.serialize(), comp.get_racks()))), 200


# endpoint for retrieving rack switches owned by specific company
@app.route('/rack_switches/company/<id>', methods=['GET'])
@cross_origin()
def get_rack_switches_for_company(id):
    user = get_user_from_req()
    if user == None:
        return jsonify(data={"error": "Unauthorized!"}), 401
    else:
        comp = datastore.find_company_by_id(id)
        if comp == None:
            return jsonify(data={"error": "Could not find specified company!"}), 200
        else:
            return jsonify(rack_switches=list(map(lambda r: r.serialize(), comp.get_rack_switches()))), 200


# endpoint for retrieving rack pdus owned by specific company
@app.route('/rack_pdus/company/<id>', methods=['GET'])
@cross_origin()
def get_rack_pdus_for_company(id):
    user = get_user_from_req()
    if user == None:
        return jsonify(data={"error": "Unauthorized!"}), 401
    else:
        comp = datastore.find_company_by_id(id)
        if comp == None:
            return jsonify(data={"error": "Could not find specified company!"}), 200
        else:
            return jsonify(rack_pdus=list(map(lambda r: r.serialize(), comp.get_rack_pdus()))), 200


# endpoint for retrieving servers owned by specific company
@app.route('/servers/company/<id>', methods=['GET'])
@cross_origin()
def get_servers_for_company(id):
    user = get_user_from_req()
    if user == None:
        return jsonify(data={"error": "Unauthorized!"}), 401
    else:
        comp = datastore.find_company_by_id(id)
        if comp == None:
            return jsonify(data={"error": "Could not find specified company!"}), 200
        else:
            return jsonify(servers=list(map(lambda s: s.serialize(), comp.get_servers()))), 200


# endpoint for retrieving cpus owned by specific company
@app.route('/cpus/company/<id>', methods=['GET'])
@cross_origin()
def get_cpus_for_company(id):
    user = get_user_from_req()
    if user == None:
        return jsonify(data={"error": "Unauthorized!"}), 401
    else:
        comp = datastore.find_company_by_id(id)
        if comp == None:
            return jsonify(data={"error": "Could not find specified company!"}), 200
        else:
            return jsonify(cpus=list(map(lambda s: s.serialize(), comp.get_cpus()))), 200


# endpoint for retrieving memories owned by specific company
@app.route('/memories/company/<id>', methods=['GET'])
@cross_origin()
def get_memories_for_company(id):
    user = get_user_from_req()
    if user == None:
        return jsonify(data={"error": "Unauthorized!"}), 401
    else:
        comp = datastore.find_company_by_id(id)
        if comp == None:
            return jsonify(data={"error": "Could not find specified company!"}), 200
        else:
            return jsonify(memories=list(map(lambda s: s.serialize(), comp.get_memories()))), 200


# endpoint for retrieving accelerators owned by specific company
@app.route('/accelerators/company/<id>', methods=['GET'])
@cross_origin()
def get_accelerators_for_company(id):
    user = get_user_from_req()
    if user == None:
        return jsonify(data={"error": "Unauthorized!"}), 401
    else:
        comp = datastore.find_company_by_id(id)
        if comp == None:
            return jsonify(data={"error": "Could not find specified company!"}), 200
        else:
            return jsonify(accelerators=list(map(lambda s: s.serialize(), comp.get_accelerators()))), 200


# endpoint for retrieving psus owned by specific company
@app.route('/psus/company/<id>', methods=['GET'])
@cross_origin()
def get_psus_for_company(id):
    user = get_user_from_req()
    if user == None:
        return jsonify(data={"error": "Unauthorized!"}), 401
    else:
        comp = datastore.find_company_by_id(id)
        if comp == None:
            return jsonify(data={"error": "Could not find specified company!"}), 200
        else:
            return jsonify(psus=list(map(lambda s: s.serialize(), comp.get_psus()))), 200


# endpoint for retrieving server_coolings owned by specific company
@app.route('/server_coolings/company/<id>', methods=['GET'])
@cross_origin()
def get_server_coolings_for_company(id):
    user = get_user_from_req()
    if user == None:
        return jsonify(data={"error": "Unauthorized!"}), 401
    else:
        comp = datastore.find_company_by_id(id)
        if comp == None:
            return jsonify(data={"error": "Could not find specified company!"}), 200
        else:
            return jsonify(server_coolings=list(map(lambda s: s.serialize(), comp.get_server_coolings()))), 200