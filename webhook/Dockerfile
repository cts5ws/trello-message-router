FROM python:3-slim

RUN apt-get update -y && apt-get install -y python-pip python-dev build-essential
WORKDIR /app

ADD requirements.txt .
RUN pip3 install -r requirements.txt

ADD . .

ENTRYPOINT ["python3"]

CMD ["app.py"]
