import mysql.connector

import sys

if __name__ == "__main__":

    if len(sys.argv) != 6:
        print("Usage: appointee_summary_to_appointeev2.py <db_host> <db_user> <db_password> <db_name> <db_port>")
        sys.exit(1)
    else:

        db_host = sys.argv[1]
        db_user = sys.argv[2]
        db_password = sys.argv[3]
        db_name = sys.argv[4]
        db_port = sys.argv[5]

        db =   mysql.connector.connect(
            host=db_host,
            user=db_user,
            passwd=db_password,
            database=db_name,
            port=db_port

        )

        cursor = db.cursor()

        query = "SELECT * FROM appointee_summary"
        cursor.execute(query)

        for entry in cursor:
            print(entry[0])


