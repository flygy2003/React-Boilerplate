import React, {Component} from "react"

class Toolbar extends Component {
  render() {
    return (
      <div>
        <div className="toolbar">
          <ReactLogo/>
          <div className='toolbar-links'>
            {[
              {
                name: "Settings",
                link: '/settings'
              }
            ].map((item, i) => {
              return <a href={item.link} to={item.link} className="toolbar-links-a">
                {item.name}</a>
           })}
          </div>
        </div>
      </div>
    );
  }
}

class ReactLogo extends Component {
  render() {
    return(
      <div className="viewBox1">
        <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 319.25 318.5">
          <title>keystock</title>
          <polygon class="cls-1" points="151.78 159.05 303.35 318 0.5 318 0.5 0.5 318 0.5 151.78 159.05"/>
          <line class="cls-2" x1="318" y1="0.5" x2="0.5" y2="303.35"/>
        </svg>
      </div>
    )
  }
}

export default Toolbar
