from threading import Thread
import json
import time
from datetime import datetime, timedelta
import server
import datastore

# game progress information
MAX_TICKS = 540
current_tick = 0
current_datetime = None

# the main game loop
def game_loop():
    global current_tick
    global current_datetime
    current_datetime = datetime.now()
    while(current_tick <= datastore.conf("MAX_TICKS")):
        server.send_message("datetime", {"datetime": current_datetime.strftime("%Y-%m-%d")}, broadcast = True)
        user = datastore.find_user_by_username("admin")
        server.send_message(str(user.id), {"hello": "there"})


        time.sleep(datastore.conf("TICK_TIME"))
        current_tick = current_tick + 1
        current_datetime = current_datetime + timedelta(days=1)

# app entrypoint
if __name__ == '__main__':
    # load game configuration
    datastore.load_config()

    # load game entities
    datastore.load_entities()

    # run flask in separate thread
    thread = Thread(target=server.start)
    thread.start()

    # run the game loop
    game_loop()

    # join both threads
    thread.join()
