const path = require('path');
const webpack = require('webpack');

module.exports = {
	name: 'gugudan-setting',
	mode: 'development',
	devtool: 'eval',
	resolve: {
		extensions: ['.js', '.jsx'],
	},

	entry: {
		app: './client',
	},
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				loader: 'babel-loader',
				options: {
					presets: [
						// 각 presets에 대한 설정
						[
							'@babel/preset-env',
							{
								targets: {
									browsers: ['> 5% in KR', 'last 2 chrome versions'], // 지원하고자 하는 브라우저만 설정이 가능하다. (browserslist 옵션 사용)
								},
								debug: true,
							},
						],
						'@babel/preset-react',
					], // presets는 plugins의 모음
					plugins: [],
				},
			},
		],
	},
	plugins: [new webpack.LoaderOptionsPlugin({ debug: true })], // 웹팩에서 기본적으로 합쳐주는 기능 이외의 추가적인 확장 프로그램 사용
	output: {
		path: path.join(__dirname, 'dist'),
		filename: 'app.js',
	},
};
