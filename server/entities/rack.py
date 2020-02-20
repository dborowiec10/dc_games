import uuid

class Rack(object):
    def __init__(self, datacenter_id, max_server_capacity, price):
        self.id = uuid.uuid4()
        self.datacenter_id = datacenter_id
        self.max_server_capacity = max_server_capacity
        self.price = price
        self.servers = []

    def serialize(self):
        return {
            "id": self.id,
            "datacenter_id": self.datacenter_id,
            "max_server_capacity": self.max_server_capacity,
            "price": self.price,
            "server_capacity": len(self.servers)
        }