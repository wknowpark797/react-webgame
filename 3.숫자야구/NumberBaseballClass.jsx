import React, { Component } from 'react';

function getNumbers() {}

class NumberBaseballClass extends Component {
	state = {
		result: '',
		value: '',
		answer: getNumbers(), // [1, 3, 5, 7]
		tries: ['사과', '수박', '바나나', '파인애플', '배'],
	};

	onSubmitForm = (e) => {
		e.preventDefault();
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
					{this.state.tries.map((item, idx) => {
						return <li key={idx}>{item}</li>;
					})}
				</ul>
			</>
		);
	}
}

export default NumberBaseballClass;
