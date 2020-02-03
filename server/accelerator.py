import uuid

class HighAccelerator2(Accelerator):
    def __init__(self, server_id):
        super(Accelerator, server_id, "high2", 1024000, 105, 250)

class HighAccelerator(Accelerator):
    def __init__(self, server_id):
        super(Accelerator, server_id, "high", 512000, 100, 250)

class MedAccelerator2(Accelerator):
    def __init__(self, server_id):
        super(Accelerator, server_id, "med2", 256000, 95, 260)

class MedAccelerator(Accelerator):
    def __init__(self, server_id):
        super(Accelerator, server_id, "med", 128000, 95, 260)

class BasicAccelerator2(Accelerator):
    def __init__(self, server_id):
        super(Accelerator, server_id, "basic2", 64000, 90, 260)

class BasicAccelerator(Accelerator):
    def __init__(self, server_id):
        super(Accelerator, server_id, "basic", 32000, 90, 270)


class Accelerator(object):
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

    def set_load(self, load):
        ret = 0
        if load <= self.max_capacity:
            self.capacity = load
        else:
            ret = load - self.max_capacity
            self.capacity = self.max_capacity
        perc = (self.capacity / self.max_capacity)
        self.temperature = self.max_temperature * perc
        self.pow_usage = self.max_power_usage * perc
        return ret

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
            "power_usage": self.power_usage
        }