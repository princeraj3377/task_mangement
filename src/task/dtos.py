from pydantic import BaseModel
class TaskSchema(BaseModel):
    tittle: str
    discription: str
    is_completed: bool = False



class TaskResponseSchema(BaseModel):
    id: int
    tittle: str
    discription: str
    is_completed: bool
    user_id: int |None =0
    
    