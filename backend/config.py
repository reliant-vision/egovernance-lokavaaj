from decouple import config
class Config:
    SECRET_KEY =config('SECRET_KEY')
    SQLALCHEMY_TRACK_MODIFICATIONS =config('SQLALCHEMY_TRACK_MODIFICATIONS', cast=bool)

class DevConfig(Config):
    SQLALCHEMY_DATABASE_URI="mysql+pymysql://appdevuser:rvg123@rvgdb.cfumeu4g8hu4.ap-south-1.rds.amazonaws.com:3306/prajapaalanadb_dev"
    DEBUG=True
    SQLALCHEMY_ECHO=True

class ProdConfig(Config):
    pass

class TestConfig(Config):
    pass