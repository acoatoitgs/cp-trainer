import sqlite3
import os

db_path = os.path.join(os.path.dirname(__file__), 'db', 'cpdata.db')

if not os.path.exists(os.path.dirname(db_path)):
    os.makedirs(os.path.dirname(db_path))

conn = sqlite3.connect(db_path)
cursor = conn.cursor()

cursor.execute('''
CREATE TABLE IF NOT EXISTS "training" (
    id INTEGER PRIMARY KEY,
    name TEXT,
    title TEXT,
    score_multiplier REAL,
    max_points REAL,
    user_score REAL,
    user_points REAL
);
''')

conn.commit()
conn.close()

print(f"Database created successfully at {db_path}")
