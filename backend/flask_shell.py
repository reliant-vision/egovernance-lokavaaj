from flask import Flask
from config import DevConfig
from application import create_app


app = create_app(DevConfig)
ctx = app.app_context()
ctx.push()
