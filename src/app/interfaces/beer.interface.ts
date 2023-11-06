export interface Beer {
  id: number;
  name: string;
  tagline: string;
  first_brewed: string;
  description: string;
  image_url: string;
  abv: number;
  ibu: number;
  ebc: number;
  ph: number;
  attenuation_level: number;
  volume: {
    value: number;
    unit: string;
  };
  ingredients: {
    malt: any[];
    hops: any[];
    yeast: string;
  };
}
