from flask_restx import Namespace, Resource, fields
from flask_jwt_extended import jwt_required
from flask import request, jsonify
from models import Departments
import base64

departments_ns = Namespace('departments', description='Namespace for Departments')


#departments model (Serializer)
departments_model = departments_ns.model(
    'Departments',
    {
        "id": fields.Integer(),
        "name": fields.String(),
        "email": fields.String()
    }
)

def get_departments_dict(departments):
    return {
        "id": departments.id,
        "name": departments.name,
        "email": departments.email
    }


@departments_ns.route('/')
class DepartmentsResource(Resource):
    @departments_ns.marshal_list_with(departments_model)
    @jwt_required()
    def get(self):
        """Get all Departments"""
        departments = Departments.query.all()
        
        return departments

