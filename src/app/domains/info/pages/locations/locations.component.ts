import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  resource,
  signal,
} from '@angular/core';
import { environment } from '@env/environment';

interface Location {
  id: number;
  name: string;
  description: string;
  // ... otros campos que tenga tu API
}

interface LocationParams {
  origin: string;
}

@Component({
  selector: 'app-locations',
  imports: [],
  templateUrl: './locations.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class LocationsComponent {
  $origin = signal('');

  constructor() {
    afterNextRender(async () => {
      navigator.geolocation.getCurrentPosition(
        position => {
          console.log('Latitude:', position.coords.latitude);
          console.log('Longitude:', position.coords.longitude);
          const origin = `${position.coords.latitude},${position.coords.longitude}`;
          this.$origin.set(origin);
        },
        error => {
          console.error('Error obteniendo geolocalización:', error);
          this.$origin.set('4.6097,-74.0817');
        }
      );
    });
  }

  locationsRs = resource<Location[], LocationParams>({
    params: () => ({ origin: this.$origin() }),
    loader: async ({ params }) => {
      const url = new URL(`${environment.apiUrl}/api/v1/locations`);

      if (params.origin) {
        url.searchParams.set('origin', params.origin);
      }
      const response = await fetch(url.toString());
      const data = await response.json();
      return data;
    },
  });
}
