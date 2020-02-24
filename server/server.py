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
        return jsonify(areas=[a.serialize() for a in datastore.areas]), 200


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
        return jsonify(buildings=datastore.building_types), 200


# endpoint for retrieving rack types
@app.route('/rack_types', methods=['GET'])
@cross_origin()
def get_rack_types():
    user = get_user_from_req()
    if user == None:
        return jsonify(data={"error": "Unauthorized!"}), 401
    else:
        return jsonify(rack_types=datastore.rack_types), 200


# endpoint for retrieving rack switch types
@app.route('/rack_switch_types', methods=['GET'])
@cross_origin()
def get_rack_switch_types():
    user = get_user_from_req()
    if user == None:
        return jsonify(data={"error": "Unauthorized!"}), 401
    else:
        return jsonify(rack_switch_types=datastore.rack_switch_types), 200


# endpoint for retrieving rack pdu types
@app.route('/rack_pdu_types', methods=['GET'])
@cross_origin()
def get_rack_pdu_types():
    user = get_user_from_req()
    if user == None:
        return jsonify(data={"error": "Unauthorized!"}), 401
    else:
        return jsonify(rack_pdu_types=datastore.rack_pdu_types), 200

# endpoint for retrieving accelerator types
@app.route('/accelerator_types', methods=['GET'])
@cross_origin()
def get_accelerator_types():
    user = get_user_from_req()
    if user == None:
        return jsonify(data={"error": "Unauthorized!"}), 401
    else:
        return jsonify(accelerator_types=datastore.accelerator_types), 200

# endpoint for retrieving cpu types
@app.route('/cpu_types', methods=['GET'])
@cross_origin()
def get_cpu_types():
    user = get_user_from_req()
    if user == None:
        return jsonify(data={"error": "Unauthorized!"}), 401
    else:
        return jsonify(cpu_types=datastore.cpu_types), 200

# endpoint for retrieving memory types
@app.route('/memory_types', methods=['GET'])
@cross_origin()
def get_memory_types():
    user = get_user_from_req()
    if user == None:
        return jsonify(data={"error": "Unauthorized!"}), 401
    else:
        return jsonify(memory_types=datastore.memory_types), 200


# endpoint for retrieving psu types
@app.route('/psu_types', methods=['GET'])
@cross_origin()
def get_psu_types():
    user = get_user_from_req()
    if user == None:
        return jsonify(data={"error": "Unauthorized!"}), 401
    else:
        return jsonify(psu_types=datastore.psu_types), 200

# endpoint for retrieving server cooling types
@app.route('/server_cooling_types', methods=['GET'])
@cross_origin()
def get_server_cooling_types():
    user = get_user_from_req()
    if user == None:
        return jsonify(data={"error": "Unauthorized!"}), 401
    else:
        return jsonify(server_cooling_types=datastore.server_cooling_types), 200


# endpoint for retrieving server types
@app.route('/server_types', methods=['GET'])
@cross_origin()
def get_server_types():
    user = get_user_from_req()
    if user == None:
        return jsonify(data={"error": "Unauthorized!"}), 401
    else:
        return jsonify(server_types=datastore.server_types), 200
        

# endpoint for retrieving companies
@app.route('/companies', methods=['GET'])
@cross_origin()
def get_companies():
    user = get_user_from_req()
    if user == None:
        return jsonify(data={"error": "Unauthorized!"}), 401
    else:
        return jsonify(companies=[c.serialize() for c in datastore.companies]), 200


# endpoint for retrieving a specific company
@app.route('/companies/<id>', methods=['GET'])
@cross_origin()
def get_company(id):
    user = get_user_from_req()
    if user == None:
        return jsonify(data={"error": "Unauthorized!"}), 401
    else:
        for c in datastore.companies:
            if c.id == id:
                return jsonify(company=c.serialize()), 200
        return jsonify(data={"error": "Company not found!"}), 200


# endpoint for retrieving users
@app.route('/users', methods=['GET'])
@cross_origin()
def get_users():
    user = get_user_from_req()
    if user == None:
        return jsonify(data={"error": "Unauthorized!"}), 401
    else:
        return jsonify(users=[u.serialize() for u in datastore.users]), 200


# endpoint for retrieving a specific user
@app.route('/users/<id>', methods=['GET'])
@cross_origin()
def get_user(id):
    user = get_user_from_req()
    if user == None:
        return jsonify(data={"error": "Unauthorized!"}), 401
    else:
        for u in datastore.users:
            if u.id == id:
                return jsonify(user=u.serialize()), 200
        return jsonify(data={"error": "User not found!"}), 200 


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
            buildings = comp.get_buildings()
            return jsonify(areas=[b.serialize() for b in buildings]), 200


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
            racks = comp.get_racks()
            return jsonify(areas=[r.serialize() for r in racks]), 200


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
            servers = comp.get_servers()
            return jsonify(areas=[s.serialize() for s in servers]), 200

