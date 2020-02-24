import uuid;

class RackSwitch(object):
    def __init__(self, _type, max_throughput, max_temp, max_power_usage):
        self.id = uuid.uuid4()
        self.type = _type
        self.max_throughput = max_throughput
        self.max_temp = max_temp
        self.max_power_usage = max_power_usage
        self.throughput = 0
        self.temp = 0
        self.power_usage = 0
        self.rack_id = None

    def serialize(self):
        return {
            "id": self.id,
            "rack_id": self.rack_id,
            "type": self.type,
            "max_throughput": self.max_throughput,
            "throughput": self.throughput,
            "max_temp": self.max_temp,
            "temp": self.temp,
            "max_power_usage": self.max_power_usage,
            "power_usage": self.power_usage
        }