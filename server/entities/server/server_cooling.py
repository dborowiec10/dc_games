import uuid
        
class ServerCooling(object):
    def __init__(self, _type, heat_rejection_ability, max_power_usage):
        self.id = uuid.uuid4()
        self.type = _type
        self.heat_rejection_ability = heat_rejection_ability
        self.max_power_usage = max_power_usage
        self.power_usage = 0
        self.server_id = None

    # sets server for this server cooling
    def set_server(self, server_id):
        self.server_id = server_id

    # unsets server for this server cooling
    def unset_server(self):
        self.server_id = None

    # serializes the object
    def serialize(self):
        return {
            "id": self.id,
            "server_id": self.server_id,
            "type": self.type,
            "heat_rejection_ability": self.heat_rejection_ability,
            "max_power_usage": self.max_power_usage,
            "power_usage": self.power_usage
        }
