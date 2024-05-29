from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector
from mysql.connector import Error

app = Flask(__name__)
CORS(app)

# MySQL database configuration
db_config = {
    'host': '192.168.2.151',
    'database': 'register_db',  # Replace with your actual database name
    'user': 'Admin',
    'password': 'BIM_LOCAL1'
}

def create_connection():
    """ Create a database connection to the MySQL database """
    connection = None
    try:
        connection = mysql.connector.connect(**db_config)
        if connection.is_connected():
            print("Connected to MySQL database")
    except Error as e:
        print(f"Error: '{e}'")
    return connection

@app.route('/register', methods=['POST'])
def register():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({'error': 'Email and Password are required'}), 400

    connection = create_connection()
    cursor = connection.cursor()

    try:
        cursor.execute("INSERT INTO Users (Email, Password) VALUES (%s, %s)", (email, password))
        connection.commit()
        return jsonify({'message': 'User registered successfully!'}), 201
    except Error as e:
        print(f"Error: '{e}'")
        return jsonify({'error': 'Failed to register user'}), 500
    finally:
        cursor.close()
        connection.close()

if __name__ == '__main__':
    app.run(debug=True)
