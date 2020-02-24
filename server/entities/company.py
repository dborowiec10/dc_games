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
            "servers": []
        }
        self.datacenters = []

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