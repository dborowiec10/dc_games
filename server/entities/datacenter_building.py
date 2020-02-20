import uuid

class DatacenterBuilding(object):
    def __init__(self, name, _type, sqmt, price):
        self.id = uuid.uuid4()
        self.name = name
        self.type = _type
        self.sqmt = sqmt
        self.price = price
        self.area = None
        self.racks = {}

    def add_rack(self, rack, id):
        self.racks[id] = rack

    def remove_rack(self, id):
        self.racks.pop(id, None)

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "type": self.type,
            "square_metres": self.sqmt,
            "area_id": self.area,
            "price": self.price,
            "racks": map(lambda r: r.serialize(), self.racks.values())
        }