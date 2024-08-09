from flask import Flask, jsonify, request
from flask_cors import CORS
from crequests import get_user_data, get_task_list, validate_user
from datetime import datetime
import sqlite3
import os
import random
app = Flask(__name__)
CORS(app)

# API TESTING/UTILS
@app.route('/api/testapi', methods=['GET'])
def test_api():
    data = {"message": "API is up and running!"}
    return jsonify(data)

@app.route('/api/randomcparticle', methods=['GET'])
def get_random_cp_article():
    # Connect to the SQLite database
    conn = sqlite3.connect('./backend/db/articles.db')
    cursor = conn.cursor()

    cursor.execute('SELECT * FROM articles ORDER BY RANDOM() LIMIT 1;')
    article = cursor.fetchone()
    
    if article is None:
        return jsonify({"success": 0})
    data = {"id": article[0],
            "title": article[1],
            "subtitle": article[2],
            "platform": article[3],
            "url": article[4],
            "success": 1}

    conn.close()
    return jsonify(data)

@app.route('/api/insertcparticle', methods=['POST'])
def insert_cp_article():
    request_data = request.get_json()

    title = request_data.get('title')
    summary = request_data.get('summary')
    platform = request_data.get('platform')
    url = request_data.get('url')

    if not all([title, summary, platform, url]):
        return jsonify({"success": 0})
    
    conn = sqlite3.connect('./backend/db/articles.db')
    cursor = conn.cursor()

    cursor.execute('INSERT INTO articles (title, summary, platform, url) VALUES (?,?,?,?);', (title, summary, platform, url))

    conn.commit()
    conn.close()

    return jsonify({"success": 1})

# CMSOCIAL CALLS
@app.route('/api/training/updatetasklist', methods=['POST'])
def update_task_list():
    # Get data from the request body
    task_list = get_task_list()

    # Check if the request was successful
    if task_list.get('success') != 1:
        return jsonify({"success": 0}), 500

    # Extract tasks from the task list
    tasks = task_list.get('tasks', [])

    # Connect to the SQLite database
    conn = sqlite3.connect('./backend/db/cpdata.db')
    cursor = conn.cursor()

    for task in tasks:
        task_data = (
            task.get('id'),
            task.get('name'),
            task.get('title'),
            task.get('score_multiplier'),
            round(100 * task.get('score_multiplier')),  # max_points
            0,     # user_score (default value, update as needed)
            0      # user_points (default value, update as needed)
        )
        
        # Insert or replace data into the database
        cursor.execute('''
        INSERT OR REPLACE INTO training (id, name, title, score_multiplier, max_points, user_score, user_points)
        VALUES (?, ?, ?, ?, ?, ?, ?)
        ''', task_data)

    # Commit the transaction and close the connection with database
    conn.commit()
    conn.close()
    
    data = {"success": 1}
    return jsonify(data)
    task_list = get_task_list()

    # Check if the request was successful
    if task_list.get('success') != 1:
        return jsonify({"success": 0}), 500

    # Extract tasks from the task list
    tasks = task_list.get('tasks', [])

    # Connect to the SQLite database
    conn = sqlite3.connect('./backend/db/cpdata.db')
    cursor = conn.cursor()

    for task in tasks:
        task_data = (
            task.get('id'),
            task.get('name'),
            task.get('title'),
            task.get('score_multiplier'),
            round(100* task.get('score_multiplier')),  # max_points
            0,     # user_score (default value, update as needed)
            0      # user_points (default value, update as needed)
        )
        
        # Insert or replace data into the database
        cursor.execute('''
        INSERT OR REPLACE INTO training (id, name, title, score_multiplier, max_points, user_score, user_points)
        VALUES (?, ?, ?, ?, ?, ?, ?)
        ''', task_data)

    #Commit the transaction and close the connection with database
    conn.commit()
    conn.close()
    
    data = {"success": 1}
    return jsonify(data)

@app.route('/api/training/updateuserdata', methods=['POST'])
def update_user_data():

    # Connect to the SQLite database
    conn = sqlite3.connect('./backend/db/cpdata.db')
    cursor = conn.cursor()
        
    # Get username from request body
    data = request.get_json()
    username = data.get('username', '')
    print(f"Received username: {username}, making request...")

    # Get data from API
    user_list = get_user_data(username)
    scores = user_list.get('scores', [])

    # Erase previous user progress
    cursor.execute('''
        UPDATE training
        SET user_score = 0, user_points = 0
    ''')
    conn.commit()

    # Fill table
    for task in scores:
        t_name = task.get('name')
        t_score = task.get('score')
        cursor.execute("SELECT max_points FROM training WHERE name = ?", (t_name,))
        t_max_score_tuple = cursor.fetchone()

        if t_max_score_tuple is not None:
            t_max_score = t_max_score_tuple[0]
            user_points = t_score * t_max_score / 100
            cursor.execute('''
                UPDATE training
                SET user_score = ?, user_points = ?
                WHERE name = ?''', (t_score, user_points, t_name))
            
    # Commit the transaction and close the connection with database
    conn.commit()
    conn.close()
    # Return success response
    data = {"success": 1}
    return jsonify(data)

