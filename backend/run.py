from main import create_app
from config import DevConfig
import os

if __name__ == '__main__':
    app=create_app(DevConfig)
    port = int(os.environ.get("PORT", 8000))
    app.run(host='0.0.0.0', debug=False, port=port)