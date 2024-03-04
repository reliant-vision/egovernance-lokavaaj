from flask import Flask, render_template
from flask_cors import CORS

app = Flask(__name__, template_folder='app/templates')

# Allow requests from your React app's domain
CORS(app, resources={r"/api/*": {"origins": "http://3.111.163.245"}})

@app.route('/')
def dashboard():
    return render_template('Dashboard.html')

@app.route('/ContactUs')
def contact_us():
    return render_template('ContactUs.html')

@app.route('/CreateApplication')
def create_application():
    return render_template('CreateApplication.html')

@app.route('/DepartmentLogin')
def department_login():
    return render_template('DepartmentLogin.html')

if __name__ == '__main__':
    app.run(host="0.0.0.0", debug=True, port=5000)
