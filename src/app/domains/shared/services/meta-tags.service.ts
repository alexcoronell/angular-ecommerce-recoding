import { inject, Injectable } from '@angular/core';
import { Meta, MetaDefinition, Title } from '@angular/platform-browser';

export interface PageMetaData {
  title: string;
  description: string;
  image: string;
  url: string;
  type: string;
}

const defaultMetaData: PageMetaData = {
  title: '',
  description: '',
  image: '',
  url: '',
  type: '',
};

@Injectable({
  providedIn: 'root',
})
export class MetaTagsService {
  titleService = inject(Title);
  metaService = inject(Meta);

  updateMetaTags(metaData: Partial<PageMetaData>) {
    const metaDataToUpdate = {
      ...defaultMetaData,
      ...metaData,
    };

    const tags = this.generateMetaDefinitions(metaDataToUpdate);

    tags.forEach(tag => this.metaService.updateTag(tag));
    this.titleService.setTitle(metaData.title || defaultMetaData.title);
    this.metaService.updateTag({
      name: 'description',
      content: metaData.description || defaultMetaData.description,
    });
  }

  private generateMetaDefinitions(metaData: PageMetaData): MetaDefinition[] {
    return [
      {
        property: 'description',
        content: metaData.description,
      },
      {
        property: 'og:title',
        content: metaData.title,
      },
      {
        property: 'og:description',
        content: metaData.description,
      },
      {
        property: 'og:image',
        content: metaData.image,
      },
      {
        property: 'og:url',
        content: metaData.url,
      },
      {
        property: 'og:type',
        content: metaData.type,
      },
    ];
  }
}
