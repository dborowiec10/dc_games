import { Injectable } from "@angular/core";
import { Subject } from 'rxjs/Subject';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class StateService {
    
    public update = new Subject();

    public inventory = new Subject();

    public user = null;

    public users = [];

    public companies = [];

    public areas = [];

    public user_areas = [];

    public building_types = [];

    public rack_switch_types = [];

    public rack_pdu_types = [];

    public rack_types = [];

    public accelerator_types = [];

    public cpu_types = [];

    public memory_types = [];

    public psu_types = [];

    public server_cooling_types = [];

    public server_types = [];

    public buildings = [];

    public racks = [];

    public servers = [];

    constructor(private api: ApiService, private auth: AuthService){
        this.update.subscribe((res) => {
            switch(res){
                case "areas": {
                    this.getAreas(true).subscribe(res => this.update.next("areas_done"));
                    this.auth.reload_user().subscribe((res) => {
                        this.user = res;
                        this.update.next("user");
                    });
                    break;
                }
                case "buildings": {
                    this.getBuildings(true).subscribe();
                    this.auth.reload_user().subscribe((res) => {
                        this.user = res;
                        this.update.next("user");
                    });
                    break;
                }
                case "racks": {
                    this.getRacks(true).subscribe();
                    this.auth.reload_user().subscribe((res) => {
                        this.user = res;
                        this.update.next("user");
                    });
                    break;
                }
                case "servers": {
                    this.getServers(true).subscribe();
                    this.auth.reload_user().subscribe((res) => {
                        this.user = res;
                        this.update.next("user");
                    });
                    break;
                }
            }
        });
    }

    public getUserAreas(): Observable<any> {
        let found = [];
        for(let a of this.areas){
            if(a["owner_id"] === this.user["company_id"]){
                found.push(a);
            }
        }
        if(found.length > 0){
            return new Observable((obs) => {
                obs.next(found);
                obs.complete();
            })
        } else {
            return this.getAreas(true)
            .pipe(
                map((areas) => {
                    for(let a of this.areas){
                        if(a["owner_id"] === this.user["company_id"]){
                            found.push(a);
                        }
                    }
                    if(found.length > 0){
                        return found;
                    } else {
                        return null;
                    }
                })
            );
        }
    }
 
    public getBuildings(force: boolean): Observable<any> {
        if(this.buildings.length < 1 || force){
            return this.api.buildings_by_company(this.user["company_id"])
            .pipe(
                map((buildings) => {
                    this.buildings = buildings["buildings"];
                    return this.buildings;
                })
            );
        } else {
            return new Observable((obs) => {
                obs.next(this.buildings);
                obs.complete();
            }); 
        }
    }

    public getRacks(force: boolean): Observable<any> {
        if(this.racks.length < 1 || force){
            return this.api.racks_by_company(this.user["company_id"])
            .pipe(
                map((racks) => {
                    this.racks = racks["racks"];
                    return this.racks;
                })
            );
        } else {
            return new Observable((obs) => {
                obs.next(this.racks);
                obs.complete();
            }); 
        }
    }

    public getServers(force: boolean): Observable<any> {
        if(this.servers.length < 1 || force){
            return this.api.servers_by_company(this.user["company_id"])
            .pipe(
                map((servers) => {
                    this.servers = servers["servers"];
                    return this.servers;
                })
            );
        } else {
            return new Observable((obs) => {
                obs.next(this.servers);
                obs.complete();
            }); 
        }
    }

    public getCurrentUser(): Observable<any> {
        if(this.auth.isLoggedIn()){
            this.user = this.auth.user;
        }
        return new Observable(obs => obs.next(this.user));
    }

    public getUser(id: string): Observable<any> {
        if(this.user !== null && this.user["id"] === id){
            return new Observable((obs) => {
                obs.next(this.user);
                obs.complete();
            });
        }
        let found = null;
        for(let u of this.users){
            if(u["id"] === id){
                found = u;
                break;
            }
        }
        if(found !== null){
            return new Observable((obs) => {
                obs.next(found);
                obs.complete();
            })
        } else {
            return this.getUsers(false)
            .pipe(
                map((users) => {
                    let f = null;
                    for(let u of users){
                        if(u["id"] === id){
                            f = u;
                            break;
                        }
                    }
                    if(f !== null){
                        return f;
                    } else {
                        return null;
                    }
                })
            );
        }       
    }

    public getCompany(id: string): Observable<any> {
        let found = null;
        for(let c of this.companies){
            if(c["id"] === id){
                found = c;
                break;
            }
        }
        if(found !== null){
            return new Observable((obs) => {
                obs.next(found);
                obs.complete();
            })
        } else {
            return this.getCompanies(false)
            .pipe(
                map((companies) => {
                    let f = null;
                    for(let c of companies){
                        if(c["id"] === id){
                            f = c;
                            break;
                        }
                    }
                    if(f !== null){
                        return f;
                    } else {
                        return null;
                    }
                })
            );
        }
    }

    public getUsers(force: boolean): Observable<any> {
        if(this.users.length < 1 || force){
            return this.api.users()
            .pipe(
                map((users) => {
                    this.users = users["users"];
                    return this.users;
                })
            );
        } else {
            return new Observable((obs) => {
                obs.next(this.users);
                obs.complete();
            });
        }
    }

    public getCompanies(force: boolean): Observable<any> {
        if(this.companies.length < 1 || force){
            return this.api.companies()
            .pipe(
                map((comp) => {
                    this.companies = comp["companies"];
                    return this.companies;
                })
            );
        } else {
            return new Observable((obs) => {
                obs.next(this.companies);
                obs.complete();
            }); 
        }
    }

    public getAreas(force: boolean): Observable<any> {
        if(this.areas.length < 1 || force){
            return this.api.areas()
            .pipe(
                map((areas) => {
                    this.areas = areas["areas"];
                    return this.areas;
                })
            );
        } else {
            return new Observable((obs) => {
                obs.next(this.areas);
                obs.complete();
            }); 
        }
    }

    public getBuildingTypes(): Observable<any> {
        if(this.building_types.length < 1){
            return this.api.building_types()
            .pipe(
                map((building_types) => {
                    this.building_types = building_types["building_types"];
                    return this.building_types;
                })
            );
        } else {
            return new Observable((obs) => {
                obs.next(this.building_types);
                obs.complete();
            }); 
        }
    }

    public getRackSwitchTypes(): Observable<any> {
        if(this.rack_switch_types.length < 1){
            return this.api.rack_switch_types()
            .pipe(
                map((rack_switch_types) => {
                    this.rack_switch_types = rack_switch_types["rack_switch_types"];
                    return this.rack_switch_types;
                })
            );
        } else {
            return new Observable((obs) => {
                obs.next(this.rack_switch_types);
                obs.complete();
            }); 
        }
    }

    public getRackPduTypes(): Observable<any> {
        if(this.rack_pdu_types.length < 1){
            return this.api.rack_pdu_types()
            .pipe(
                map((rack_pdu_types) => {
                    this.rack_pdu_types = rack_pdu_types["rack_pdu_types"];
                    return this.rack_pdu_types;
                })
            );
        } else {
            return new Observable((obs) => {
                obs.next(this.rack_pdu_types);
                obs.complete();
            }); 
        }
    }

    public getRackTypes(): Observable<any> {
        if(this.rack_types.length < 1){
            return this.api.rack_types()
            .pipe(
                map((rack_types) => {
                    this.rack_types = rack_types["rack_types"];
                    return this.rack_types;
                })
            );
        } else {
            return new Observable((obs) => {
                obs.next(this.rack_types);
                obs.complete();
            }); 
        }
    }


    public getAcceleratorTypes(): Observable<any> {
        if(this.accelerator_types.length < 1){
            return this.api.accelerator_types()
            .pipe(
                map((accelerator_types) => {
                    this.accelerator_types = accelerator_types["accelerator_types"];
                    return this.accelerator_types;
                })
            );
        } else {
            return new Observable((obs) => {
                obs.next(this.accelerator_types);
                obs.complete();
            }); 
        }
    }

    public getCpuTypes(): Observable<any> {
        if(this.cpu_types.length < 1){
            return this.api.cpu_types()
            .pipe(
                map((cpu_types) => {
                    this.cpu_types = cpu_types["cpu_types"];
                    return this.cpu_types;
                })
            );
        } else {
            return new Observable((obs) => {
                obs.next(this.cpu_types);
                obs.complete();
            }); 
        }
    }

    public getMemoryTypes(): Observable<any> {
        if(this.memory_types.length < 1){
            return this.api.memory_types()
            .pipe(
                map((memory_types) => {
                    this.memory_types = memory_types["memory_types"];
                    return this.memory_types;
                })
            );
        } else {
            return new Observable((obs) => {
                obs.next(this.memory_types);
                obs.complete();
            }); 
        }
    }

    public getPsuTypes(): Observable<any> {
        if(this.psu_types.length < 1){
            return this.api.psu_types()
            .pipe(
                map((psu_types) => {
                    this.psu_types = psu_types["psu_types"];
                    return this.psu_types;
                })
            );
        } else {
            return new Observable((obs) => {
                obs.next(this.psu_types);
                obs.complete();
            }); 
        }
    }

    public getServerCoolingTypes(): Observable<any> {
        if(this.server_cooling_types.length < 1){
            return this.api.server_cooling_types()
            .pipe(
                map((server_cooling_types) => {
                    this.server_cooling_types = server_cooling_types["server_cooling_types"];
                    return this.server_cooling_types;
                })
            );
        } else {
            return new Observable((obs) => {
                obs.next(this.server_cooling_types);
                obs.complete();
            }); 
        }
    }

    public getServerTypes(): Observable<any> {
        if(this.server_types.length < 1){
            return this.api.server_types()
            .pipe(
                map((server_types) => {
                    this.server_types = server_types["server_types"];
                    return this.server_types;
                })
            );
        } else {
            return new Observable((obs) => {
                obs.next(this.server_types);
                obs.complete();
            }); 
        }
    }

}