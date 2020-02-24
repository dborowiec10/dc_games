class Area(object):
    def __init__(self, _id, name, coordinates, sqmt, avg_temp, price):
        self.id = _id
        self.name = name
        self.coordinates = coordinates
        self.square_metres = sqmt
        self.average_temperature = avg_temp
        self.price = price
        self.owner_id = None
        self.status = "unpurchased"
        self.buildings = []
        

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "coordinates": self.coordinates,
            "square_metres": self.square_metres,
            "average_temperature": self.average_temperature,
            "price": self.price,
            "status": self.status,
            "owner_id": self.owner_id
        }