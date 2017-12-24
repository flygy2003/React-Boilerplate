import React, { Component } from 'react'
import Card, {Room} from "./Card.jsx"

class Settings extends Component {
  render() {
    return(
      <div>
        <Card>
          <Room>Settings Pane</Room>
        </Card>
      </div>
    )
  }
}

export default Settings