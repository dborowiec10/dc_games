import uuid

class Memory(object):
    def __init__(self, server_id, _type, max_capacity, max_temp, max_power_usage):
        self.id = uuid.uuid4()
        self.server_id = server_id
        self.type = _type
        self.max_capacity = max_capacity
        self.max_temperature = max_temp
        self.max_power_usage = max_power_usage
        self.capacity = 0
        self.temperature = 0
        self.pow_usage = 0

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
