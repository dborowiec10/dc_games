class Datacenter(object):

    def __init__(self, name, owner_id):
        self.id = uuid.uuid4()
        self.name = name
        self.owner_id = owner_id
        self.power_source = None
        self.area = None

    def set_area(self, area):
        self.area = area

    def set_power_source(self, power_source):
        self.power_source = power_source

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "owner_id": self.owner_id,
            "area": self.area.serialize(),
            "power_source": self.power_source
        }