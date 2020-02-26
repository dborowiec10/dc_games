import uuid
        
class Server(object):
    def __init__(self, _type, base_power_usage, max_cpus, max_memories, max_accelerators):
        self.id = uuid.uuid4()
        self.type = _type
        self.base_power_usage = base_power_usage
        self.max_cpus = max_cpus
        self.max_memories = max_memories
        self.max_accelerators = max_accelerators
        self.cpus = []
        self.memories = []
        self.accelerators = []
        self.psu = None
        self.server_cooling = None
        self.rack_id = None

    # adds new cpu to the server
    def add_cpu(self, cpu):
        if len(self.cpus) < self.max_cpus:
            self.cpus.append(cpu)
        else:
            raise Exception("This server cannot accept more CPUs!")
        
    # adds new memory to the server
    def add_memory(self, mem):
        if len(self.memories) < self.max_memories:
            self.memories.append(mem)
        else:
            raise Exception("This server cannot accept more Memories!")

    # adds new accelerator to the server
    def add_accelerator(self, acc):
        if len(self.accelerators) < self.max_accelerators:
            self.accelerators.append(acc)
        else:
            raise Exception("This server cannot accept more Accelerators!")
    
    # sets psu for this server
    def set_psu(self, psu):
        if self.psu != None:
            raise Exception("This server already has a PSU!")
        else:
            self.psu = psu

    # unsets psu for this server and returns it
    def unset_psu(self):
        psu = self.psu
        self.psu = None
        return psu

    # sets server cooling for this server
    def set_server_cooling(self, cooling):
        if self.server_cooling != None:
            raise Exception("This server already has server cooling!")
        else:
            self.server_cooling = cooling
    
    # unsets server cooling for this server and returns it
    def unset_server_cooling(self):
        cooling = self.server_cooling
        self.server_cooling = None
        return cooling

    # serializes the object
    def serialize(self):
        return {
            "id": self.id,
            "type": self.type,
            "base_power_usage": self.base_power_usage,
            "max_cpus": self.max_cpus,
            "max_memories": self.max_memories,
            "max_accelerators": self.max_accelerators,
            "cpus": map(lambda c: c.serialize(), self.cpus),
            "memories": map(lambda m: m.serialize(), self.memories),
            "accelerators": map(lambda a: a.serialize(), self.accelerators),
            "psu": self.psu.serialize(),
            "server_cooling": self.server_cooling.serialize(),
            "rack_id": self.rack_id
        }
