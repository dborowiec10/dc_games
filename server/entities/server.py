import uuid
        
class Server(object):
    def __init__(self, _type, rack_id):
        self.id = uuid.uuid4()
        self.type = _type
        self.rack_id = rack_id
        self.cpus = []
        self.memories = []
        self.accelerators = []
        self.psu = None
        self.cooling = None

    def serialize(self):
        raise NotImplementedError
