const path = require('path');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = {
	name: 'word-relay-setting',
	mode: 'development', // 실서비스: production
	devtool: 'eval', // production일 경우: hidden-source-map
	resolve: {
		extensions: ['.js', '.jsx'],
	},

	entry: {
		app: './client',
	}, // 입력
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				loader: 'babel-loader', // entry의 파일들에 babel-loader를 적용한다.
				options: {
					presets: [
						[
							'@babel/preset-env',
							{
								targets: {
									browsers: ['> 5% in KR', 'last 2 chrome versions'],
								},
								debug: true,
							},
						],
						'@babel/preset-react',
					],
					plugins: ['@babel/plugin-proposal-class-properties', 'react-refresh/babel'],
				},
			},
		],
	},
	plugins: [new ReactRefreshWebpackPlugin()],
	output: {
		// __dirname: 현재 폴더 경로에 dist 생성
		path: path.join(__dirname, 'dist'), // 실제 경로
		filename: 'app.js',
		publicPath: '/dist', // 가상 경로 (webpack dev server 사용)
	}, // 출력
	devServer: {
		devMiddleware: { publicPath: '/dist' },
		static: { directory: path.resolve(__dirname) },
		hot: true,
	},
};
