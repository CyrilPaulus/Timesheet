import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';


@Injectable()
export class PrestationService {
    public constructor(
        private http: HttpClient) {

    }

    public addPrestation(codeChantier: string,
        userId: number,
        description: string,
        duration: number,
        date: Date): Observable<Prestation> {
        let data = {
            userId: userId,
            codeChantierId: codeChantier,
            date: date,
            duration: duration,
            description: description
        }
        return this.http.post(environment.api_url + 'prestation', data).pipe(
            map(x => this.mapPrestation(x))
        );
    }

    public update(prestation: Prestation,
        codeChantier: string,
        description: string,
        duration: number): Observable<Prestation> {
        let data = {
            userId: prestation.userId,
            codeChantierId: codeChantier,
            date: prestation.date,
            duration: duration,
            description: description
        }
        return this.http.put(environment.api_url + 'prestation/' + prestation.id, data).pipe(
            map(x => this.mapPrestation(x))
        );
    }

    public delete(prestationId: number): Observable<boolean> {
        return this.http.delete(environment.api_url + 'prestation/' + prestationId).pipe(
            map(x => true)
        );
    }

    public getByMonth(userId: number, year: number, month: number): Observable<Prestation[]> {
        let rul = environment.api_url + 'prestation/user/' + userId + '/' + year + '/' + month;
        return this.http.get(rul).pipe(
            map(x => this.mapPrestations(x))
        );
    }

    private mapPrestations(json: any): Prestation[] {
        return json.map(x => this.mapPrestation(x));
    }

    private mapPrestation(json: any): Prestation {
        return new Prestation(
            json.id,
            json.userId,
            json.codeChantierId,
            new Date(json.date),
            json.duration,
            json.description
        )
    }
}


export class Prestation {
    public constructor(
        public id: number,
        public userId: number,
        public codeChantier: string,
        public date: Date,
        public duration: number,
        public description: string
    ) {

    }
}