# app.py
from flask import Flask, jsonify
from flask_cors import CORS, cross_origin
from flask_sqlalchemy import SQLAlchemy
import mysql.connector 

app = Flask(__name__)
CORS(app)

db_config = {
    'host': 'inquizitive-db.cfumeu4g8hu4.ap-south-1.rds.amazonaws.com',
    'user': 'admin',
    'password': '-*swOaDMJrBt>16zV}kI34ArR3:g',
    'database': 'inquizitivedb',
}


@app.route('/')
def home():
    return 'Hello, World!'

@app.route('/api/data')
def get_data():
    data = {'Teacher': 'xyz'}
    return jsonify(data)

@app.route('/api/teachers')
def get_teachers():
    try:
        # Establish a connection
        connection = mysql.connector.connect(**db_config)
        # Create a cursor
        cursor = connection.cursor(dictionary=True)
        # Execute your SQL query
        cursor.execute('SELECT * FROM teachers')
        # Fetch the results
        data = cursor.fetchall()
        # Close the cursor and connection
        cursor.close()
        connection.close()
        return jsonify(data)
    except Exception as e:
        return jsonify({'error': str(e)})
    

if __name__ == '__main__':
    app.run(debug=True)
