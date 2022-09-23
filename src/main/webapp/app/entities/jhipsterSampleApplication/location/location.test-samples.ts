import { ILocation, NewLocation } from './location.model';

export const sampleWithRequiredData: ILocation = {
  id: 91847,
};

export const sampleWithPartialData: ILocation = {
  id: 93501,
  postalCode: 'payment',
  city: 'South Genovevaborough',
};

export const sampleWithFullData: ILocation = {
  id: 69553,
  streetAddress: '1080p',
  postalCode: 'hard Slovakia Directives',
  city: 'Shoreline',
  stateProvince: 'Practical solution',
};

export const sampleWithNewData: NewLocation = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
