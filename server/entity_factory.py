
from entities.infrastructure.area import Area
from entities.infrastructure.datacenter_building import DatacenterBuilding

from entities.rack.rack_pdu import RackPdu 
from entities.rack.rack_switch import RackSwitch
from entities.rack.rack import Rack

from entities.server.cpu import Cpu
from entities.server.memory import Memory
from entities.server.accelerator import Accelerator
from entities.server.psu import Psu
from entities.server.server_cooling import ServerCooling
from entities.server.server import Server

# generates building from blueprint
def gen_building(_type):
    return DatacenterBuilding(_type["type"], _type["square_metres"], _type["max_racks"])

# generates rack pdu object from blueprint
def gen_rack_pdu(_type):
    return RackPdu(_type["type"], _type["max_power_supply"], _type["max_power_loss"], _type["max_temp"])

# generates rack switch object from blueprint
def gen_rack_switch(_type):
    return RackSwitch(_type["type"], _type["max_throughput"], _type["max_temperature"], _type["max_power_usage"])

# generates rack object from blueprint
def gen_rack(_type, rack_pdu, rack_switch):
    return Rack(_type["type"], _type["max_server_capacity"], rack_pdu, rack_switch)

# generates cpu object from blueprint
def gen_cpu(_type):
    return Cpu(_type["type"], _type["cores"], _type["max_freq"], _type["max_temp"], _type["max_power_usage"], _type["flops"])

# generates memory object from blueprint
def gen_memory(_type):
    return Memory(_type["type"], _type["capacity"], _type["max_temp"], _type["max_power_usage"])

# generates accelerator object from blueprint
def gen_accelerator(_type):
    return Accelerator(_type["type"], _type["flops"], _type["max_temp"], _type["max_power_usage"])

# generates psu object from blueprint
def gen_psu(_type):
    return Psu(_type["type"], _type["max_power_supply"], _type["max_power_loss"], _type["max_temp"])

# generates server cooling object from blueprint
def gen_server_cooling(_type):
    return ServerCooling(_type["type"], _type["heat_rejection_ability"], _type["max_power_usage"])

# generates server cooling object from blueprint
def gen_server(_type):
    return Server(_type["type"], _type["base_power_usage"], _type["max_cpus"], _type["max_memories"], _type["max_accelerators"])