import { ICountry, NewCountry } from './country.model';

export const sampleWithRequiredData: ICountry = {
  id: 4746,
};

export const sampleWithPartialData: ICountry = {
  id: 86879,
  countryName: 'Automotive Pakistan Engineer',
};

export const sampleWithFullData: ICountry = {
  id: 63753,
  countryName: 'content 1080p',
};

export const sampleWithNewData: NewCountry = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
