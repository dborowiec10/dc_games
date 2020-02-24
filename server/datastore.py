import json

from entities.company import Company
from entities.user import User
from entities.infrastructure.area import Area
from entities.infrastructure.datacenter_building import DatacenterBuilding

config = {}
areas = []
building_types = []
rack_types = []
rack_switch_types = []
rack_pdu_types = []
cpu_types = []
memory_types = []
accelerator_types = []
psu_types = []
server_cooling_types = []
server_types = []
users = []
companies = []

racks = []
rack_switches = []
rack_pdus = []

# return config value by key
def conf(key):
    return config[key]

# loads game configuration file
def load_config():
    global config
    with open('config.json') as json_file:
        config = json.load(json_file)


# loads entity definitions
def load_entities():
    global areas
    global building_types
    global rack_types
    global rack_switch_types
    global rack_pdu_types
    global config
    global cpu_types
    global memory_types
    global accelerator_types
    global psu_types
    global server_cooling_types
    global server_types
    global users
    global companies

    # load areas
    with open('definitions/areas.json') as json_file:
        ars = json.load(json_file)
        for a in ars:
            areas.append(Area(a['id'], a['name'], a['coordinates'], a['sqmt'], a['avg_temp'], a['price']))

    # load building types
    with open('definitions/building_types.json') as json_file:
        building_types = json.load(json_file)
    # load rack types
    with open('definitions/rack_types.json') as json_file:
        rack_types = json.load(json_file)
    # load rack switch types
    with open('definitions/rack_switch_types.json') as json_file:
        rack_switch_types = json.load(json_file)
    # load rack pdus
    with open('definitions/rack_pdu_types.json') as json_file:
        rack_pdu_types = json.load(json_file)
    # load cpu types
    with open('definitions/cpu_types.json') as json_file:
        cpu_types = json.load(json_file)
    # load memory types
    with open('definitions/memory_types.json') as json_file:
        memory_types = json.load(json_file)
    # load accelerator types
    with open('definitions/accelerator_types.json') as json_file:
        accelerator_types = json.load(json_file)
    # load psu types
    with open('definitions/psu_types.json') as json_file:
        psu_types = json.load(json_file)
    # load server cooling types
    with open('definitions/server_cooling_types.json') as json_file:
        server_cooling_types = json.load(json_file)
    # load server types
    with open('definitions/server_types.json') as json_file:
        server_types = json.load(json_file)

    # load companies
    with open('definitions/companies.json') as json_file:
        cmp = json.load(json_file)
        for c in cmp:
            company = Company(c['id'], c['name'], c['initial_balance'])
    
            companies.append(company)
    # load users
    with open('definitions/users.json') as json_file:
        usrs = json.load(json_file)
        for u in usrs:
            usr = User(u['id'], u['name'], u['role'], u['username'], u['password'], u['company_id'], u['is_admin'])
            for c in companies:
                if c.id == usr.company_id[0]:
                    c.manager_id = usr.id
                    usr.company = c
            users.append(usr)

            
# given id, return area
def find_area_by_id(_id):
    for a in areas:
        if a['id'] == _id:
            return a
    return None

# given rack type name, return rack type
def find_rack_type(_type):
    for r in rack_types:
        if r['type'] == _type:
            return r
    return None

# given rack pdu type name, return rack pdu type
def find_rack_pdu_type(_type):
    for r in rack_pdu_types:
        if r['type'] == _type:
            return r
    return None

# given rack switch type name, return rack switch type
def find_rack_switch_type(_type):
    for r in rack_switch_types:
        if r['type'] == _type:
            return r
    return None

# given an id, get the company object
def find_company_by_id(_id):
    for c in companies:
        if c.id == _id:
            return c
    return None


# given an id, get the user object
def find_user_by_id(_id):
    for u in users:
        if u.id == _id:
            return u
    return None


# given a username, get the user object
def find_user_by_username(username):
    for u in users:
        if u.username == username:
            return u
    return None


# given a socketio session id, find user
def find_user_by_session_id(id):
    for u in users:
        if u.async_session == id:
            return u
    return None

# given a rack, inserts it to the store
def add_rack(rack):
    racks.append(rack)

# given a rack pdu, inserts it to the store
def add_rack_pdu(rack_pdu):
    rack_pdus.append(rack_pdu)

# given a rack_switch, inserts it to the store
def add_rack_switch(rack_switch):
    rack_switches.append(rack_switch)