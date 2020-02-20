import uuid

class HighCpu4(Cpu):
    def __init__(self, server_id):
        super(Cpu, server_id, "high4", 48, 4000, 110, 140)

class HighCpu3(Cpu):
    def __init__(self, server_id):
        super(Cpu, server_id, "high3", 24, 4000, 110, 150)

class HighCpu2(Cpu):
    def __init__(self, server_id):
        super(Cpu, server_id, "high2", 12, 3000, 110, 170)

class HighCpu(Cpu):
    def __init__(self, server_id):
        super(Cpu, server_id, "high", 8, 4000, 110, 180)

class MedCpu2(Cpu):
    def __init__(self, server_id):
        super(Cpu, server_id, "med2", 8, 3000, 105, 180)

class MedCpu(Cpu):
    def __init__(self, server_id):
        super(Cpu, server_id, "med", 6, 3000, 105, 190)

class BasicCpu3(Cpu):
    def __init__(self, server_id):
        super(Cpu, server_id, "basic3", 4, 3000, 100, 180)

class BasicCpu2(Cpu):
    def __init__(self, server_id):
        super(Cpu, server_id, "basic2", 2, 2000, 95, 190)

class BasicCpu(Cpu):
    def __init__(self, server_id):
        super(Cpu, server_id, "basic", 1, 1500, 90, 200)

class Cpu(object):
    def __init__(self, server_id, _type, cores, max_freq, max_temp, max_power_usage):
        self.id = uuid.uuid4()
        self.server_id = server_id
        self.type = _type
        self.cores = cores
        self.max_freq = max_freq
        self.max_capacity = self.cores * self.max_freq
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
            "cores": self.cores,
            "max_freq": self.max_freq,
            "max_capacity": self.max_capacity,
            "capacity": self.capacity,
            "max_temperature": self.max_temperature,
            "temperature": self.temperature,
            "max_power_usage": self.max_power_usage,
            "power_usage": self.pow_usage
        }