@app.route('/api/training/getrandomproblem', methods=['POST'])
def get_random_problem():
    # Connect to the SQLite database
    conn = sqlite3.connect('./backend/db/cpdata.db')
    cursor = conn.cursor()

    # Get data from request
    data = request.get_json()
    include_full = data.get('full')
    include_partial = data.get('partial')
    include_fail = data.get('fail')

    if include_full == include_partial == include_fail == 0:
        response = {"success": 0}
        return jsonify(response)
    
    task_array = []
    if include_full == 1:
        cursor.execute("SELECT * FROM training WHERE user_score = 100;")
        # Fetch all rows from the result of the query
        rows = cursor.fetchall()

        # Add each name to task_array
        for row in rows:
            task_name = row[1]
            task_array.append(task_name)
    if include_partial == 1:
        cursor.execute("SELECT * FROM training WHERE user_score != 100 AND user_score != 0;")
        # Fetch all rows from the result of the query
        rows = cursor.fetchall()
        
        # Add each name to task_array
        for row in rows:
            task_name = row[1]
            task_array.append(task_name)

    if include_fail == 1:
        cursor.execute("SELECT * FROM training WHERE user_score = 0;")
        # Fetch all rows from the result of the query
        rows = cursor.fetchall()
        
        # Add each name to task_array
        for row in rows:
            task_name = row[1]
            task_array.append(task_name)

    if len(task_array) == 0:
        response = {"success": 0}
        return jsonify(response)
    
    task = random.choice(task_array)
    print(task)
    cursor.execute("SELECT * FROM training WHERE name = ?;", (task,))
    task_db = cursor.fetchone()

    response = {"task": task,
                "url": "https://training.olinfo.it/#/task/" + task + "/statement",
                "id": task_db[0],
                "title": task_db[2],
                "max_points": task_db[4],
                "user_score": task_db[5],
                "user_points": task_db[6]}
    return jsonify(response)
    
@app.route('/api/training/isuservalid', methods=['POST'])
def is_user_valid():
    data = request.get_json()
    username = data.get('username')

    res = validate_user(username)
    print(res)
    return jsonify(res)

@app.route('/api/training/tasksolvedpercentage', methods=['POST'])
def tasks_solved_percentage():
    # Connect to the SQLite database
    conn = sqlite3.connect('./backend/db/cpdata.db')
    cursor = conn.cursor()

    cursor.execute("SELECT COUNT(*) FROM training")
    total_count = cursor.fetchone()[0]

    cursor.execute("SELECT COUNT(*) FROM training WHERE user_score = 100")
    full_count = cursor.fetchone()[0]

    cursor.execute("SELECT COUNT(*) FROM training WHERE user_score = 0")
    fail_count = cursor.fetchone()[0]

    partial_count =  total_count-full_count-fail_count
    data = {"total_count": total_count,
            
            "full_count": full_count,
            "partial_count": partial_count,
            "fail_count": fail_count,

            "full_percentage": full_count * 100/total_count,
            "partial_percentage": partial_count * 100/total_count,
            "fail_percentage": fail_count * 100/total_count,
            }
    cursor.close()
    return jsonify(data)

@app.route('/api/training/getuserstats', methods=['POST'])
def get_user_stats():
    username = request.get_json().get('username')
    print(request.get_json())

    if username is None:
        return jsonify({"success": 0})
    
    data = get_user_data(username)
    mail_hash = data.get("mail_hash") 
    timestamp = int(data.get("join_date"))

    print(timestamp)

    dt = datetime.fromtimestamp(timestamp)

    response = {"username": username,
                "first_name": data.get("first_name"),
                "last_name": data.get("last_name"),
                "user_score": data.get("score"),
                "join_year": dt.year,
                "join_month": dt.month,
                "join_day": dt.day,
                "image_url": "https://gravatar.com/avatar/" + mail_hash +"?d=identicon&s=300",
                "success": 1}
    return jsonify(response)


    

if __name__ == '__main__':
    app.run(debug=True)
