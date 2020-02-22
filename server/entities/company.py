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

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "balance": self.balance,
            "manager_id": self.manager_id
        }