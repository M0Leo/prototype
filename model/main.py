from fastapi import FastAPI, Request

app = FastAPI()

# this is a mock database
jobs = [
  {
    "title": "Frontend Developer",
    "location": "New York",
    "description": "We are looking for a skilled Frontend Developer to join our team.",
  },
  {
    "title": "Backend Developer",
    "location": "San Francisco",
    "description": "Join our team as a Backend Developer and work on exciting projects.",
  },
  {
    "title": "Full Stack Developer",
    "location": "London",
    "description": "We are hiring a Full Stack Developer to work on our innovative products.",
  },
  {
    "title": "Mobile App Developer",
    "location": "Berlin",
    "description": "Join our mobile app development team and create amazing user experiences.",
  },
  {
    "title": "Data Scientist",
    "location": "Tokyo",
    "description": "We are seeking a talented Data Scientist to analyze and interpret complex data.",
  },
  {
    "title": "UI/UX Designer",
    "location": "Paris",
    "description": "Join our design team and create beautiful and intuitive user interfaces.",
  },
  {
    "title": "DevOps Engineer",
    "location": "Sydney",
    "description": "We are looking for a DevOps Engineer to optimize our development processes.",
  },
]


@app.get("/")
def read_root():
    return "KKKK"

#later this should be parsing cv and return relevant jobs
@app.get("/jobs")
def read_jobs(request: Request):
  file_name = request.headers.get("file")
  print(file_name)
  return jobs
