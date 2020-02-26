import uuid

class Cpu(object):
    def __init__(self, _type, cores, max_freq, max_temp, max_power_usage, flops):
        self.id = uuid.uuid4()
        self.server_id = None
        self.type = _type
        self.cores = cores
        self.max_freq = max_freq
        self.max_capacity = self.cores * self.max_freq
        self.max_temperature = max_temp
        self.max_power_usage = max_power_usage
        self.flops = flops
        self.capacity = 0
        self.temperature = 0
        self.pow_usage = 0

    def set_server(server_id):
        self.server_id = server_id

    def serialize(self):
        return {
            "id": self.id,
            "server_id": self.server_id,
            "type": self.type,
            "cores": self.cores,
            "flops": self.flops,
            "max_freq": self.max_freq,
            "max_capacity": self.max_capacity,
            "capacity": self.capacity,
            "max_temperature": self.max_temperature,
            "temperature": self.temperature,
            "max_power_usage": self.max_power_usage,
            "power_usage": self.pow_usage
        }
