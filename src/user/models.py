from sqlalchemy import Column, Integer, String,Boolean, DateTime
from src.utils.db import Base
from datetime import datetime   



class UserModel(Base):
    __tablename__= "users_table"


    id= Column(Integer,primary_key=True)
    name = Column(String)
    username = Column(String, nullable=False)
    hash_password = Column(String, nullable=False)
    email = Column(String)