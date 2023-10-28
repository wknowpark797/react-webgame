import React, { Component } from 'react';
import TryClass from './TryClass';

function getNumbers() {
	const candidate = [1, 2, 3, 4, 5, 6, 7, 8, 9]; // 서로 다른 숫자 4개 랜덤 뽑기
	const array = [];

	for (let i = 0; i < 4; i++) {
		const chosen = candidate.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
		array.push(chosen);
	}

	return array;
}

class NumberBaseballClass extends Component {
	state = {
		result: '',
		value: '',
		answer: getNumbers(), // [1, 3, 5, 7]
		tries: [],
	};

	onSubmitForm = (e) => {
		e.preventDefault();

		if (this.state.value === this.state.answer.join('')) {
			// 정답
			this.setState({
				result: '홈런~!',
				tries: [...this.state.tries, { try: this.state.value, result: '홈런~!' }],
			});
			alert('게임을 다시 시작합니다.');
			this.setState({
				value: '',
				answer: getNumbers(),
				tries: [],
			});
		} else {
			// 오답
			const answerArray = this.state.value.split('').map((val) => parseInt(val)); // 배열 변환
			let strike = 0;
			let ball = 0;

			if (this.state.tries.length >= 9) {
				// 10번 이상 오답일 때
				this.setState({
					result: `10번 이상 틀려서 실패! 정답은 ${this.state.answer.join(',')} 였습니다!`,
				});
				alert('게임을 다시 시작합니다.');
				this.setState({
					value: '',
					answer: getNumbers(),
					tries: [],
				});
			} else {
				// 스트라이크, 볼 처리 로직
				for (let i = 0; i < 4; i++) {
					if (answerArray[i] === this.state.answer[i]) {
						strike++;
					} else if (this.state.answer.includes(answerArray[i])) {
						ball++;
					}
				}
				this.setState({
					value: '',
					tries: [...this.state.tries, { try: this.state.value, result: `${strike} 스트라이크, ${ball} 볼 입니다.` }],
				});
			}
		}
	};

	onChangeInput = (e) => {
		this.setState({
			value: e.target.value,
		});
	};

	render() {
		return (
			<>
				<h1>{this.state.result}</h1>
				<form onSubmit={this.onSubmitForm}>
					<input maxLength={4} value={this.state.value} onChange={this.onChangeInput} />
				</form>

				<div>{this.state.tries.length}번 시도하셨습니다.</div>

				<ul>
					{this.state.tries.map((val, idx) => {
						return <TryClass key={`${idx + 1}차 시도:`} tryInfo={val} index={idx} />;
					})}
				</ul>
			</>
		);
	}
}

export default NumberBaseballClass;
