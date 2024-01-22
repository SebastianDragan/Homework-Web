import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ServiceGameService {
  private scorCurentSubject = new BehaviorSubject<number>(0);
  scorCurent$ = this.scorCurentSubject.asObservable();

  private jocuriJucateSubject = new BehaviorSubject<number>(0);
  jocuriJucate$ = this.jocuriJucateSubject.asObservable();

  constructor() {}

  setScorCurent(noulScor: number): void {
    this.scorCurentSubject.next(noulScor);
  }

  incrementJocuriJucate(): void {
    const numarJocuriCurent = this.jocuriJucateSubject.value;
    this.jocuriJucateSubject.next(numarJocuriCurent + 1);
  }
}
