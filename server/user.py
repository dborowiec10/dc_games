class User(object):
    def __init__(self, _id, name, role, username, password, company_id, is_admin):
        self.id = _id
        self.name = name
        self.role = role
        self.username = username
        self.password = password
        self.company_id = company_id,
        self.is_admin = is_admin
        self.jwt = None
        self.async_session = None

    def serialize(self):
        print(self.company_id)
        return {
            "id": self.id,
            "name": self.name,
            "role": self.role,
            "username": self.username,
            "company_id": self.company_id[0],
            "is_admin": self.is_admin
        }