from pydantic import BaseModel, Field, field_validator

class TravelRequest(BaseModel):
    message : str = Field(
        min_length= 1,
        max_length= 5000,
        description= "User's travel planning request"
    )
    latitude : float
    longitude : float
    thread_id : str | None = Field(
        default= None,
        description= "Conversation thread identifier"
    )

    @field_validator("message")
    @classmethod
    def validate_message(cls, value : str) -> str:
        value = value.strip()

        if not value:
            raise ValueError("Message cannot be empty")

        return value