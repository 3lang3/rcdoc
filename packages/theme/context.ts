import React from "react";

const MdocSiteContext = React.createContext({
  // user config
  config: {},
  // all components documents data
  documents: {},
  // custom page nav data
  navs: []
})

export default MdocSiteContext