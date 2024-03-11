from flask_restx import Namespace, Resource, fields
from flask_jwt_extended import jwt_required
from flask import request, jsonify
from models import Districts
import base64

districts_ns = Namespace('districts', description='Namespace for Districts')


#districts model (Serializer)
districts_model = districts_ns.model(
    'Districts',
    {
        "id": fields.Integer(),
        "name": fields.String()
    }
)

def get_districts_dict(districts):
    return {
        "id": districts.id,
        "name": districts.name
    }


@districts_ns.route('/')
class DistrictsResource(Resource):
    @districts_ns.marshal_list_with(districts_model)
    @jwt_required()
    def get(self):
        """Get all Districts"""
        districts = Districts.query.all()
        
        return districts

