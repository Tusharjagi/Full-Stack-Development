import { Injectable } from '@angular/core';
import { Promotion } from '../Shared/Promotion';
import { Observable } from 'rxjs';
import { baseURL } from '../Shared/baseurl';
import { HttpClient} from '@angular/common/http';
import { ProcessHTTPMsgService } from './process-httpmsg.service';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor(private http: HttpClient,
              private processHTTPmsgService: ProcessHTTPMsgService) { }

  getPromotions(): Observable<Promotion[]>{
    return this.http.get<Promotion[]>(baseURL+'promotions')
    .pipe(catchError(this.processHTTPmsgService.handleError));
  }

  getPromotion(id: string): Observable<Promotion>{
      return this.http.get<Promotion>(baseURL+'promotions/'+id )
      .pipe(catchError(this.processHTTPmsgService.handleError));
  }

  getFeaturedPromotion(): Observable<Promotion> {
    return this.http.get<Promotion[]>(baseURL+'promotions?feadtured=true')
    .pipe(map(promotions => promotions[0]))
    .pipe(catchError(this.processHTTPmsgService.handleError));
  }
}
