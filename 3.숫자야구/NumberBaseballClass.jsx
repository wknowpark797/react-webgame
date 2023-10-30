import React, { Component } from 'react';
import TryClass from './TryClass';

/*
	getNumbers 함수: 컴포넌트 밖에서 정의
	- this를 사용하지 않을 때 가능
	- 해당 함수를 다른 곳에서도 사용할 수 있다.
*/
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
		const { value, answer, tries } = this.state;
		e.preventDefault();

		if (value === answer.join('')) {
			// 정답
			this.setState((prevState) => {
				return {
					result: '홈런~!',
					tries: [...prevState.tries, { try: value, result: '홈런~!' }],
				};
			});
			alert('게임을 다시 시작합니다.');
			this.setState({
				value: '',
				answer: getNumbers(),
				tries: [],
			});
		} else {
			// 오답
			const answerArray = value.split('').map((val) => parseInt(val)); // 배열 변환
			let strike = 0;
			let ball = 0;

			if (tries.length >= 9) {
				// 10번 이상 오답일 때
				this.setState({
					result: `10번 이상 틀려서 실패! 정답은 ${answer.join(',')} 였습니다!`,
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
					if (answerArray[i] === answer[i]) {
						strike++;
					} else if (answer.includes(answerArray[i])) {
						ball++;
					}
				}
				this.setState((prevState) => {
					return {
						value: '',
						tries: [...prevState.tries, { try: value, result: `${strike} 스트라이크, ${ball} 볼 입니다.` }],
					};
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
		const { result, value, tries } = this.state;

		return (
			<>
				<h1>{result}</h1>
				<form onSubmit={this.onSubmitForm}>
					<input maxLength={4} value={value} onChange={this.onChangeInput} />
				</form>

				<div>{tries.length}번 시도하셨습니다.</div>

				<ul>
					{tries.map((val, idx) => {
						return <TryClass key={`${idx + 1}차 시도:`} tryInfo={val} index={idx} />;
					})}
				</ul>
			</>
		);
	}
}

export default NumberBaseballClass;
