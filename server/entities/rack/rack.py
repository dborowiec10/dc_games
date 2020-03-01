import uuid

class Rack(object):
    def __init__(self, _type, max_server_capacity, rack_pdu, rack_switch):
        self.id = uuid.uuid4()
        self.type = _type
        self.max_server_capacity = max_server_capacity
        self.rack_pdu = rack_pdu
        self.rack_switch = rack_switch
        self.datacenter_id = None
        self.building_id = None
        self.servers = []

    def serialize(self):
        return {
            "id": self.id,
            "type": self.type,
            "building_id": self.building_id,
            "datacenter_id": self.datacenter_id,
            "max_server_capacity": self.max_server_capacity,
            "server_capacity": len(self.servers),
            "rack_pdu": self.rack_pdu.serialize(),
            "rack_switch": self.rack_switch.serialize()
        }