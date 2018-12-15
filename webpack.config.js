const path=require('path');
module.exports={
	entry:'./src/js/index.js',
	output:{
		path:path.resolve(__dirname,'build'),
		filename:'bundle.js',
	},
	module: {
		rules: [
			{
				test: /\.js$/, //to check js files
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
				},
			},
			{
				test: /\.scss$/,
				use:['style-loader','css-loader','sass-loader'],
			},
			{
				test: /\.css$/,
				use:['style-loader','css-loader'],
			}
		],
	}
}