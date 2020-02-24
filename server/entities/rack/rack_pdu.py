import uuid

class RackPdu(object):
    def __init__(self, _type, max_power_supply, max_power_loss, max_temp):
        self.id = uuid.uuid4()
        self.type = _type
        self.max_power_supply = max_power_supply
        self.power_supply = 0
        self.max_power_loss = max_power_loss
        self.power_loss = 0
        self.max_temp = max_temp
        self.temp = 0
        self.rack_id = None

    def serialize(self):
        return {
            "id": self.id,
            "rack_id": self.rack_id,
            "type": self.type,
            "max_power_supply": self.max_power_supply,
            "power_supply": self.power_supply,
            "max_power_loss": self.max_power_loss,
            "power_loss": self.power_loss,
            "max_temp": self.max_temp,
            "temp": self.temp
        }