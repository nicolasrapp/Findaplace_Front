import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APIURL } from 'src/config';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
    
    
    constructor(private http: HttpClient) { }

    getAllReview() : Observable<Object>{
        return this.http.get(`${APIURL}/review`)
    }
}