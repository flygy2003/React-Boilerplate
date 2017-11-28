import React from "react"
import Toolbar from "./Toolbar.jsx"
import Lights from "./Lights.jsx"


export default class Layout extends React.Component {
  render() {
    return (
      <div>
        <body>
          <Toolbar/>
          <Lights/>
        </body>
      </div>
    );
  }
}
