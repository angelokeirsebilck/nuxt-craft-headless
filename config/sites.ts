export interface IConfigSites {
  handle: string;
  siteId: number;
  language: string;
  urlParameter?: string;
  urlParameterTrailingSlash?: string;
  primary: boolean;
}

export const configSites: IConfigSites[] = [
  {
    handle: "default",
    siteId: 1,
    language: "en",
    urlParameter: "",
    urlParameterTrailingSlash: "",
    primary: true,
  },
  {
    handle: "nl",
    siteId: 2,
    language: "nl",
    urlParameter: "nl",
    urlParameterTrailingSlash: "nl/",
    primary: false,
  },
];
