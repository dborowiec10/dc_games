import uuid

class Psu(object):
    def __init__(self, server_id, _type, max_power_supply, power_loss, max_temperature):
        self.id = uuid.uuid4()
        self.server_id = server_id
        self.type = _type
        self.max_power_supply = max_power_supply
        self.power_supply = 0
        self.power_loss = power_loss
        self.power_usage = 0
        self.max_temperature = max_temperature
        self.temperature = 0

    def serialize(self):
        return {
            "id": self.id,
            "server_id": self.server_id,
            "type": self.type,
            "max_power_supply": self.max_power_supply,
            "power_supply": self.power_supply,
            "power_loss": self.power_loss,
            "power_usage": self.power_usage,
            "max_temperature": self.max_temperature,
            "temperature": self.temperature
        }