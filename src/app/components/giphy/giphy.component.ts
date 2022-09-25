import { Component, OnDestroy, OnInit } from '@angular/core';
import { SubscriptionLike } from 'rxjs';
import { Giphy } from 'src/app/interfaces/Giphy.interface';
import { GiphyService } from 'src/app/services/giphy.service';

@Component({
  selector: 'app-giphy',
  templateUrl: './giphy.component.html',
  styleUrls: ['./giphy.component.scss'],
})
export class GiphyComponent implements OnInit, OnDestroy {
  private readonly SUCCESS_CODE = 200;
  private trendingGiphySub$!: SubscriptionLike;
  private searchedGiphySub$!: SubscriptionLike;

  public searchInput: string = '';
  public giphyList: Giphy[] = [];
  public searchedGiphyList: Giphy[] = [];

  constructor(private giPhyService: GiphyService) {}

  ngOnInit(): void {
    this.trendingGiphySub$ = this.giPhyService
      .getTrendingGiphy()
      .subscribe((giphy) => {
        console.log(giphy);

        if (giphy?.meta?.status === this.SUCCESS_CODE) {
          const data = giphy.data;
          this.giphyList = this.formatData(data);
        }
      });
  }


  public onSearch(searchTerm: string): void {
    this.searchInput = searchTerm;
    this.searchedGiphySub$ = this.giPhyService
      .searchGiphy(searchTerm)
      .subscribe((giphy) => {
        if (giphy?.meta?.status === this.SUCCESS_CODE) {
          const data = giphy.data;
          this.giphyList = this.formatData(data);
        }
      });
  }

  private formatData(data: any): Giphy[] {
    const result: Giphy[] = [];
    data.forEach((item: any) => {
      const newItem = {
        id: item.id,
        url: item.images.downsized.url,
        import_datetime: item.import_datetime,
        username: item.username,
        title: item.title,
        rating: item.rating,
        giphyUrl: item.url
      };
      result.push(newItem);
    });
    return result;
  }

  public loadTrending(event: any): void {
    this.trendingGiphySub$ = this.giPhyService
      .getTrendingGiphy()
      .subscribe((giphy) => {
        if (giphy?.meta?.status === this.SUCCESS_CODE) {
          const data = giphy.data;
          this.giphyList = this.formatData(data);
        }
      });
  }

  ngOnDestroy(): void {
    this.trendingGiphySub$?.unsubscribe();
    this.searchedGiphySub$?.unsubscribe();
  }
}
