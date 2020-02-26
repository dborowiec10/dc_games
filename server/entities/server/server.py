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


    # sets rack for this server
    def set_rack(self, rack_id):
        self.rack_id = rack_id

    # unsets rack for this server
    def unset_rack(self):
        rack = self.rack_id
        self.rack_id = None
        return rack

    # adds new cpu to the server
    def add_cpu(self, cpu):
        if len(self.cpus) < self.max_cpus:
            cpu.set_server(self.id)
            self.cpus.append(cpu)
        else:
            raise Exception("This server cannot accept more CPUs!")
    
    # removes cpu from this server
    def remove_cpu(self, cpu_id):
        cpu = None
        for c in self.cpus:
            if c['id'] == cpu_id:
                self.cpus.remove(c)
                cpu = c
                break
        if cpu != None:
            cpu.unset_server()
        return cpu
        
    # adds new memory to the server
    def add_memory(self, mem):
        if len(self.memories) < self.max_memories:
            mem.set_server(self.id)
            self.memories.append(mem)
        else:
            raise Exception("This server cannot accept more Memories!")

    # removes memory from this server
    def remove_memory(self, memory_id):
        mem = None
        for m in self.memories:
            if m['id'] == memory_id:
                self.memories.remove(m)
                mem = m
                break
        if mem != None:
            mem.unset_server()
        return mem

    # adds new accelerator to the server
    def add_accelerator(self, acc):
        if len(self.accelerators) < self.max_accelerators:
            acc.set_server(self.id)
            self.accelerators.append(acc)
        else:
            raise Exception("This server cannot accept more Accelerators!")

    # removes memory from this server
    def remove_accelerator(self, acc_id):
        acc = None
        for a in self.accelerators:
            if a['id'] == acc_id:
                self.accelerators.remove(a)
                acc = a
                break
        if acc != None:
            acc.unset_server()
        return acc
    
    # sets psu for this server
    def set_psu(self, psu):
        if self.psu != None:
            raise Exception("This server already has a PSU!")
        else:
            psu.set_server(self.id)
            self.psu = psu

    # unsets psu for this server and returns it
    def unset_psu(self):
        psu = self.psu
        self.psu = None
        if psu != None:
            psu.unset_server()
        return psu

    # sets server cooling for this server
    def set_server_cooling(self, cooling):
        if self.server_cooling != None:
            raise Exception("This server already has server cooling!")
        else:
            cooling.set_server(self.id)
            self.server_cooling = cooling
    
    # unsets server cooling for this server and returns it
    def unset_server_cooling(self):
        cooling = self.server_cooling
        self.server_cooling = None
        if cooling != None:
            cooling.unset_server()
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
            "cpus": list(map(lambda c: c.serialize(), self.cpus)),
            "memories": list(map(lambda m: m.serialize(), self.memories)),
            "accelerators": list(map(lambda a: a.serialize(), self.accelerators)),
            "psu": self.psu.serialize(),
            "server_cooling": self.server_cooling.serialize(),
            "rack_id": self.rack_id
        }
