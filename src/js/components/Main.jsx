import React, { Component } from 'react'

class Main extends Component {
	render() {
		return(
			<div>
				<Title/>
			</div>
		)
	}
}
class Title extends Component {
	arrowClick() {
		
	}
	render() {
		return(
			<div>
				<div className='title'>
					<div className='title-text'>Welcome to the Amazing world of</div>
					<div className='title-text'>Neekon Saadat</div>
				</div>
				<img src='../../static/arrow.png' className='downArrow' onClick={this.arrowClick.bind(this)}/>
			</div>
		)
	}
}
class Me extends Component {
	render() {
		return(
			<div>	
				<div className='me-wrapper'>

				</div>
			</div>
		)
	}
}
export default Main