from config import db

class Contact(db.Model):
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

