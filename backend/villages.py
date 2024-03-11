from flask_restx import Namespace, Resource, fields
from flask_jwt_extended import jwt_required
from flask import request, jsonify
from models import Villages
import base64

villages_ns = Namespace('villages', description='Namespace for Villages')


#villages model (Serializer)
villages_model = villages_ns.model(
    'Villages',
    {
        "id": fields.Integer(),
        "name": fields.String(),
        "ac_id": fields.Integer(),
        "taluka_id": fields.Integer(),
        "district_id": fields.Integer()
    }
)

def get_villages_dict(villages):
    return {
        "id": villages.id,
        "name": villages.name,
        "ac_id": villages.ac_id,
        "taluka_id": villages.taluka_id,
        "district_id": villages.district_id
    }


@villages_ns.route('/<string:name>')
class VillagesResource(Resource):
    # @villages_ns.marshal_with(villages_model)
    @jwt_required()
    def get(self, name):
        """Get village details by it's name"""
        village = Villages.query.filter_by(name=name).first()
        
        if village is None:
            return {
                "status_code": 404,
                "error_message": f"Village with name {name} doesn't exists."
            }
        village_dict = get_villages_dict(village)
        
        return village_dict, 201

