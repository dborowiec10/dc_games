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
    while(current_tick <= MAX_TICKS):
        server.send_message("datetime", {"datetime": current_datetime.strftime("%Y-%m-%d")}, broadcast = True)
        
        time.sleep(5)
        
        user = datastore.find_user_by_username("admin")

        server.send_message(str(user.id), {"hello": "there"})

        current_tick = current_tick + 1
        current_datetime = current_datetime + timedelta(days=7)



def on_client_connect():
    print("Hello")
    print(request)

# app entrypoint
if __name__ == '__main__':
    # load game entities and configuration
    datastore.load_entities()

    # run flask in separate thread
    thread = Thread(target=server.start)
    thread.start()
    # run the game loop
    
    # server.add_listener("connect", on_client_connect)
    
    game_loop()


    thread.join()
