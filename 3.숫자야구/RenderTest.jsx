import React, { Component } from 'react';

class RenderTest extends Component {
	state = {
		counter: 0,
	};

	// shouldComponentUpdate -> PureComponent 사용 가능
	shouldComponentUpdate(nextProps, nextState, nextContext) {
		if (this.state.counter !== nextState.counter) {
			return true;
		}
		return false;
	}

	onClick = () => {
		this.setState({});
	};

	render() {
		console.log('렌더링 ', this.state);

		return (
			<div>
				<button onClick={this.onClick}>클릭</button>
			</div>
		);
	}
}

export default RenderTest;
