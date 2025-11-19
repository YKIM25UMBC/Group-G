# Simple MCP server for inventory
from flask import Flask, jsonify
import sqlite3
import os

app = Flask(__name__)

@app.route('/product/<name>', methods=['GET'])
def get_product_location(name):
    # Mock response for demo
    return jsonify({
        "product": name,
        "front_location": "A5",
        "back_location": "B12", 
        "current_stock": 15,
        "status": "found"
    })

@app.route('/barcode/<barcode>', methods=['GET'])
def get_product_by_barcode(barcode):
    return jsonify({
        "barcode": barcode,
        "product": "Sample Product",
        "location": "C3",
        "status": "found"
    })

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8001, debug=True)