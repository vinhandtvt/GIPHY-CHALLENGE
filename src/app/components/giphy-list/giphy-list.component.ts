import { ThisReceiver } from '@angular/compiler';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Giphy } from 'src/app/interfaces/Giphy.interface';

@Component({
  selector: 'app-giphy-list',
  templateUrl: './giphy-list.component.html',
  styleUrls: ['./giphy-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GiphyListComponent implements OnChanges {
  @Input() giphy!: Giphy[];
  @Input() searchTerm!: String;
  @Output() onBackToTrending = new EventEmitter<void>();

  private readonly DEFAULT_TITLE = 'Trending';

  public giphyList!: Giphy[];
  public searchedGiphyList!: Giphy[];
  public showSearchList: boolean = false;
  public title: string = this.DEFAULT_TITLE;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['giphy']?.currentValue) {
      this.giphyList = changes['giphy']?.currentValue;
    }
    if (changes['searchTerm']?.currentValue) {
      this.showSearchList = true;
      this.title = changes['searchTerm']?.currentValue;
    }
  }

  public openOnGiphy(gif: Giphy): void {
    const url = gif.giphyUrl;
    window.open(url, '_blank');
  }

  public getTrending(): void {
    this.showSearchList = false;
    this.title = this.DEFAULT_TITLE;
    this.onBackToTrending.emit();
  }
}
