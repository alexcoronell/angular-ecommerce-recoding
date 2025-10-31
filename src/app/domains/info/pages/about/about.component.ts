import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CounterComponent } from '@shared/components/counter/counter.component';
import { HighlightDirective } from '@shared/directives/highlight.directive';

import { WaveAudioComponent } from '@info/components/wave-audio/wave-audio.component';

@Component({
  selector: 'app-about',
  imports: [
    CommonModule,
    FormsModule,
    CounterComponent,
    WaveAudioComponent,
    HighlightDirective,
  ],
  templateUrl: './about.component.html',
})
export default class AboutComponent {
  $duration = signal(1000);
  $message = signal('Hola');

  changeDuration(event: Event) {
    const input = event.target as HTMLInputElement;
    this.$duration.set(input.valueAsNumber);
  }

  changeMessage(event: string) {
    console.log('changeMessage in AboutComponent', event);
    //this.message.set(input.value);
  }
}
