import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class EstadisticaService {
    private endPoint = `${environment.endPoint}/event/estadistica`;
    constructor(private httpClient: HttpClient) { }

    public getById$(registryId: any): Observable<any> {
        return this.httpClient.get<any>(`${this.endPoint}/${registryId}`);
    }
}
