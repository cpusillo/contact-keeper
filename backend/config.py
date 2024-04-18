from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)

# Wrap the app in CORS to disable any cross origin request errors
CORS(app)

# Setup local db
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///mydatabase.db"
# Don't track all modifications to our database at this time TODO enable it
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

# Get our ORM ready with our db object
db = SQLAlchemy(app)
