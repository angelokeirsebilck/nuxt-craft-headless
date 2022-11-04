import { defineStore } from "pinia";

export interface IState {
  navMain: ILink[];
  locale: string;
  siteId: number;
  localized: ILocalizd[];
  finalUri: string;
}

export interface IElement {
  uri: string;
  siteId: number;
}

export interface ILink {
  customText?: string;
  type: string;
  text: string;
  target?: string;
  element: IElement;
  test: string;
}

export interface ILocalizd {
  language: string;
  siteId: number;
  uri: string;
}

export const useSiteStore = defineStore("site", {
  state: (): IState => ({
    navMain: [] as ILink[],
    locale: "",
    localized: null as ILocalizd[],
    siteId: null,
    finalUri: "",
  }),
  actions: {
    addMainNavigation(navMain) {
      const navMainFormat = navMain.map((item) => {
        return item.itemLink as ILink;
      });
      this.navMain = [...navMainFormat];
    },
    addLocale(locale) {
      this.locale = locale;
    },
    addSiteId(siteId) {
      this.siteId = siteId;
    },
    addLocalized(localized) {
      this.localized = [...localized];
    },
    addFinalUri(finalUri) {
      this.finalUri = finalUri;
    },
  },
});
