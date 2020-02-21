import json

from entities.company import Company
from entities.user import User
from entities.area import Area
from entities.datacenter_building import DatacenterBuilding

config = {}
areas = []
building_types = []
rack_types = []
rack_switch_types = []
users = []
companies = []

def conf(key):
    return config[key]

# loads game configuration file
def load_config():
    global config
    with open('config.json') as json_file:
        config = json.load(json_file)


# loads entity definitions
def load_entities():
    global building_types
    global rack_types
    global rack_switch_types
    global config

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

def find_user_by_session_id(id):
    for u in users:
        if u.async_session == id:
            return u
    return None