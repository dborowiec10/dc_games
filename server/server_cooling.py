import uuid
        
class ServerCooling(object):
    def __init__(self, _type, server_id, heat_rejection_ability, max_power_usage):
        self.id = uuid.uuid4()
        self.type = _type
        self.server_id = server_id
        self.heat_rejection_ability = heat_rejection_ability
        self.max_power_usage = max_power_usage
        self.power_usage = 0

    def serialize(self):
        return {
            "id": self.id,
            "server_id": self.server_id,
            "type": self.type,
            "heat_rejection_ability": self.heat_rejection_ability,
            "max_power_usage": self.max_power_usage,
            "power_usage": self.power_usage
        }
