import uuid

class HighPsu2(Psu):
    def __init__(self, server_id):
        super(Psu, server_id, "high2", 1800, 0.7, 45)

class HighPsu(Psu):
    def __init__(self, server_id):
        super(Psu, server_id, "high", 1600, 0.8, 50)

class MedPsu2(Psu):
    def __init__(self, server_id):
        super(Psu, server_id, "med2", 1500, 0.10, 50)

class MedPsu(Psu):
    def __init__(self, server_id):
        super(Psu, server_id, "med", 1200, 0.12, 55)

class BasicPsu2(Psu):
    def __init__(self, server_id):
        super(Psu, server_id, "basic2", 1500, 0.2, 55)

class BasicPsu(Psu):
    def __init__(self, server_id):
        super(Psu, server_id, "basic", 1000, 0.2, 60)

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