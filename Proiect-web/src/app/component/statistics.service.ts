// // statistics.service.ts
// import { Injectable } from '@angular/core';
// import { AngularFireModule } from '@angular/fire/firestore';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root',
// })
// export class StatisticsService {
//   constructor(private firestore: AngularFireModule) {}

//   // Obține numărul total de jocuri
//   getGamesPlayed(): Observable<number> {
//     return this.firestore
//       .doc<number>('/statistics/gamesPlayed')
//       .valueChanges();
//   }

//   // Actualizează numărul total de jocuri
//   updateGamesPlayed(newTotal: number): Promise<void> {
//     return this.firestore
//       .doc('/statistics/gamesPlayed')
//       .set({ value: newTotal });
//   }
// }
