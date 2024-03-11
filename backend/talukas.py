from flask_restx import Namespace, Resource, fields
from flask_jwt_extended import jwt_required
from flask import request, jsonify
from models import Talukas
import base64

talukas_ns = Namespace('talukas', description='Namespace for Talukas')


#talukas model (Serializer)
talukas_model = talukas_ns.model(
    'Talukas',
    {
        "id": fields.Integer(),
        "name": fields.String(),
        "district_id": fields.Integer()
    }
)

def get_talukas_dict(talukas):
    return {
        "id": talukas.id,
        "name": talukas.name,
        "district_id": talukas.district_id
    }


@talukas_ns.route('/')
class TalukasResource(Resource):
    @talukas_ns.marshal_list_with(talukas_model)
    @jwt_required()
    def get(self):
        """Get all Talukas"""
        talukas = Talukas.query.all()
        
        return talukas

