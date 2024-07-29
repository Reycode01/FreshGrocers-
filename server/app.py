from flask import Flask, request, jsonify
import requests
import base64
import logging
from datetime import datetime
from flask_cors import CORS  # Import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Your credentials
consumer_key = 'z6wCfWHp85S3MRMVcOGCwgGxPcQnxvjibXtgLEe2uFuAZVaJ'
consumer_secret = 'B738YEusgCY9HW0xXzp4qMXxc4gWYhkBeBxiwIZ4awWASMD3IsbDmWrn6IHGVrpA'
shortcode = '174379'
passkey = 'bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919'  # Replace this with your actual passkey

# Configure logging
logging.basicConfig(level=logging.DEBUG)

def get_mpesa_access_token():
    api_url = 'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials'
    credentials = f'{consumer_key}:{consumer_secret}'
    encoded_credentials = base64.b64encode(credentials.encode()).decode('utf-8')
    headers = {'Authorization': f'Basic {encoded_credentials}'}
    response = requests.get(api_url, headers=headers)
    response.raise_for_status()
    return response.json()

def lipa_na_mpesa_online(phone_number, amount):
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
        "CallBackURL": "https://fd2f-102-216-154-47.ngrok-free.app/callback",  # Use ngrok URL here
        "AccountReference": "Test123",
        "TransactionDesc": "Payment for test"
    }

    response = requests.post(api_url, json=payload, headers=headers)
    
    logging.debug(f'Response Status Code: {response.status_code}')
    logging.debug(f'Response Content: {response.content}')

    response.raise_for_status()  # Raise an error for bad status codes
    return response.json()

@app.route('/api/mpesa', methods=['POST'])
def mpesa_payment():
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
    data = request.json
    logging.info(f'Callback Data: {data}')
    # Process the callback data here if needed
    return jsonify({'status': 'success'})

if __name__ == '__main__':
    app.run(debug=True)




