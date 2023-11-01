import React, { Component } from 'react';

class ResponseCheckClass extends Component {
	state = {
		state: 'waiting', // 배경색 상태 - waiting, ready, now
		message: '클릭해서 시작하세요.',
		result: [],
	};

	onClickScreen = () => {};

	renderAverage = () => {
		const { result } = this.state;

		// jsx에서 태그없음 = false, undefined, null
		return result.length === 0 ? null : (
			<div>
				평균 시간:
				{result.reduce((a, c) => a + c) / result.length}ms
			</div>
		);
	};

	render() {
		const { state, message } = this.state;

		return (
			<>
				<div id='screen' className={state} onClick={this.onClickScreen}>
					{message}
				</div>
				{this.renderAverage()}
			</>
		);
	}
}

export default ResponseCheckClass;
