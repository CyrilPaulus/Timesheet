import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';


@Injectable()
export class CodeChantierService {

  public constructor(
    private http: HttpClient) { }

  public getAll(): Observable<CodeChantier[]> {
    return this.http.get(environment.api_url + 'codeschantier').pipe(
      map(x => this.mapCodesChantier(x))
    );
  }

  public update(codeChantier: CodeChantier, code: string, description: string): Observable<CodeChantier> {
    let data = {
      code: code,
      description: description
    }
    return this.http.put(environment.api_url + 'codeschantier/' + codeChantier.code, data).pipe(
      map(x => this.mapCodeChantier(x))
    );
  }

  public create(code: string, description: string): Observable<CodeChantier> {
    let data = {
      code: code,
      description: description
    }
    return this.http.post(environment.api_url + 'codeschantier', data).pipe(
      map(x => this.mapCodeChantier(x))
    );
  }

  public delete(codeChantier: CodeChantier): Observable<boolean> {
    return this.http.delete(environment.api_url + 'codeschantier/' + codeChantier.code).pipe(
      map(x => true)
    );
  }

  private mapCodesChantier(json: any): CodeChantier[] {
    return json.map(x => this.mapCodeChantier(x));
  }

  private mapCodeChantier(json: any): CodeChantier {
    return new CodeChantier(
      json.code,
      json.description
    );
  }


}

export class CodeChantier {
  public constructor(
    public code: string,
    public description: string
  ) {

  }
}
