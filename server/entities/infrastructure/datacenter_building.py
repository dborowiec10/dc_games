import uuid

class DatacenterBuilding(object):
    def __init__(self, _type, sqmt, max_racks):
        self.id = uuid.uuid4()
        self.type = _type
        self.sqmt = sqmt
        self.max_racks = max_racks
        self.racks = []
        self.area = None

    def serialize(self):
        return {
            "id": self.id,
            "type": self.type,
            "square_metres": self.sqmt,
            "max_racks": self.max_racks,
            "racks": map(lambda r: r.serialize(), self.racks.values()),
            "area": self.area
        }