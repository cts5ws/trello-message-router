from flask import Flask, render_template, send_from_directory, request, jsonify
import requests
import json
import os
from waitress import serve
import logging

app = Flask(__name__)
logger = logging.getLogger('waitress')
logger.setLevel(logging.DEBUG)

verify_token = "04202020_quarantine_schwing"


@app.route('/router/ebhook', methods=['GET', 'POST'])
def favicon():
    if request.method == 'GET':
        mode = request.args.get('hub.mode')
        token = request.args.get('hub.verify_token')
        challenge = request.args.get('hub.challenge')

        logger.info("{} - {} - {}".format(mode, token, challenge))
        if mode == "subscribe" and token == verify_token:
            return challenge, 200
        else:
            return "Bad Request", 403
    else:
        payload = request.text
        logger.info("callback payload: {}".format(payload))

        return "i got it", 200


if __name__ == '__main__':
    serve(app, host="0.0.0.0", port=5000)
