import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { baseURL } from '../Shared/baseurl';
import { Feedback } from '../Shared/feedback';
import { ProcessHTTPMsgService } from './process-httpmsg.service';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(private http: HttpClient,
              private processHTTPService: ProcessHTTPMsgService) { }


submitFeedback(feedback: Feedback): Observable<Feedback>
{
  const httpOptions ={
    headers: new HttpHeaders({
      'Content-Type' : 'application/json'
    })

  };
  return this.http.post<Feedback>(baseURL+'feedback',feedback,httpOptions)
  .pipe(catchError(this.processHTTPService.handleError));
}
}
