import uuid

class Company(object):
    def __init__(self, _id, name, init_balance):
        self.id = _id
        self.name = name
        self.balance = init_balance
        self.manager_id = None
        self.inventory = {
            "areas": [],
            "buildings": [],
            "racks": [],
            "rack_switches": [],
            "rack_pdus": [],
            "servers": [],
            "cpus": [],
            "memories": [],
            "accelerators": [],
            "psus": [],
            "server_coolings": []
        }
        self.datacenters = []

    # retrieves areas owned by this company
    def get_areas(self):
        return self.inventory["areas"]

    # retrieves buildings owned by this company
    def get_buildings(self):
        return self.inventory["buildings"]

    # retrieves racks owned by this company
    def get_racks(self):
        return self.inventory["racks"]

    # retrieves rack_switches owned by this company
    def get_rack_switches(self):
        return self.inventory["rack_switches"]

    # retrieves rack_pdus owned by this company
    def get_rack_pdus(self):
        return self.inventory["rack_pdus"]

    # retrieves servers owned by this company
    def get_servers(self):
        return self.inventory["servers"]

    def get_cpus(self):
        return self.inventory["cpus"]

    def get_memories(self):
        return self.inventory["memories"]

    def get_accelerators(self):
        return self.inventory["accelerators"]

    def get_psus(self):
        return self.inventory["psus"]

    def get_server_coolings(self):
        return self.inventory["server_coolings"]

    # add item to inventory
    def add_to_inventory(self, entity, obj):
        self.inventory[entity].append(obj)

    # removes item from inventory
    def remove_from_inventory(self, entity, _id):
        ents = self.inventory[entity]
        ent = None
        for e in ents:
            if _id == e.id:
                self.inventory[entity].remove(e)
                ent = e
                break;
        return ent

    # deduct given amount from balance
    def deduct_balance(self, amount):
        self.balance = self.balance - amount
        return self.balance

    # credit given amount to balance
    def credit_balance(self, amount):
        self.balance = self.balance + amount
        return self.balance

    # check if company can afford a given deduction
    def can_afford(self, amount):
        if self.balance - amount >= 0:
            return True
        else:
            return False

    # serialise the company to json
    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "balance": self.balance,
            "manager_id": self.manager_id
        }