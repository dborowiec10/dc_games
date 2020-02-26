import uuid

class DatacenterBuilding(object):
    def __init__(self, _type, sqmt, max_racks):
        self.id = uuid.uuid4()
        self.type = _type
        self.sqmt = sqmt
        self.max_racks = max_racks
        self.racks = []
        self.area_id = None

    def serialize(self):
        return {
            "id": self.id,
            "type": self.type,
            "square_metres": self.sqmt,
            "max_racks": self.max_racks,
            "racks": [r.serialize() for r in self.racks],
            "area_id": self.area_id
        }