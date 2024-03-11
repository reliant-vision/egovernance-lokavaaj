from flask_restx import Namespace, Resource, fields
from flask_jwt_extended import jwt_required
from flask import request, jsonify
from models import Categories
import base64

categories_ns = Namespace('categories', description='Namespace for Categories')


#categories model (Serializer)
categories_model = categories_ns.model(
    'Categories',
    {
        "id": fields.Integer(),
        "grievance_type": fields.String(),
        "department_id": fields.Integer()
    }
)

def get_categories_dict(categories):
    return {
        "id": categories.id,
        "grievance_type": categories.grievance_type,
        "department_id": categories.department_id
    }


@categories_ns.route('/')
class CategoriesResource(Resource):
    @categories_ns.marshal_list_with(categories_model)
    @jwt_required()
    def get(self):
        """Get all Categories"""
        categories = Categories.query.all()
        
        return categories

