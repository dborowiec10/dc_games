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
    for i in socketio_listeners['connect']:
        i()

def add_connect_listener(method):
    socketio_listeners['connect'].append(method)


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