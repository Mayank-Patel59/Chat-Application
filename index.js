

'use strict'


const Fs = require('fs')
const path = require('path')
const Axios = require('axios')

async function download() {
	const url = 'http://samples.openweathermap.org/data/2.5/weather?q=London,uk&appid=b6907d289e10d714a6e88b30761fae22'
	const mypath = path.resolve(__dirname,'files', 'code.html')

	const writer = Fs.createWriteStream(mypath)

	const response = await Axios({
		url,
		method : 'Get',		
		responseType: 'stream'
	})

	response.data.pipe(writer)

	return new Promise((resolve, reject) => {

		writer.on('Finish', resolve)
		writer.on('error', reject)		
	})
}

download()