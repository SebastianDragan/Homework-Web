import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/auth.service';
import { ServiceGameService } from '../service/service-game.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  // Adaugă aceste două proprietăți
  scorCurent$: number = 0;
  jocuriJucate$: number = 0;

  constructor(private auth: AuthService, private gameService: ServiceGameService) { }

  logout() {
    this.auth.logout();
  }

  ngOnInit() {
    this.gameService.scorCurent$.subscribe(noulScor => {
      this.scorCurent$ = noulScor;
    });

    this.gameService.jocuriJucate$.subscribe(numarJocuri => {
      this.jocuriJucate$ = numarJocuri;
    });
  }
}
