from flask_restx import Namespace, Resource, fields
from flask_jwt_extended import jwt_required
from flask import request, jsonify
from models import Applications
from sqlalchemy import func
from exts import db
import pandas as pd

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
        "assembly_constituency": fields.String(),
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
        "assigned_to": application.assigned_to,
        "assembly_constituency": application.assembly_constituency,
        }

@app_ns.route('/test')
class TestResource(Resource):
    def get(self):
        return {"message": "Hello Wordl!"}

@app_ns.route('/')
class ApplicationResource(Resource):
    # @app_ns.marshal_list_with(application_model)
    # @jwt_required()
    def get(self):
        """Get all applications"""
        applications_data = []
        applications = Applications.query.all()
        for application in applications:
            application_dict = get_application_dict(application)
            keys = ['application_number', 'applicant_name', 'grievance_type', 'application_status']
            application_dict = {key: application_dict[key] for key in keys if key in application_dict}
            applications_data.append(application_dict)
        return applications_data
    
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
            assigned_to= data.get('assigned_to'),
            assembly_constituency = data.get('assembly_constituency'),
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
    
@app_ns.route('/district/<string:district>')
class ApplicationsByDistrictResource(Resource):
    def get(self, district):
        """fetch applications district wise"""
        applications_district_wise_list = []
        applications_district_wise =  Applications.query.filter_by(district=district).all()
        if len(applications_district_wise)==0:
            print("Inside IF")
            return {
                "status_code": 404,
                "error_message": "No applications found."
            }
        else:
            for application in applications_district_wise:
                applications_district_wise_dict = get_application_dict(application)
                applications_district_wise_list.append(applications_district_wise_dict)
        return jsonify(applications_district_wise_list)

@app_ns.route('/village/<string:village>')
class ApplicationsByVillageResource(Resource):
    def get(self, village):
        """fetch applications village wise"""
        applications_village_wise_list = []
        applications_village_wise =  Applications.query.filter_by(village=village).all()
        if len(applications_village_wise)==0:
            return {
                "status_code": 404,
                "error_message": "No applications found."
            }
        else:
            for application in applications_village_wise:
                applications_village_wise_dict = get_application_dict(application)
                applications_village_wise_list.append(applications_village_wise_dict)
        return jsonify(applications_village_wise_list)


@app_ns.route('/assembly_constituency/<string:assembly_constituency>')
class ApplicationsByAssemblyConstituencyResource(Resource):
    def get(self, assembly_constituency):
        """fetch applications assembly_constituency wise"""
        applications_constituency_wise = []
        applications_assembly_constituency_wise =  Applications.query.filter_by(assembly_constituency=assembly_constituency).all()
        if len(applications_assembly_constituency_wise)==0:
            return {
                "status_code": 404,
                "error_message": "No applications found."
            }
        else:
            for application in applications_constituency_wise:
                applications_constituency_wise_dict = get_application_dict(application)
                applications_constituency_wise_list.append(applications_constituency_wise_dict)
        return jsonify(applications_assembly_constituency_wise_list)


@app_ns.route('/taluka/<string:taluka>')
class ApplicationsByTalukaResource(Resource):
    def get(self, taluka):
        """fetch applications taluka wise"""
        applications_taluka_wise = []
        applications_taluka_wise =  Applications.query.filter_by(taluka=taluka).all()
        if len(applications_taluka_wise)==0:
            return {
                "status_code": 404,
                "error_message": "No applications found."
            }
        else:
            for application in applications_taluka_wise:
                applications_taluka_wise_dict = get_application_dict(application)
                applications_taluka_wise_list.append(applications_taluka_wise_dict)
        return jsonify(applications_taluka_wise_list)


@app_ns.route('/countbydistrictandtaluka')
class ApplicationsDistrictWiseCountResource(Resource):
    def get(self):
        """Fetch applications taluka wise count"""
        try:
            district_counts = (
                db.session.query(Applications.district, func.count(Applications.id))
                .group_by(Applications.district)
                .all()
            )
            taluka_counts = (
                db.session.query(Applications.taluka, func.count(Applications.id))
                .group_by(Applications.taluka)
                .all()
            )
            if not district_counts and not taluka_counts:
                return {
                    "status_code": 404,
                    "error_message": "No applications found."
                }
            
            district_counts_dict = [{"district": district, "count": count} for district, count in district_counts]
            taluka_counts_dict =  [{"taluka": taluka, "count": count} for taluka, count in taluka_counts]
            return jsonify([district_counts_dict, taluka_counts_dict])
        except Exception as e:
            return {
                "status_code": 500,
                "error_message": "Internal Server Error",
                "details": str(e)
            }



@app_ns.route('/appstats')
class ApplicationsDistrictWiseCountResource(Resource):
    def get(self):
        """Fetch applications taluka wise count"""
        try:
            taluka_total_counts = (
                db.session.query(Applications.taluka, func.count(Applications.id))
                .group_by(Applications.taluka)
                .all()
            )
            taluka_individual_counts = (
                db.session.query(Applications.taluka, Applications.application_status, func.count(Applications.id))
                .group_by(Applications.taluka, Applications.application_status)
                .all()
            )
            if not taluka_total_counts and not taluka_individual_counts:
                return {
                    "status_code": 404,
                    "error_message": "No applications found."
                }
            
            taluka_total_counts_dict = [{"taluka": taluka, "count": count} for taluka, count in taluka_total_counts]
            total_count_df = pd.DataFrame(taluka_total_counts_dict)
            taluka_individual_counts_dict =  [{"taluka": taluka, "application_status": application_status, "count": count} for taluka, application_status, count in taluka_individual_counts]
            data_df = pd.DataFrame(taluka_individual_counts_dict)
            data_df = data_df.pivot(index='taluka', columns='application_status', values='count')
            data_df = data_df.reset_index()
            data_df = data_df[['taluka', 'open', 'pending review', 'resolved']]
            data_df = data_df.drop(0)
            data_df[['open', 'pending review', 'resolved']] = data_df[['open', 'pending review', 'resolved']].astype(int)
            data_df = data_df.merge(total_count_df, on='taluka')
            data_df = data_df.rename(columns={'count': 'total_count'})
            response = data_df.to_dict(orient='records')
            return response
        except Exception as e:
            return {
                "status_code": 400,
                "error_message": str(e)
            }





