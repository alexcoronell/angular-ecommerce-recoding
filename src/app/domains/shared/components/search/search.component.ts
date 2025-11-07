import { Component, signal } from '@angular/core';

import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search',
  imports: [FormsModule],
  templateUrl: './search.component.html',
})
export class SearchComponent {
  search = signal('');
}
