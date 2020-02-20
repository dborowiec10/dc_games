import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SocketService {
    private url = 'http://localhost:5000';
    private socket;

    constructor(){
        this.socket = io(this.url);
    }

    public getDatetime(){
        return Observable.create((obs) => {
            this.socket.on('datetime', (message) => {
                obs.next(message);
            });
        })
    }

}