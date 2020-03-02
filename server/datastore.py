import json

from entities.company import Company
from entities.user import User
from entities.infrastructure.area import Area
from entities.infrastructure.datacenter_building import DatacenterBuilding

# configuration
config = {}

# entity types
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

# generic entities
users = []
companies = []
areas = []
datacenters = []

# rack entities
racks = []
rack_switches = []
rack_pdus = []

# server entities
servers = []
cpus = []
memories = []
accelerators = []
psus = []
server_coolings = []

buildings = []

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
    # load areas
    with open('definitions/areas.json') as json_file:
        ars = json.load(json_file)
        for a in ars:
            add_area(Area(a['id'], a['name'], a['coordinates'], a['sqmt'], a['avg_temp'], a['price']))
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
            add_company(Company(c['id'], c['name'], c['initial_balance']))
    # load users
    with open('definitions/users.json') as json_file:
        usrs = json.load(json_file)
        for u in usrs:
            company = find_company_by_user_id(u['id']).manager_id = u['id']
            usr = User(u['id'], u['name'], u['role'], u['username'], u['password'], u['company_id'], u['is_admin'])
            usr.company = c
            add_user(usr)

# get building types
def get_building_types():
    return building_types

# get rack_types
def get_rack_types():
    return rack_types

# get rack_switch_types
def get_rack_switch_types():
    return rack_switch_types

# get rack_pdu_types
def get_rack_pdu_types():
    return rack_pdu_types

# get accelerator_types
def get_accelerator_types():
    return accelerator_types

# get cpu_types
def get_cpu_types():
    return cpu_types

# get memory_types
def get_memory_types():
    return memory_types

# get psu_types
def get_psu_types():
    return psu_types

# get server_cooling_types
def get_server_cooling_types():
    return server_cooling_types

# get server_types
def get_server_types():
    return server_types

# get companies
def get_companies():
    return companies

# get all areas
def get_areas():
    return areas

# get buildings
def get_buildings():
    return buildings

# get users
def get_users():
    return users

# get datacenters
def get_datacenters():
    return datacenters

# get racks
def get_racks():
    return racks

# get rack switches
def get_rack_switches():
    return rack_switches

# get rack_pdus
def get_rack_pdus():
    return rack_pdus

# get servers
def get_servers():
    return servers

# get cpus
def get_cpus():
    return cpus

# get memories
def get_memories():
    return memories

# get accelerators
def get_accelerators():
    return accelerators

# get psus
def get_psus():
    return psus

# get server_coolings
def get_server_coolings():
    return server_coolings

# given building type, return building type object
def find_building_type(_type):
    for b in building_types:
        if b["type"] == _type:
            return b
    return None
            
# given id, return area
def find_area_by_id(_id):
    for a in areas:
        if a.id == _id:
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

# given server type name, return server type
def find_server_type(_type):
    for s in server_types:
        if s['type'] == _type:
            return s
    return None

# given cpu type name, return cpu type
def find_cpu_type(_type):
    for c in cpu_types:
        if c['type'] == _type:
            return c
    return None

# given memory type name, return memory type
def find_memory_type(_type):
    for m in memory_types:
        if m['type'] == _type:
            return m
    return None

# given accelerator type name, return accelerator type
def find_accelerator_type(_type):
    for a in accelerator_types:
        if a['type'] == _type:
            return a
    return None

# given psu type name, return psu type
def find_psu_type(_type):
    for p in psu_types:
        if p['type'] == _type:
            return p
    return None

# given server cooling type name, return server cooling type
def find_server_cooling_type(_type):
    for sc in server_cooling_types:
        if sc['type'] == _type:
            return sc
    return None

def find_datacenter_by_id(_id):
    for d in datacenters:
        if d.id == _id:
            return d
    return None

# given an id, get the company object
def find_company_by_id(_id):
    for c in companies:
        if c.id == _id:
            return c
    return None

# given a user id, get the company object
def find_company_by_user_id(_id):
    for c in companies:
        if c.manager_id == _id:
            return c
    return None

# given an id, get the server object
def find_server_by_id(_id):
    for s in servers:
        if s.id == _id:
            return s
    return None

# given an id, get the building object
def find_buildings_by_id(_id):
    for b in buildings:
        if b.id == _id:
            return b
    return None

# given an id, get the rack object
def find_racks_by_id(_id):
    for r in racks:
        if r.id == _id:
            return r
    return None

# given an id, get the rack_switch object
def find_rack_switch_by_id(_id):
    for r in rack_switches:
        if r.id == _id:
            return r
    return None

# given an id, get the rack_pdu object
def find_rack_pdu_by_id(_id):
    for p in rack_pdus:
        if p.id == _id:
            return p
    return None

# given an id, get the cpu object
def find_cpu_by_id(_id):
    for c in cpus:
        if c.id == _id:
            return c
    return None

# given an id, get the memory object
def find_memory_by_id(_id):
    for m in memories:
        if m.id == _id:
            return m
    return None

# given an id, get the accelerator object
def find_accelerator_by_id(_id):
    for a in accelerators:
        if a.id == _id:
            return a
    return None

# given an id, get the psu object
def find_psu_by_id(_id):
    for p in psus:
        if p.id == _id:
            return p
    return None

# given an id, get the server_cooling object
def find_server_cooling_by_id(_id):
    for s in server_coolings:
        if s.id == _id:
            return s
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

# given a building, inserts it to the store
def add_building(building):
    buildings.append(building)

# given an area, inserts it to the store
def add_area(area):
    areas.append(area)

# given a company, inserts it to the store
def add_company(company):
    companies.append(company)

# given a user, inserts it to the store
def add_user(user):
    users.append(user)

# given a datacenter, inserts it to the store
def add_datacenter(datacenter):
    datacenters.append(datacenter)

# given a server, inserts it to the store
def add_server(server):
    servers.append(server)

# given a cpu, inserts it to the store
def add_cpu(cpu):
    cpus.append(cpu)

# given a memory, inserts it to the store
def add_memory(mem):
    memories.append(mem)

# given an accelerator, inserts it to the store
def add_accelerator(acc):
    accelerators.append(acc)

# given a psu, inserts it to the store
def add_psu(psu):
    psus.append(psu)

# given a server_cooling, inserts it to the store
def add_server_cooling(server_cooling):
    server_coolings.append(server_cooling)