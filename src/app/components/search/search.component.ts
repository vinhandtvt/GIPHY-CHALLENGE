import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {

  @Output() searchTerm = new EventEmitter<string>();

  public searchInput = new FormControl;

  public getSearchInput(event: MouseEvent): void {
    event.preventDefault();
    const inputValue = this.searchInput.value.trim();
    this.searchTerm.emit(inputValue);
    this.searchInput.reset();
  }

}
