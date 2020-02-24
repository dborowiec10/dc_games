
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

# generates rack pdu object from blueprint
def gen_rack_pdu(_type):
    return RackPdu(_type["type"], _type["max_power_supply"], _type["max_power_loss"], _type["max_temp"])

# generates rack switch object from blueprint
def gen_rack_switch(_type):
    return RackSwitch(_type["type"], _type["max_throughput"], _type["max_temperature"], _type["max_power_usage"])

# generates rack object from blueprint
def gen_rack(_type, rack_pdu, rack_switch):
    return Rack(_type["type"], _type["max_server_capacity"], rack_pdu, rack_switch)



