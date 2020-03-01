import datastore
import entity_factory
from entities.company import Company
from entities.user import User


# manages purchasing areas
def buy_area(user, area_id):
    company = user.company
    area = datastore.find_area_by_id(area_id)
    if area.status != "unpurchased":
        return None, "This area is already owned by some company!"
    elif not company.can_afford(area.price):
        return None, "You do not have enough credits to purchase this area!"
    else:
        company.deduct_balance(area.price)
        area.owner_id = company.id
        area.status = "purchased"
        company.add_to_inventory("areas", area)
        return "Purchased Area, should appear in inventory shortly!", None 


# manages purchasing buildings
def buy_building(user, building_type):
    company = user.company
    building_type = datastore.find_building_type(building_type["type"])
    if building_type == None:
        return None, "Unknown bulding type requested!"
    else:
        if not company.can_afford(building_type["price"]):
            return None, "You do not have enough credits to purchase this item!"
        else:
            company.deduct_balance(building_type["price"])
            building = entity_factory.gen_building(building_type)
            company.add_to_inventory("buildings", building)
            datastore.add_building(building)
            return "Purchased Building, should appear in inventory shortly!", None


# manages purchasing racks
def buy_rack(user: User, rack_type, quantity):
    company = user.company
    rack_pdu = datastore.find_rack_pdu_type(rack_type["rack_pdu"]["type"])
    rack_switch = datastore.find_rack_switch_type(rack_type["rack_switch"]["type"])
    max_server_capacity = rack_type["max_server_capacity"]
    base_unit_price = rack_type["base_price"]
    total_price = (rack_switch["price"] + rack_pdu["price"] + base_unit_price) * int(quantity)
    if not company.can_afford(total_price):
        return None, "You do not have enough credits to purchase this item!"
    else:
        for i in range(int(quantity)):
            rack_pdu_obj = entity_factory.gen_rack_pdu(rack_pdu)
            rack_switch_obj = entity_factory.gen_rack_switch(rack_switch)
            rack_obj = entity_factory.gen_rack(rack_type, rack_pdu_obj, rack_switch_obj)

            if rack_pdu_obj == None or rack_switch_obj == None or rack_obj == None:
                return None, "Unable to produce new Rack!"
            else:
                company.add_to_inventory("rack_pdus", rack_pdu_obj)
                company.add_to_inventory("rack_switches", rack_switch_obj)
                company.add_to_inventory("racks", rack_obj)
                datastore.add_rack_pdu(rack_pdu_obj)
                datastore.add_rack_switch(rack_switch)
                datastore.add_rack(rack_obj)
        company.deduct_balance(total_price)
        return "Purchased Rack(s), should appear in inventory shortly!", None


# manages purchasing servers
def buy_server(user: User, server_type, quantity):
    company = user.company
    base_price = server_type['base_price']
    total_price = base_price
    cpu_type = datastore.find_cpu_type(server_type['cpus']['type'])
    total_price = total_price + (cpu_type['price'] * server_type['cpus']['count'])
    mem_type = datastore.find_memory_type(server_type['memories']['type'])
    total_price = total_price + (mem_type['price'] * server_type['memories']['count'])
    if "accelerators" in server_type:
        acc_type = datastore.find_accelerator_type(server_type['accelerators']['type'])
        total_price = total_price + (acc_type['price'] * server_type['accelerators']['count'])
    psu_type = datastore.find_psu_type(server_type['psu']['type'])
    total_price = total_price + psu_type['price']
    server_cooling_type = datastore.find_server_cooling_type(server_type['server_cooling']['type'])
    total_price = total_price + server_cooling_type['price']
    total_price = total_price * quantity
    if not company.can_afford(total_price):
        return None, "You do not have enough credits to purchase this item!"
    else:
        # generate the server
        for i in range(int(quantity)):
            server = entity_factory.gen_server(server_type)
            datastore.add_server(server)
            company.add_to_inventory("servers", server)
            psu = entity_factory.gen_psu(psu_type)
            server.set_psu(psu)
            datastore.add_psu(psu)
            company.add_to_inventory("psus", psu)
            server_cooling = entity_factory.gen_server_cooling(server_cooling_type)
            server.set_server_cooling(server_cooling)
            datastore.add_server_cooling(server_cooling)
            company.add_to_inventory("server_coolings", server_cooling)
            for _ in range(server_type['cpus']['count']):
                c = entity_factory.gen_cpu(cpu_type)
                company.add_to_inventory("cpus", c)
                datastore.add_cpu(c)
                server.add_cpu(c)
            for _ in range(server_type['memories']['count']):
                m = entity_factory.gen_memory(mem_type)
                company.add_to_inventory("memories", m)
                datastore.add_memory(m)
                server.add_memory(m)
            if "accelerators" in server_type:
                for _ in range(server_type['accelerators']['count']):
                    a = entity_factory.gen_accelerator(acc_type)
                    company.add_to_inventory("accelerators", a)
                    datastore.add_accelerator(a)
                    server.add_accelerator(a)
        company.deduct_balance(total_price)
        return "Purchased Server(s), should appear in inventory shortly!", None