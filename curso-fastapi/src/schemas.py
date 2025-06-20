from pydantic import BaseModel, EmailStr, Field
import datetime

class AuthorCreate(BaseModel):
    username: str
    email: EmailStr
    password: str

class UserLogin(BaseModel):
    username: str
    password: str

class PostCreate(BaseModel):
    title: str
    text: str
    date: datetime.datetime = Field(default_factory=datetime.datetime.now)

class CommentCreate(BaseModel):
    post_id: int
    title: str
    text: str
    date: datetime.datetime = Field(default_factory=datetime.datetime.now)
