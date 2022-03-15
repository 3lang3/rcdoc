import React from "react";

export type ContextType = {
  config?: any; documents?: any; locale?: string; /**
* all parsed api data
*/
  apis?: Record<string, any>
}

const MdocSiteContext = React.createContext<ContextType>({})

export default MdocSiteContext