#!flask/bin/python
from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
from threading import Thread
import json
from jwt import (
    JWT,
    jwk_from_dict,
    jwk_from_pem,
)
import time
from datetime import datetime, timedelta


from company import Company
from user import User
from area import Area
from datacenter_building import DatacenterBuilding

app = Flask(__name__)
app.config['CORS_HEADERS'] = 'Content-Type'
cors = CORS(app)

jwt_key_priv = None
jwt_key_pub = None


areas = []
building_types = []
rack_types = []
rack_switch_types = []
users = []
companies = []

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
        user = find_user_by_id(user_id)
        now = datetime.now()
        exp = datetime.utcfromtimestamp(m['exp'])
        if m['iss'] == 'dc_games' and user and exp > now:
            return user
        else:
            return None
    else:
        return None

def run_flask():
    app.run(debug = False);


def find_user_by_id(_id):
    for u in users:
        if u.id == _id:
            return u
    return None

def find_user(username):
    for u in users:
        if u.username == username:
            return u
    return None


def check_password(user, password):
    if user.password == password:
        return True
    else:
        return False


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


@app.route('/areas', methods=['GET'])
@cross_origin()
def get_areas():
    user = get_user_from_req()
    if user == None:
        return jsonify(data={"error": "Unauthorized!"}), 401
    else:
        return jsonify(areas=[a.serialize() for a in areas]), 200


@app.route('/building_types', methods=['GET'])
@cross_origin()
def get_building_types():
    user = get_user_from_req()
    if user == None:
        return jsonify(data={"error": "Unauthorized!"}), 401
    else:
        return jsonify(buildings=building_types), 200


@app.route('/rack_types', methods=['GET'])
@cross_origin()
def get_rack_types():
    user = get_user_from_req()
    if user == None:
        return jsonify(data={"error": "Unauthorized!"}), 401
    else:
        return jsonify(rack_types=rack_types), 200


@app.route('/rack_switch_types', methods=['GET'])
@cross_origin()
def get_rack_switch_types():
    user = get_user_from_req()
    if user == None:
        return jsonify(data={"error": "Unauthorized!"}), 401
    else:
        return jsonify(rack_switch_types=rack_switch_types), 200


@app.route('/companies', methods=['GET'])
@cross_origin()
def get_companies():
    user = get_user_from_req()
    if user == None:
        return jsonify(data={"error": "Unauthorized!"}), 401
    else:
        return jsonify(companies=[c.serialize() for c in companies]), 200

@app.route('/companies/<id>', methods=['GET'])
@cross_origin()
def get_compnay(id):
    user = get_user_from_req()
    if user == None:
        return jsonify(data={"error": "Unauthorized!"}), 401
    else:
        for c in companies:
            if c.id == id:
                return jsonify(company=c.serialize()), 200
        return jsonify(data={"error": "Company not found!"}), 200
           


@app.route('/users', methods=['GET'])
@cross_origin()
def get_users():
    user = get_user_from_req()
    if user == None:
        return jsonify(data={"error": "Unauthorized!"}), 401
    else:
        return jsonify(users=[u.serialize() for u in users]), 200

@app.route('/users/<id>', methods=['GET'])
@cross_origin()
def get_user(id):
    user = get_user_from_req()
    if user == None:
        return jsonify(data={"error": "Unauthorized!"}), 401
    else:
        for u in users:
            if u.id == id:
                return jsonify(user=u.serialize()), 200
        return jsonify(data={"error": "User not found!"}), 200
                


@app.route('/login', methods=['POST'])
@cross_origin()
def login_user():
    data = json.loads(request.data)
    user = None
    if 'username' in data and data['username'] != None and 'password' in data and data['password'] != None:
        user = find_user(data['username'])
    if user != None and check_password(user, data['password']):
        jwt, exp = jwt_for_user(user)
        user.jwt = jwt
        return jsonify(
            data={
                "id_token": jwt,
                "expires_at": exp,
                "user": user.serialize()
            }
        ), 200
    else:
        if user != None:
            user.jwt = None
        return jsonify(
            data={
                "error": "Incorrect username or password!"
            }
        ), 401

if __name__ == '__main__':
    with open('areas.json') as json_file:
        ars = json.load(json_file)
        for a in ars:
            areas.append(Area(a['id'], a['name'], a['coordinates'], a['sqmt'], a['avg_temp'], a['price']))

    with open('building_types.json') as json_file:
        building_types = json.load(json_file)

    with open('rack_types.json') as json_file:
        rack_types = json.load(json_file)

    with open('rack_switch_types.json') as json_file:
        rack_switch_types = json.load(json_file)

    with open('companies.json') as json_file:
        cmp = json.load(json_file)
        for c in cmp:
            companies.append(Company(c['id'], c['name'], c['initial_balance']))

    with open('users.json') as json_file:
        usrs = json.load(json_file)
        for u in usrs:
            usr = User(u['id'], u['name'], u['role'], u['username'], u['password'], u['company_id'], u['is_admin'])
            for c in companies:
                if c.id == usr.company_id[0]:
                    c.manager_id = usr.id
            users.append(usr)

    with open('auth.key', 'rb') as prv_kf:
        jwt_key_priv = jwk_from_pem(prv_kf.read())

    with open('auth.key.pub', 'rb') as pub_kf:
        jwt_key_pub = jwk_from_pem(pub_kf.read())

    thread = Thread(target=run_flask)
    thread.start()
    thread.join()






