import uuid

class Accelerator(object):
    def __init__(self, _type, flops, max_temp, max_power_usage):
        self.id = uuid.uuid4()
        self.type = _type
        self.flops = flops
        self.max_temperature = max_temp
        self.max_power_usage = max_power_usage
        self.capacity = 0
        self.temperature = 0
        self.pow_usage = 0
        self.server_id = None

    # sets server for this accelerator
    def set_server(self, server_id):
        self.server_id = server_id

    # unsets server for this accelerator
    def unset_server(self):
        self.server_id = None

    # serializes this object
    def serialize(self):
        return {
            "id": self.id,
            "server_id": self.server_id,
            "type": self.type,
            "flops": self.flops,
            "capacity": self.capacity,
            "max_temperature": self.max_temperature,
            "temperature": self.temperature,
            "max_power_usage": self.max_power_usage,
            "power_usage": self.pow_usage
        }