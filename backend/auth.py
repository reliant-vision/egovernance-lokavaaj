from flask_restx import Resource, Namespace, fields
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import JWTManager, create_access_token, create_refresh_token, jwt_required, get_jwt_identity
from flask import Flask, request, abort, jsonify, Response, make_response
from models import Users
from datetime import datetime, timedelta

auth_ns = Namespace('auth', description= 'Namespace for Authentication')

#signup model (Serializer)
signup_model = auth_ns.model(
    'SignUp',
    {
        "username": fields.String(),
        "email": fields.String(),
        "password": fields.String(),
    }
)


#login mode (Serializer)
login_model = auth_ns.model(
    'Login',
    {
        'username': fields.String(),
        'password': fields.String()
    }
)

def get_new_user_dict(new_user):
    return {
    "username": new_user.username,
    "email": new_user.email,
    "password": new_user.password
    }

@auth_ns.route('/signup')
class SignUp(Resource):
    # @auth_ns.marshal_with(signup_model)
    @auth_ns.expect(signup_model)
    def post(self):
        data = request.get_json()
        username = data.get('username')
        user = Users.query.filter_by(username=username).first()
        if user is not None:
            return {
                "status_code": 404,
                "error_message": "Username already exits."
            }
        new_user = User(
            username=data.get('username'),
            email = data.get('email'),
            password = generate_password_hash(data.get('password'))
        )
        new_user.save()
        new_user = get_new_user_dict(new_user)
        new_user['message'] = "User created successfully."
        return new_user, 201


@auth_ns.route('/login')
class Login(Resource):
    @auth_ns.expect(login_model)
    def post(self):
        data = request.get_json()
        username = data.get('username')
        password = data.get('password')

        user = Users.query.filter_by(username=username).first()

        if user and check_password_hash(user.password, password):
            current_time = datetime.utcnow()
            expires = timedelta(hours=24)
            expiration_time = current_time + expires
            access_token = create_access_token(identity=user.username, expires_delta=expires)
            refresh_token = create_refresh_token(identity=user.username, expires_delta=expires)

            return jsonify(
                {
                    'access_token': access_token,
                    'refresh_token': refresh_token,
                    "expires_in": expires.total_seconds(),
                    "generated_at": current_time.isoformat(),
                    "expiration_time": expiration_time.isoformat()
                }
            )

@auth_ns.route('/refresh')
class RefreshResoure(Resource):
    @jwt_required(refresh=True)
    def post(self):
        current_user = get_jwt_identity()
        new_access_token = create_access_token(identity=current_user)
        return make_response(jsonify({"access_token":new_access_token}), 200)
