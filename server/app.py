from flask import Flask, request, jsonify, session
import requests
import base64
import logging
from datetime import datetime
from flask_cors import CORS
import psycopg2
import bcrypt
import os  # Import os for environment variables
from dotenv import load_dotenv  # Import dotenv for loading .env variables

# Load environment variables from .env file
load_dotenv()

app = Flask(__name__)
app.secret_key = os.getenv('SECRET_KEY', 'your_default_secret_key')  # Use environment variable for the secret key
CORS(app)

# Your credentials for M-Pesa
consumer_key = os.getenv('MPESA_CONSUMER_KEY')
consumer_secret = os.getenv('MPESA_CONSUMER_SECRET')
shortcode = os.getenv('MPESA_SHORTCODE')
passkey = os.getenv('MPESA_PASSKEY')
callback_url = os.getenv('MPESA_CALLBACK_URL')

# Database connection parameters
DATABASE_URL = os.getenv('DATABASE_URL')

# Configure logging
logging.basicConfig(level=logging.DEBUG)

def get_db_connection():
    """Establishes a connection to the PostgreSQL database."""
    try:
        conn = psycopg2.connect(DATABASE_URL)
        return conn
    except psycopg2.Error as e:
        logging.error(f'Database connection error: {e}')
        return None

def get_mpesa_access_token():
    """Fetches the access token for M-Pesa API."""
    api_url = 'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials'
    credentials = f'{consumer_key}:{consumer_secret}'
    encoded_credentials = base64.b64encode(credentials.encode()).decode('utf-8')
    headers = {'Authorization': f'Basic {encoded_credentials}'}
    response = requests.get(api_url, headers=headers)
    response.raise_for_status()
    return response.json()

def lipa_na_mpesa_online(phone_number, amount):
    """Initiates a payment via M-Pesa."""
    access_token = get_mpesa_access_token()['access_token']
    api_url = 'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest'
    headers = {'Authorization': f'Bearer {access_token}'}

    timestamp = datetime.now().strftime('%Y%m%d%H%M%S')
    data_to_encode = shortcode + passkey + timestamp
    password = base64.b64encode(data_to_encode.encode()).decode('utf-8')

    payload = {
        "BusinessShortCode": shortcode,
        "Password": password,
        "Timestamp": timestamp,
        "TransactionType": "CustomerPayBillOnline",
        "Amount": amount,
        "PartyA": phone_number,
        "PartyB": shortcode,
        "PhoneNumber": phone_number,
        "CallBackURL": callback_url,
        "AccountReference": "Test123",
        "TransactionDesc": "Payment for test"
    }

    response = requests.post(api_url, json=payload, headers=headers)
    
    logging.debug(f'Response Status Code: {response.status_code}')
    logging.debug(f'Response Content: {response.content}')

    response.raise_for_status()  # Raise an error for bad status codes
    return response.json()

@app.route('/api/register', methods=['POST'])
def register():
    """Handles user registration."""
    data = request.json
    name = data.get('name')
    email = data.get('email')
    phone_number = data.get('phone_number')
    password = data.get('password')

    # Hash the password
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')  # Convert to string

    try:
        conn = get_db_connection()
        if conn is None:
            return jsonify({"error": "Database connection failed"}), 500

        cursor = conn.cursor()
        cursor.execute("""
            INSERT INTO users (name, email, phone_number, password_hash)
            VALUES (%s, %s, %s, %s)
        """, (name, email, phone_number, hashed_password))
        conn.commit()
        cursor.close()
        conn.close()
        return jsonify({"message": "Registration successful"}), 201
    except Exception as e:
        logging.error(f'Registration error: {e}')
        return jsonify({"error": "Registration failed, please try again."}), 400

@app.route('/api/login', methods=['POST'])
def login():
    """Handles user login."""
    data = request.json
    email = data.get('email')
    password = data.get('password')

    try:
        conn = get_db_connection()
        if conn is None:
            return jsonify({"error": "Database connection failed"}), 500

        cursor = conn.cursor()
        cursor.execute("SELECT password_hash FROM users WHERE email = %s", (email,))
        user = cursor.fetchone()
        cursor.close()
        conn.close()

        if user:
            password_hash = user[0]  # Get the password hash from the database
            if bcrypt.checkpw(password.encode('utf-8'), password_hash.encode('utf-8')):
                session['user'] = email  # Store user in session
                return jsonify({"message": "Login successful"}), 200
            else:
                return jsonify({"error": "Invalid email or password"}), 401
        else:
            return jsonify({"error": "Invalid email or password"}), 401
    except Exception as e:
        logging.error(f'Login error: {e}')
        return jsonify({"error": "Login failed, please try again."}), 400

@app.route('/api/logout', methods=['POST'])
def logout():
    """Handles user logout."""
    session.pop('user', None)  # Remove user from session
    return jsonify({"message": "Logout successful"}), 200

@app.route('/api/mpesa', methods=['POST'])
def mpesa_payment():
    """Handles M-Pesa payment."""
    data = request.json
    phone_number = data['phoneNumber']
    amount = data['amount']

    try:
        response = lipa_na_mpesa_online(phone_number, amount)
        return jsonify(response)
    except requests.exceptions.RequestException as e:
        logging.error(f'Error during M-Pesa request: {e}')
        return jsonify({'error': str(e)}), 500

@app.route('/callback', methods=['POST'])
def callback():
    """Handles the M-Pesa callback."""
    data = request.json
    logging.info(f'Callback Data: {data}')
    # Process the callback data here if needed
    return jsonify({'status': 'success'})

if __name__ == '__main__':
    app.run(debug=True)






