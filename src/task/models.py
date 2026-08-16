from sqlalchemy import Column, Integer, String,Boolean, ForeignKey
from src.utils.db import Base


class TaskModel(Base):
    __tablename__= "user_tasks"


    id= Column(Integer,primary_key=True)
    tittle = Column(String)
    discription = Column(String)
    is_completed = Column(Boolean, default=False)

    user_id = Column(Integer, ForeignKey("users_table.id", ondelete="CASCADE"))