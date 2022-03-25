import React from "react";

type LocaleProps = {
  current?: [string, string];
  default?: [string, string];
  switchLabel?: string;
  switchLink?: string;
}

export type ContextType = {
  config?: any; 
  documents?: any; 
  locale?: false | LocaleProps; 
  currentPageName?: string;
}

const MdocSiteContext = React.createContext<ContextType>({})

export default MdocSiteContext