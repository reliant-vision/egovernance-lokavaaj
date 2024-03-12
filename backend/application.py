import logging
from flask import Flask
from flask_restx import Api
from exts import db
from flask_jwt_extended import JWTManager
from applications import app_ns
from auth import auth_ns
from enclosures import enclosures_ns
from villages import villages_ns
from offices import offices_ns
from talukas import talukas_ns
from districts import districts_ns
from departments import departments_ns
from constituencies import constituencies_ns
from categories import categories_ns
from flask_cors import CORS
from models import Applications, Users, Enclosures, Villages, Offices, Talukas, Departments, Districts, Constituencies, Categories
import os
from config import DevConfig

def create_app(config):
    application = Flask(__name__)
    application.config.from_object(config)

    # Configure logging
    configure_logging(application)

    CORS(application)

    db.init_app(application)

    JWTManager(application)

    api = Api(application, doc='/docs')

    api.add_namespace(app_ns)
    api.add_namespace(auth_ns)
    api.add_namespace(enclosures_ns)
    api.add_namespace(villages_ns)
    api.add_namespace(offices_ns)
    api.add_namespace(talukas_ns)
    api.add_namespace(districts_ns)
    api.add_namespace(departments_ns)
    api.add_namespace(constituencies_ns)
    api.add_namespace(categories_ns)

    @application.shell_context_processor
    def make_shell_context():
        return {
            "db": db, 
            "Applications": Applications,
            "Users": Users,
            "Enclosures": Enclosures,
            "Villages": Villages,
            "Talukas": Talukas,
            "Offices": Offices,
            "Departments": Departments,
            "Districts": Districts,
            "Constituencies": Constituencies,
            "Categories": Categories
        }

    return application

def configure_logging(application):
    # Set up logging to a file
    log_file = '/var/log/my_application.log'  # Adjust the path as needed
    handler = logging.FileHandler(log_file)
    handler.setLevel(logging.INFO)
    formatter = logging.Formatter('%(asctime)s - %(levelname)s - %(message)s')
    handler.setFormatter(formatter)
    application.logger.addHandler(handler)

if __name__ == '__main__':
    application = create_app(DevConfig)
    port = int(os.environ.get("PORT", 5000))
    application.run(host='0.0.0.0', debug=False, port=port)
