from flask import Flask, jsonify, request
import pandas as pd
import sqlite3

app = Flask(__name__)

@app.route('/analyze-invoice', methods=['POST'])
def analyze_invoice():
    # Mock invoice analysis
    return jsonify({
        "price_changes": [
            {
                "product": "Jack Daniels",
                "old_price": 16.50,
                "new_price": 18.50,
                "increase_percent": 12.1,
                "recommended_price": 24.05
            }
        ],
        "status": "completed"
    })

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8002, debug=True)