import { defineStore } from "pinia";

export interface IState {
  navMain: ILink[];
  locale: string;
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

export const useSiteStore = defineStore("site", {
  state: (): IState => ({
    navMain: [] as ILink[],
    locale: "",
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
  },
});
