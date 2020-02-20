import uuid

class WindGenerator(PowerSource):
    def __init__(self, name):
        super(WindGenerator, name, "wind_generator", 0.00015, 0.00001, 1000000)

class NuclearGrid(PowerSource):
    def __init__(self, name):
        super(NuclearGrid, name, "nuclear_grid", 0.00030, 0.00004, 10000)

class NaturalGasGrid(PowerSource):
    def __init__(self, name):
        super(NaturalGasGrid, name, "natural_gas_grid", 0.00025, 0.00020, 6000)

class CoalGrid(PowerSource):
    def __init__(self, name):
        super(CoalGrid, name, "coal_grid", 0.00015, 0.00034, 5000)

class PowerSource(object):
    def __init__(self, name, _type, price_per_watt, kgco2_per_watt, installation_cost):
        self.id = uuid.uuid4()
        self.name = name
        self.type = _type
        self.price_per_watt = price_per_watt
        self.kgco2_per_watt = kgco2_per_watt
        self.installation_cost = installation_cost

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "type": self.type,
            "price_per_watt": self.price_per_watt,
            "kgco2_per_watt": self.kgco2_per_watt,
            "installation_cost": self.installation_cost
        }