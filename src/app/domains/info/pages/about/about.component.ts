import { Component, signal } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { WaveAudioComponent } from '@info/components/wave-audio/wave-audio.component';

import { CounterComponent } from '@shared/components/counter/counter.component';
import { HighlightDirective } from '@shared/directives/highlight.directive';

import { BehaviorSubject, delay, Subject } from 'rxjs';

@Component({
  selector: 'app-about',
  imports: [
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

  obsWithInit$ = new BehaviorSubject<string>('init value');
  $withInit = toSignal(this.obsWithInit$, { requireSync: true });

  obsWithoutInit$ = new Subject<string>();
  $withoutInit = toSignal(this.obsWithoutInit$.pipe(delay(3000)), {
    initialValue: '----',
  });

  changeDuration(event: Event) {
    const input = event.target as HTMLInputElement;
    this.$duration.set(input.valueAsNumber);
  }

  changeMessage(event: string) {
    console.log('changeMessage in AboutComponent', event);
    //this.message.set(input.value);
  }

  emitWithInit() {
    this.obsWithInit$.next('new Value');
  }

  emitWithoutInit() {
    console.log('emitWithoutInit in AboutComponent');
    this.obsWithoutInit$.next('*****');
  }
}
