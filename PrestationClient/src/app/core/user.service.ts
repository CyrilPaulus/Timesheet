import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';


@Injectable()
export class UserService {

  public constructor(
    private http: HttpClient) { }

  public getAll(): Observable<User[]> {
    return this.http.get(environment.api_url + 'users').pipe(
      map(x => this.mapUsers(x))
    );
  }

  public update(user: User, code: string, firstName: string, lastName: string): Observable<User> {
    let data = {
      code: code,
      firstName: firstName,
      lastName: lastName
    }
    return this.http.put(environment.api_url + 'users/' + user.id, data).pipe(
      map(x => this.mapUser(x))
    );
  }

  public create(code: string, firstName: string, lastName: string): Observable<User> {
    let data = {
      code: code,
      firstName: firstName,
      lastName: lastName
    }
    return this.http.post(environment.api_url + 'users', data).pipe(
      map(x => this.mapUser(x))
    );
  }

  public delete(user: User): Observable<boolean> {
    return this.http.delete(environment.api_url + 'users/' + user.id).pipe(
      map(x => true)
    );
  }

  private mapUsers(json: any): User[] {
    return json.map(x => this.mapUser(x));
  }

  private mapUser(json: any): User {
    return new User(
      json.id,
      json.code,
      json.firstName,
      json.lastName,
      new Date(json.creationDate)
    );
  }


}

export class User {
  public constructor(
    public id: number,
    public code: string,
    public firstName: string,
    public lastName: string,
    public creationDate: Date
  ) {

  }
}
