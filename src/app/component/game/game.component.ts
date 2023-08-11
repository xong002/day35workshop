import {
  ChangeDetectionStrategy,
  Component,
  Input,
  SimpleChanges,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { Game } from 'src/app/model/game';
import { GameService } from 'src/app/service/game.service';

@Component({
  selector: 'app-game',
  changeDetection: ChangeDetectionStrategy.Default,
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
})
export class GameComponent {
  @Input() pagePerRec = 0;
  games!: Game[];
  currentIndex: number = 0;
  pageNo: number = 1;
  sub$!: Subscription;

  constructor(private gameSvc: GameService) {}

  ngOnInit(): void {
    console.log('pagePerRec: ' + this.pagePerRec);
    if (this.pagePerRec == null) {
      this.pagePerRec = 5;
    }
    this.sub$ = this.gameSvc
      .getGames(this.pagePerRec, this.currentIndex)
      .subscribe((result) => {
        this.games = result.games;
        console.log(result);
      });
  }

  ngOnDestroy() {
    this.sub$.unsubscribe();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['pagePerRec'].currentValue == null) {
      this.pagePerRec = 5;
    } else {
      this.pagePerRec = changes['pagePerRec'].currentValue;
    }

    this.fetchData(this.pagePerRec, this.currentIndex);
  }

  previousPage() {
    this.pageNo--;
    this.currentIndex = this.currentIndex - this.pagePerRec;
    this.fetchData(this.pagePerRec, this.currentIndex)
  }

  nextPage() {
    this.pageNo++;
    this.currentIndex = this.currentIndex + this.pagePerRec;
    this.fetchData(this.pagePerRec, this.currentIndex)
  }

  private fetchData(pagePerRec: number, currentIndex: number) {
    this.gameSvc
      .getGames(this.pagePerRec, this.currentIndex)
      .subscribe((result) => {
        this.games = result.games;
        console.log('Sub result length: ' + this.games.length);
      });
  }
}
