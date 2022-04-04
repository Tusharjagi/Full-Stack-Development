import { Injectable } from '@angular/core';
import { Leader } from '../Shared/leader';
import { LEADERS } from '../Shared/leaders';
import { Observable,of } from 'rxjs';
import { catchError, delay, map } from 'rxjs/operators';
import { ProcessHTTPMsgService } from './process-httpmsg.service';
import { HttpClient } from '@angular/common/http';
import { baseURL } from '../Shared/baseurl';



@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor(private http: HttpClient,
              private processHTTPMsgService:ProcessHTTPMsgService) { }

 getLeaders(): Observable<Leader[]>{
   return this.http.get<Leader[]>(baseURL+'leaders')
   .pipe(catchError(this.processHTTPMsgService.handleError));
 }

 getLeader(id:number):Observable<Leader>{
   return this.http.get<Leader>(baseURL+'leaders/'+id)
   .pipe(catchError(this.processHTTPMsgService.handleError));
 }

 getFeaturedLeader(): Observable<Leader>{
   return this.http.get<Leader[]>(baseURL + 'leaders?featured?true')
   .pipe(map(leaders => leaders[1]))
   .pipe(catchError(this.processHTTPMsgService.handleError));
 }
}
