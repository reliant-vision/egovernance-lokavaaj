from flask_restx import Namespace, Resource, fields
from flask_jwt_extended import jwt_required
from flask import request, jsonify
from models import Applications

app_ns = Namespace('applications', description='Namespace for Applications')

#application model (Serializer)
application_model = app_ns.model(
    "Applications",
    {
        "id": fields.Integer(),
        "application_number": fields.String(), 
        "applicant_name": fields.String(),
        "gender": fields.String(),
        "caste": fields.String(),
        "dob": fields.Date(),
        "aadhaar_number": fields.String(),
        "ration_card_number": fields.String(),
        "mobile": fields.String(),
        "email": fields.String(),
        "occupation": fields.String(),
        "village": fields.String(),
        "taluka": fields.String(),
        "district": fields.String(),
        "address": fields.String(),
        "grievance_type": fields.String(),
        "description": fields.String(),
        "application_status": fields.String(), 
        "remarks": fields.String(),
        "assigned_to": fields.String(),
    }
)

def get_application_dict(application):
    return {
        "id": application.id,
        "application_number": application.application_number,
        "applicant_name": application.applicant_name,
        "gender": application.gender,
        "caste": application.caste,
        "dob": application.dob,
        "aadhaar_number": application.aadhaar_number,
        "ration_card_number": application.ration_card_number,
        "mobile": application.mobile,
        "email": application.email,
        "occupation": application.occupation,
        "village": application.village,
        "taluka": application.taluka,
        "district": application.district,
        "address": application.address,
        "grievance_type": application.grievance_type,
        "description": application.description,
        "application_status": application.application_status,
        "remarks": application.remarks,
        "assigned_to": application.assigned_to
        }

@app_ns.route('/test')
class TestResource(Resource):
    def get(self):
        return {"message": "Hello Wordl!"}

@app_ns.route('/')
class ApplicationResource(Resource):
    @app_ns.marshal_list_with(application_model)
    @jwt_required()
    def get(self):
        """Get all applications"""
        applications = Applications.query.all()
        
        return applications
    
    @app_ns.marshal_with(application_model)
    @app_ns.expect(application_model)
    @jwt_required()
    def post(self):
        """Create a new application"""
        data = request.get_json()
        new_application = Applications(
            application_number= data.get('application_number'), 
            applicant_name= data.get('applicant_name'),
            gender= data.get('gender'),
            caste= data.get('caste'),
            dob= data.get('dob'),
            aadhaar_number= data.get('aadhaar_number'),
            ration_card_number= data.get('ration_card_number'),
            mobile= data.get('mobile'),
            email= data.get('email'),
            occupation= data.get('occupation'),
            village= data.get('village'),
            taluka= data.get('taluka'),
            district= data.get('district'),
            address= data.get('address'),
            grievance_type= data.get('grievance_type'),
            description= data.get('description'),
            application_status= data.get('application_status'), 
            remarks= data.get('remarks'),
            assigned_to= data.get('assigned_to')
        )
        new_application.save()
        return new_application, 201

    
@app_ns.route('/<string:application_number>')
class ApplicationsResource(Resource):
    # @app_ns.marshal_with(application_model)
    @jwt_required()
    def get(self, application_number):
        """Get an application by application number"""
        application = Applications.query.filter_by(application_number=application_number).first()
        
        if application is None:
            return {
                "status_code": 404,
                "error_message": "Application Not Found"
            }
        application_dict = get_application_dict(application)
        return jsonify(application_dict)
        
    # @app_ns.marshal_with(application_model)
    @jwt_required()
    def put(self, application_number):
        """Update an application by application number"""
        update_application = Applications.query.filter_by(application_number=application_number).first()
        data = request.get_json()
        if update_application is None:
            return {
                "status_code": 404,
                "error_message": "Application Not Found"
            }
        update_application.update(data.get('application_status'), data.get('assigned_to'))
        update_application = get_application_dict(update_application)
        return update_application
