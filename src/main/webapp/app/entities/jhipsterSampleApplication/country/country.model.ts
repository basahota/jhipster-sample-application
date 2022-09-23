import { IRegion } from 'app/entities/jhipsterSampleApplication/region/region.model';

export interface ICountry {
  id: number;
  countryName?: string | null;
  region?: Pick<IRegion, 'id'> | null;
}

export type NewCountry = Omit<ICountry, 'id'> & { id: null };
