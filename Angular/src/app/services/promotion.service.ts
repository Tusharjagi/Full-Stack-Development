import { Injectable } from '@angular/core';
import { Promotion } from '../Shared/Promotion';
import { PROMOTIONS } from '../Shared/promotions';
import { Observable,of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor() { }

  getPromotions(): Observable<Promotion[]>{
    return of (PROMOTIONS).pipe(delay(2000));
  }

  getPromotion(id: string): Observable<Promotion>{
      return of (PROMOTIONS.filter((promo) => (promo.id == id)) [0]).pipe(delay(2000));
  }

  getFeaturedPromotion(): Observable<Promotion> {
    return of (PROMOTIONS.filter ((promo) => promo.featured) [0]).pipe(delay(2000));
  }
}
