import uuid


def generate_unique_identifier():
    code = str(uuid.uuid4())[:8]
    return code
