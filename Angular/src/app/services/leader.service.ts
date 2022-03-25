import { Injectable } from '@angular/core';
import { Leader } from '../Shared/leader';
import { LEADERS } from '../Shared/leaders';



@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor() { }

 getLeaders(): Promise<Leader[]>{
   return Promise.resolve(LEADERS);
 }

 getLeader(id:number):Promise<Leader>{
   return Promise.resolve(LEADERS.filter(leader => leader.id ===id )[0]);
 }

 getFeaturedLeader(): Promise<Leader>{
   return Promise.resolve(LEADERS.filter(leader => leader.featured)[0]);
 }
}
