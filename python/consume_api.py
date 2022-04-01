import json
import requests
#I have python (version 2) and python3 installed.
#I installed requests for version 3
#python3 consume_api.py in the command-line works
#python consume_api.py does NOT!

response = requests.get("https://api.stackexchange.com/2.3/questions?order=desc&sort=activity&site=stackoverflow")

print(response.json()["items"])

#for data in response.json()["items"]:
#    print(data["title"])

