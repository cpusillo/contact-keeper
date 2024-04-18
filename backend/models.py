from config import db

class Contact(db.Model):
    """
    Class Contact forms the database model which will
    store all of our "contacts"
    @params = first_name, last_name, email
    """
    # Database model represented as a class
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(80), unique=False, nullable=False)
    last_name = db.Column(db.String(80), unique=False, nullable=False)
    email = db.Column(db.String(160), unique=True, nullable=False)

    def to_json(self):
        """
        Takes our DB fields and converts them into dict objects
        which can be fed as JSON into our API.
        """
        return {
            "id": self.id,
            "firstName": self.first_name,
            "lastName": self.last_name,
            "email": self.email
        }

