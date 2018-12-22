import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { FileInput } from 'ngx-material-file-input';


@Injectable()
export class CodeChantierService {

  public constructor(
    private http: HttpClient) { }

  public getAll(): Observable<CodeChantier[]> {
    return this.http.get(environment.api_url + 'codeschantier').pipe(
      map(x => this.mapCodesChantier(x))
    );
  }

  public update(codeChantier: CodeChantier, code: string, description: string, client: string, produit: string): Observable<CodeChantier> {
    let data = {
      code: code,
      description: description,
      client: client,
      produit: produit
    }
    return this.http.put(environment.api_url + 'codeschantier/' + codeChantier.code, data).pipe(
      map(x => this.mapCodeChantier(x))
    );
  }

  public create(code: string, description: string, client: string, produit: string): Observable<CodeChantier> {
    let data = {
      code: code,
      description: description,
      client: client,
      produit: produit
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

  public import(fileInput: FileInput): Observable<CodeChantier[]> {
    var formData = new FormData();
    for (let file of fileInput.files)
      formData.append(file.name, file);

    return this.http.post(environment.api_url + 'codeschantier/import', formData).pipe(
      map(x => this.mapCodesChantier(x))
    );
  }

  private mapCodesChantier(json: any): CodeChantier[] {
    return json.map(x => this.mapCodeChantier(x));
  }

  private mapCodeChantier(json: any): CodeChantier {
    return new CodeChantier(
      json.code,
      json.description,
      json.client,
      json.produit
    );
  }


}

export class CodeChantier {
  public constructor(
    public code: string,
    public description: string,
    public client: string,
    public produit: string
  ) {

  }
}
