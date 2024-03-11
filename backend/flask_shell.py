from flask import Flask
from config import DevConfig
from main import create_app


app = create_app(DevConfig)
ctx = app.app_context()
ctx.push()
