import uuid

class Memory(object):
    def __init__(self, _type, max_capacity, max_temp, max_power_usage):
        self.id = uuid.uuid4()
        self.type = _type
        self.max_capacity = max_capacity
        self.max_temperature = max_temp
        self.max_power_usage = max_power_usage
        self.capacity = 0
        self.temperature = 0
        self.pow_usage = 0
        self.server_id = None

    # sets server id for this memory
    def set_server(self, server_id):
        self.server_id = server_id

    # unsets server for this memory
    def unset_server(self):
        self.server_id = None

    # serializes this object
    def serialize(self):
        return {
            "id": self.id,
            "server_id": self.server_id,
            "type": self.type,
            "max_capacity": self.max_capacity,
            "capacity": self.capacity,
            "max_temperature": self.max_temperature,
            "temperature": self.temperature,
            "max_power_usage": self.max_power_usage,
            "power_usage": self.pow_usage
        }
