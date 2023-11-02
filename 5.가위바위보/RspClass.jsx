import React, { Component } from 'react';

const rspCoords = {
	바위: '0',
	가위: '-142px',
	보: '-284px',
};

const scores = {
	바위: 0,
	가위: 1,
	보: -1,
};

class RspClass extends Component {
	state = {
		result: '',
		imgCoord: '0', // 좌표
		score: 0,
	};

	interval;

	// 컴포넌트 첫 렌더링 후
	componentDidMount() {
		this.interval = setInterval(() => {
			const { imgCoord } = this.state; // 클로저 에러 주의

			if (imgCoord === rspCoords.바위) {
				this.setState({
					imgCoord: rspCoords.가위,
				});
			} else if (imgCoord === rspCoords.가위) {
				this.setState({
					imgCoord: rspCoords.보,
				});
			} else if (imgCoord === rspCoords.보) {
				this.setState({
					imgCoord: rspCoords.바위,
				});
			}
		}, 1000);
	}

	// 리렌더링 후
	componentDidUpdate() {}

	// 컴포넌트 제거되기 직전
	componentWillUnmount() {
		clearInterval(this.interval);
	}

	onClickBtn = () => {};

	render() {
		const { result, imgCoord, score } = this.state;

		return (
			<>
				<div
					id='computer'
					style={{ background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0` }}
				></div>

				<div>
					<button id='rock' className='btn' onClick={() => this.onClickBtn('바위')}>
						바위
					</button>
					<button id='scissor' className='btn' onClick={() => this.onClickBtn('가위')}>
						가위
					</button>
					<button id='paper' className='btn' onClick={() => this.onClickBtn('보')}>
						보
					</button>
				</div>
				<div>{result}</div>
				<div>현재 {score}점</div>
			</>
		);
	}
}

export default RspClass;
