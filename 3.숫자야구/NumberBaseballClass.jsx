import React, { Component } from 'react';
import TryClass from './TryClass';

function getNumbers() {}

class NumberBaseballClass extends Component {
	state = {
		result: '',
		value: '',
		answer: getNumbers(), // [1, 3, 5, 7]
		tries: [
			{ fruit: '사과', taste: '달다' },
			{ fruit: '수박', taste: '맛있다' },
			{ fruit: '바나나', taste: '달다' },
			{ fruit: '파인애플', taste: '달다' },
			{ fruit: '배', taste: '달다' },
		],
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
					{this.state.tries.map((item) => {
						return <TryClass key={item.fruit + item.taste} item={item} />;
					})}
				</ul>
			</>
		);
	}
}

export default NumberBaseballClass;
