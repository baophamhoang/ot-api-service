export interface ScrapingData {
  errors: Entities;
  // cuisine: Cuisine;
  entities: Entities;
  loadings: Entities;
  activeMerchantID: string;
  menuRefreshedInfoBarVisible: boolean;
}

// export interface Cuisine {}

export interface Entities {
  [key: string]: Restaurant;
}

export interface Restaurant {
  ID: string;
  ETA: number;
  menu: Menu;
  name: string;
  promo: Promo;
  latlng: Latlng;
  radius: number;
  rating: number;
  status: string;
  address: Address;
  cuisine: string;
  section: string;
  currency: Currency;
  features: Features;
  timeZone: string;
  deliverBy: string;
  photoHref: string;
  voteCount: number;
  isLeadsGen: boolean;
  description: string;
  phoneNumber: string;
  businessType: string;
  distanceInKm: number;
  isIntegrated: boolean;
  openingHours: Hours;
  sectionOpenHours: Hours;
  sofConfiguration: SofConfiguration;
  schedulerOrderConfig: SchedulerOrderConfig;
}

export interface Address {
  city: string;
  house: string;
  state: string;
  cityID: number;
  street: string;
  suburb: string;
  acronym: string;
  country: string;
  postcode: string;
  countryID: number;
  combinedCity: string;
  combinedAddress: string;
}

export interface Currency {
  code: Code;
  symbol: string;
  exponent: number;
  ISOSymbol: string;
}

export enum Code {
  Vnd = 'VND',
}

export enum Symbol {
  Empty = '₫',
}

export interface Features {
  enableSTO: boolean;
  enableServiceBasedMenu: boolean;
}

export interface Latlng {
  latitude: number;
  longitude: number;
}

export interface Menu {
  menuMeta: MenuMeta;
  campaigns: any[];
  categories: Category[];
}

export interface Category {
  ID: string;
  name: string;
  items: ScrapingDish[];
  available: boolean;
  sortOrder: number;
}

export interface ScrapingDish {
  ID: string;
  name: string;
  images: string[];
  imgHref: string;
  priceV2: FixFeeForDisplay;
  position: number;
  _currency: Currency;
  available: boolean;
  sortOrder: number;
  campaignID: string;
  description: string;
  campaignName: string;
  modifierGroups: ModifierGroup[];
  priceInMinorUnit: number;
  discountedPriceV2: FixFeeForDisplay;
  discountedPriceInMin: number;
}

export interface FixFeeForDisplay {
  amountDisplay: string;
  amountInMinor: number;
}

export interface ModifierGroup {
  ID: ID;
  name: Name;
  available: boolean;
  modifiers: Modifier[];
  selectionType: number;
  selectionRangeMax: number;
  selectionRangeMin: number;
}

export enum ID {
  Vnmog20230216073028024673 = 'VNMOG20230216073028024673',
  Vnmog20230216073028063247 = 'VNMOG20230216073028063247',
  Vnmog20230216073028082865 = 'VNMOG20230216073028082865',
}

export interface Modifier {
  ID: string;
  name: string;
  priceV2: FixFeeForDisplay;
  _currency: Currency;
  available: boolean;
  sortOrder: number;
  priceInMinorUnit: number;
}

export enum Name {
  MónThêm = 'Món Thêm',
}

export interface MenuMeta {
  orderValueLimit: number;
  noLocationOrderValueLimit: number;
}

export interface Hours {
  fri: string;
  mon: string;
  sat: string;
  sun: string;
  thu: string;
  tue: string;
  wed: string;
  open: boolean;
  tempClosed?: boolean;
  displayedHours: string;
}

export interface Promo {
  hasPromo: boolean;
  description: string;
}

export interface SchedulerOrderConfig {
  scheduleTimeSpan: number;
  preSelectedStartTime: PreSelectedStartTime;
  scheduleIntervalTime: number;
  minAdvancePeriodInMin: number;
}

export interface PreSelectedStartTime {
  seconds: number;
}

export interface SofConfiguration {
  fixFeeInMin: number;
  thresholdInMin: number;
  calculationMode: string;
  fixFeeForDisplay: FixFeeForDisplay;
  thresholdForDisplay: FixFeeForDisplay;
}
