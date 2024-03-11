from flask_restx import Namespace, Resource, fields
from flask_jwt_extended import jwt_required
from flask import request, jsonify
from models import Offices
import base64

offices_ns = Namespace('office', description='Namespace for Offices')


#offices model (Serializer)
offices_model = offices_ns.model(
    'Offices',
    {
        "id": fields.Integer(),
        "name": fields.String(),
        "email": fields.String(),
        "ac_id": fields.Integer(),
        "taluka_id": fields.Integer(),
        "district_id": fields.Integer()
    }
)

def get_offices_dict(offices):
    return {
        "id": offices.id,
        "name": offices.name,
        "email": offices.email,
        "ac_id": offices.ac_id,
        "taluka_id": offices.taluka_id,
        "district_id": offices.district_id
    }


@offices_ns.route('/<int:id>')
class OfficesResource(Resource):
    # @offices_ns.marshal_with(offices_model)
    @jwt_required()
    def get(self, id):
        """Get office details by id"""
        office = Offices.query.filter_by(id=id).first()
        
        if office is None:
            return {
                "status_code": 404,
                "error_message": f"Office doesn't exists."
            }
        office_dict = get_offices_dict(office)
        
        return office_dict, 201

