import React, { Component } from 'react';

class ResponseCheckClass extends Component {
	state = {
		state: 'waiting', // 배경색 상태 - waiting(파란색), ready(빨간색), now(초록색)
		message: '클릭해서 시작하세요.',
		result: [],
	};

	// 값이 변경되어도 리렌더링 되지 않는 변수
	timeout;
	startTime;
	endTime;

	onClickScreen = () => {
		const { state, message, result } = this.state;

		if (state === 'waiting') {
			this.setState({
				state: 'ready',
				message: '초록색이 되면 클릭하세요.',
			});
			this.timeout = setTimeout(() => {
				this.setState({
					state: 'now',
					message: '지금! 클릭!',
				});
				this.startTime = new Date();
			}, Math.floor(Math.random() * 1000) + 2000); // 2초 ~ 3초 랜덤
		} else if (state === 'ready') {
			// 성급하게 클릭
			clearTimeout(this.timeout);
			this.setState({
				state: 'waiting',
				message: '너무 성급합니다. 초록색이 된 후에 클릭하세요.',
			});
		} else if (state === 'now') {
			// 반응속도 체크
			this.endTime = new Date();
			this.setState((prevState) => {
				return {
					state: 'waiting',
					message: '클릭해서 시작하세요.',
					result: [...prevState.result, this.endTime - this.startTime],
				};
			});
		}
	};

	onReset = () => {
		this.setState({
			result: [],
		});
	};

	renderAverage = () => {
		const { result } = this.state;

		// jsx에서 태그없음 = false, undefined, null
		return result.length === 0 ? null : (
			<>
				<div>
					평균 시간:
					{result.reduce((a, c) => a + c) / result.length}ms
				</div>
				<button onClick={this.onReset}>리셋</button>
			</>
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
