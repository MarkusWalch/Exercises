import json
import requests
#I have python (version 2) and python3 installed.
#I installed requests for version 3
#python3 consume_api.py in the command-line works
#python consume_api.py does NOT!

#Comment python
#indenting is IMPORTANT, no bracket, no semikolon

response = requests.get("https://api.stackexchange.com"+
"/2.3/questions?order=desc&sort=activity&site=stackoverflow")

for data in response.json()["items"]:
    if data["answer_count"] == 0:
        print(data["title"])
        print(data["link"])
        print()
    else:
        print("skipped")
        print()
