from flask_restx import Namespace, Resource, fields
from flask_jwt_extended import jwt_required
from flask import request, jsonify
from models import Constituencies
import base64

constituencies_ns = Namespace('constituencies', description='Namespace for Constituencies')


#constituencies model (Serializer)
constituencies_model = constituencies_ns.model(
    'Constituencies',
    {
        "id": fields.Integer(),
        "name": fields.String(),
        "taluka_id": fields.Integer(),
        "district_id": fields.Integer()

    }
)

def get_constituencies_dict(constituencies):
    return {
        "id": constituencies.id,
        "name": constituencies.name,
        "taluka_id": constituencies.taluka_id,
        "district_id": constituencies.district_id
    }


@constituencies_ns.route('/')
class ConstituenciesResource(Resource):
    @constituencies_ns.marshal_list_with(constituencies_model)
    @jwt_required()
    def get(self):
        """Get all Constituencies"""
        constituencies = Constituencies.query.all()
        
        return constituencies

