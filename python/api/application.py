from site import venv
import sys
from flask import Flask

app = Flask(__name__)
@app.route('/')
def hello_world():
    return 'Hello world!'




for path in sys.path:
    print(path)
