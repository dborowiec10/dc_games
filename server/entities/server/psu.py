import uuid

class Psu(object):
    def __init__(self, _type, max_power_supply, power_loss, max_temp):
        self.id = uuid.uuid4()
        self.type = _type
        self.max_power_supply = max_power_supply
        self.power_supply = 0
        self.power_loss = power_loss
        self.power_usage = 0
        self.max_temp = max_temp
        self.temperature = 0
        self.server_id = None

    # sets server for this Psu
    def set_server(self, server_id):
        self.server_id = server_id

    # unsets server for this Psu
    def unset_server(self):
        self.server_id = None

    # serializes this object
    def serialize(self):
        return {
            "id": self.id,
            "server_id": self.server_id,
            "type": self.type,
            "max_power_supply": self.max_power_supply,
            "power_supply": self.power_supply,
            "power_loss": self.power_loss,
            "power_usage": self.power_usage,
            "max_temp": self.max_temp,
            "temperature": self.temperature
        }