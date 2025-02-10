import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Item } from '@miniprojet/models';
import { catchError, map, Observable } from 'rxjs';
import { environment } from './../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private readonly _http: HttpClient = inject(HttpClient);

  sendToBackend$(items: Item[]): Observable<string> {
    return this._http.post(environment.serverUrl + '/kraken', items).pipe(
      map((response: any) => {
        debugger;
        return response.message;
      }),
      catchError((error: any) => {
        debugger;
        return 'Erreur';
      })
    );
  }
}
