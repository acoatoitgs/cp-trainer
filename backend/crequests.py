import requests

def get_user_data(username):
    """
    Returns the user task list, taken from training-beta.olinfo.it/api/user.

    Arguments:
     - username (string): Username of the contestant.
    Returns:
     - data (json): Json data from the request.
    """

    url = 'https://training-beta.olinfo.it/api/user'
    headers = {
        'User-Agent': 'CPTrainer/1.0',
        'Accept': '*/*',
        'Accept-Encoding': 'gzip, deflate, br, zstd',
        'Content-Type': 'application/json',
        'Connection': 'keep-alive'
    }

    data = {
        'action': 'get',
        'username': username
    }

    response = requests.post(url, headers=headers, json=data)
    if response.status_code == 200:
        return response.json()
    else:
        return {"error": "Failed to retrieve data"}

def get_task_list():
    """
    Returns the task list, taken from training-beta.olinfo.it/api/task.

    Returns:
     - data (json): Json data from the request.
    """
    url = 'https://training-beta.olinfo.it/api/task'
    headers = {
        'User-Agent': 'CPTrainer/1.0',
        'Accept': '*/*',
        'Accept-Encoding': 'gzip, deflate, br, zstd',
        'Content-Type': 'application/json',
        'Connection': 'keep-alive'
    }

    data = {
        'action': 'list',
        'first': 0,
        'last': 2000
    }
    response = requests.post(url, headers=headers, json=data)
    if response.status_code == 200:
        return response.json()
    else:
        return {"error": "Failed to retrieve data"}

def validate_user(username):
    url = 'https://training-beta.olinfo.it/api/user'
    headers = {
        'User-Agent': 'CPTrainer/1.0',
        'Accept': '*/*',
        'Accept-Encoding': 'gzip, deflate, br, zstd',
        'Content-Type': 'application/json',
        'Connection': 'keep-alive'
    }

    data = {
        'action': 'get',
        'username': username
    }

    response = requests.post(url, headers=headers, json=data)

    if(response.json().get('success') == 1):
        return {"success": 1,
                "image": "https://gravatar.com/avatar/" +response.json().get("mail_hash") +"?d=identicon&s=100"}
    else:
        return {"success": 0}
