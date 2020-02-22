import uuid;

class RackSwitch(object):
    def __init__(self, rack_id, _type, max_throughput, max_temp, max_power_usage):
        self.id = uuid.uuid4()
        self.rack_id = rack_id
        self.type = _type
        self.max_throughput = max_throughput
        self.max_temperature = max_temp
        self.max_power_usage = max_power_usage
        self.throughput = 0
        self.temperature = 0
        self.pow_usage = 0

    def set_load(self, load):
        ret = 0
        if load <= self.max_throughput:
            self.throughput = load
        else:
            ret = load - self.max_throughput
            self.throughput = self.max_throughput
        perc = (self.throughput / self.max_throughput)
        self.temperature = self.max_temperature * perc
        self.pow_usage = self.max_power_usage * perc
        return ret

    def serialize(self):
        return {
            "id": self.id,
            "rack_id": self.rack_id,
            "type": self.type,
            "max_throughput": self.max_throughput,
            "throughput": self.throughput,
            "max_temperature": self.max_temperature,
            "temperature": self.temperature,
            "max_power_usage": self.max_power_usage,
            "power_usage": self.pow_usage
        }