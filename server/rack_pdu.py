import uuid

class RackPdu(object):
    def __init__(self, rack_id, _type, max_power_supply, power_loss):
        self.id = uuid.uuid4()
        self.rack_id = rack_id
        self.type = _type
        self.max_power_supply = max_power_supply
        self.power_supply = 0
        self.power_loss = power_loss
        self.power_usage = 0

    def set_load(self, load):
        ret = 0
        if load <= self.max_power_supply:
            self.power_supply = load
        else:
            ret = load - self.max_power_supply
            self.power_supply = self.max_power_supply
        self.power_usage = self.power_supply + (self.power_supply * self.power_loss)
        return ret


    def serialize(self):
        return {
            "id": self.id,
            "rack_id": self.rack_id,
            "type": self.type,
            "max_power_supply": self.max_power_supply,
            "power_supply": self.power_supply,
            "power_loss": self.power_loss,
            "power_usage": self.power_usage
        }