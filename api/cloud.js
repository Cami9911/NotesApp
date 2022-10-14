const https = require("https");
fs = require('fs')

fs.readFile('test.txt', 'utf8', function (err, data) {
	const req = https.request('https://content.dropboxapi.com/2/files/upload', {
		method: 'POST',
		headers: {
			'Authorization': `Bearer sl.BQCgmeipJicGLtgFpolOTWl_oVXNYFg-ZLMs9LzXHAmx_8fKbU_hJpqghCwdkEG7Chww5mn892VVYsNVIm4TkOZJFnIx_op1aOIc6kdsD3XoReiYnC03OFevUE75bj1nNExTus67Ygg`,
			'Dropbox-API-Arg': JSON.stringify({
				'path': '/notes.txt',
				'mode': 'add',
				'autorename': true, 
				'mute': false,
				'strict_conflict': false
			}),
	    	'Content-Type': 'application/octet-stream',
		}
	}, (res) => {
		console.log("statusCode: ", res.statusCode);
	    console.log("headers: ", res.headers);

	    res.on('data', function(d) {
	        process.stdout.write(d);
	    });
	});

	// req.write(JSON.stringify(data));
	req.end();
});