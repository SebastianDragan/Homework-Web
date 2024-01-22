import { Component } from '@angular/core';
import { CellEnum } from '../cell/CellEnum';
import { ServiceGameService } from '../service/service-game.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
})
export class BoardComponent {
  public board!: CellEnum[][];
  public statusMessage!: string;
  public isGameOver: boolean = false;
  public currentPlayer!: CellEnum;
  public isSelected: boolean = false;
  public noulScor!: number;
  private calculateScore(): number {
    // Implementează logica de calcul a scorului în funcție de rezultatul jocului
    if (this.isWin()) {
      // Câștig
      return 1;
    } else if (this.isDraw()) {
      // Remiză
      return 0;
    } else {
      // Pierdere
      return 0;
    }
  }

  constructor(private gameService: ServiceGameService) {
    this.newGame();
  }

  get gameOver(): boolean {
    return this.isGameOver;
  }

  newGame() {
    this.board = [];
    for (let row = 0; row < 3; row++) {
      this.board[row] = [];
      for (let col = 0; col < 3; col++) {
        this.board[row][col] = CellEnum.EMPTY;
      }
    }
    this.currentPlayer = CellEnum.X;
    this.isGameOver = false;
    this.statusMessage = `Player ${this.currentPlayer}'s turn`;

    this.gameService.incrementJocuriJucate();
  }

 move(row: number, col: number): void {
    if (!this.isGameOver && this.board[row][col] === CellEnum.EMPTY) {
      this.board[row][col] = this.currentPlayer;

      // După ce jocul se încheie, calculează scorul și trimite-l către serviciu
      if (this.isDraw() || this.isWin()) {
        const noulScor = this.calculateScore();
        this.gameService.setScorCurent(noulScor);
        this.isGameOver = true;
      } else {
        this.currentPlayer =
          this.currentPlayer === CellEnum.X ? CellEnum.O : CellEnum.X;
        this.statusMessage = `Player ${this.currentPlayer}'s turn`;
      }
    }
  }


  isDraw(): boolean {
    for (const columns of this.board) {
      for (const col of columns) {
        if (col === CellEnum.EMPTY) {
          return false;
        }
      }
    }
    return !this.isWin();
  }

  isWin(): boolean {
    //orizontal
    for (const columns of this.board) {
      if (
        columns[0] === columns[1] &&
        columns[0] === columns[2] &&
        columns[0] !== CellEnum.EMPTY
      ) {
        return true;
      }
    }
    // Verificare verticală
    for (let col = 0; col < this.board[0].length; col++) {
      if (
        this.board[0][col] === this.board[1][col] &&
        this.board[0][col] === this.board[2][col] &&
        this.board[0][col] !== CellEnum.EMPTY
      ) {
        return true;
      }
    }

    // Verificare diagonală
    if (
      this.board[0][0] === this.board[1][1] &&
      this.board[0][0] === this.board[2][2] &&
      this.board[0][0] !== CellEnum.EMPTY
    ) {
      return true;
    }

    if (
      this.board[0][2] === this.board[1][1] &&
      this.board[0][2] === this.board[2][0] &&
      this.board[0][2] !== CellEnum.EMPTY
    ) {
      return true;
    }
    return false;
  }
}
