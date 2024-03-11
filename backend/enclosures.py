from flask_restx import Namespace, Resource, fields
from flask_jwt_extended import jwt_required
from flask import request, jsonify
from models import Enclosures
import base64

enclosures_ns = Namespace('enclosures', description='Namespace for Enclosures')


#enclosures model (Serializer)
enclosures_model = enclosures_ns.model(
    'Enclosures',
    {
        "id": fields.Integer(),
        "application_number": fields.String(),
        "document_name": fields.String(),
        "document_image": fields.Raw()
    }
)

def get_enclosures_dict(enclosures):
    return {
        "id": enclosures.id,
        "application_number": enclosures.application_number,
        "document_name": enclosures.document_name,
        "document_image": enclosures.document_image
    }


@enclosures_ns.route('/<string:application_number>')
class EnclosureResource(Resource):
    # @enclosures_ns.marshal_with(enclosures_model)
    @jwt_required()
    def get(self, application_number):
        """Get enclosures by application number"""
        enclosures = Enclosures.query.filter_by(application_number=application_number).all()
        
        if enclosures is None:
            return {
                "status_code": 404,
                "error_message": f"No documents found for the application number {application_number}"
            }
        
        enclosures_list = []
        for enclosure in enclosures:
            enclosure_dict = get_enclosures_dict(enclosure)
            enclosure_dict["document_image"] = base64.b64encode(enclosure_dict["document_image"]).decode("utf-8")
            enclosures_list.append(enclosure_dict)

        
        return enclosures_list

@enclosures_ns.route('/')
class EnclosuresResource(Resource):
    # @enclosures_ns.marshal_with(enclosures_model)
    @jwt_required()
    def post(self):
        """Saving Enclosure"""
        response = []

        try:
            enclosure_data = request.get_json()

            for enclosure in enclosure_data:
                new_enclosure = Enclosures(
                    application_number=enclosure.get('application_number'),
                    document_name=enclosure.get('document_name'),
                    document_image=enclosure.get('document_image')
                )
                new_enclosure.save()
                response.append( response.append({
                    "id": new_enclosure.id,
                    "application_number": new_enclosure.application_number,
                    "document_name": new_enclosure.document_name,
                    "document_image": new_enclosure.document_image  # Adjust accordingly
                }))

            return {
                "status_code": 201,
                "message": "Enclosures saved successfully."
            }
        except Exception as e:
            # Handle any exceptions during the save process
            print(f"Error saving enclosures: {str(e)}")
            return {
                "status_code": 404,
                "body": {"error": f"Error saving enclosures: {str(e)}"}
            }

