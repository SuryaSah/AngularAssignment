import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

@Injectable()
export class MapRemarkService {
  constructor(private http: HttpClient) { }
  endpoint = '/api/';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  private extractData(res: Response) {
    let body = res;
    return body || { };
 }

 getAllMarkers(): Observable<any> {
  return this.http.get(this.endpoint+'allMarker').pipe(
    map(this.extractData));
  }

  addMarker (selectedMarker): Observable<any> {
  console.log(selectedMarker);
    return this.http.post<any>(this.endpoint + 'addMarker', JSON.stringify(selectedMarker), this.httpOptions).pipe(
      map(this.extractData));
  }

}
