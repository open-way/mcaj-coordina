import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class RegistryService {
    private endPoint = `${environment.endPoint}/event/registry`;
    constructor(private httpClient: HttpClient) { }

    public getAll$(): Observable<any> {
        return this.httpClient.get<any>(`${this.endPoint}/13`);
    }
}
