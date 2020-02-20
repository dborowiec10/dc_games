import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SocketService {
    private url = 'http://localhost:5000';
    private socket = null;
    private observers = [];
    private session_id = null;
    private id_observer = null;

    constructor(){}

    public connect(user_id: string) {
        if(!this.isConnected()){
            this.socket = io(this.url, {query: "uid=" + user_id});
            this.socket.on("connect", (conn) => {
                this.session_id = this.socket.io.engine.id;
            });

            if(this.id_observer !== null){
                this.socket.on(this.id_observer["user_id"], this.id_observer["obs"]);
            }

            while(this.observers.length > 0){
                const o = this.observers.pop();
                this.socket.on(o["event"], o["obs"]);
            }
        }
    }

    public disconnect(){
        if(this.isConnected()){
            this.socket.disconnect();
            this.session_id = null;
            this.id_observer = null;
            this.socket = null;
        }
    }

    public isConnected(): boolean {
        if (this.socket === null){
            return false;
        } else {
            if(this.socket.disconnected){
                return false;
            } else if(this.socket.connected) {
                return true;
            }
        }
    }

    public registerObserver(event: string, obs: any){
        if(!this.isConnected()){
            this.observers.push({
                "event": event,
                "obs": obs
            });
        } else {
            this.socket.on(event, obs);
        }
    }

    public registerIdObserver(user_id: string, obs: any){
        if(!this.isConnected()){
            this.id_observer = {
                "event": user_id,
                "obs": obs
            };
        } else {
            this.socket.on(user_id, obs);
        }
    }

}