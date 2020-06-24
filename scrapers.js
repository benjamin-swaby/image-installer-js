


// generate a url with the search term
function url(searchTerm) {
	let base1 = "https://www.google.com/search?q=";
	let base2 = "&safe=strict&source=lnms&tbm=isch&sa=X&ved=2ahUKEwishr3P6JrqAhVwTxUIHRsjAPwQ_AUoAXoECBAQAw&biw=952&bih=942";
	let final = base1 + searchTerm + base2;
	return final;
}

// generates xpaths for the images on google images
function generate(amount) {
	let xstrings = [];
	for(let i = 0; i < amount; i++){
		let xstring = '//*[@id="islrg"]/div[1]/div['+i+']/a[1]/div[1]/img';
		xstrings[i] = xstring;
	}
	return xstrings;
}	


//main funtion that gets the images from the url using the xpaths generated
async function scrapeProduct(url,xstrings) {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	await page.goto(url);
	let srcs = [];

	for(let i = 0; i < xstrings.length; i++){

		const [el] = await page.$x(xstrings[i]);

		try {
			const src = await el.getProperty('src');
			const srcTxt = await src.jsonValue();
			console.log(srcTxt);
			srcs[i] = srcTxt;


		}catch (err){
			;
		}
		

		
	}

	await browser.close();
	return srcs;
}

	


function main(){
	const puppeteer = require('puppeteer');
	var amount = 21;
	var search = "car";
	// stops if feild is bad

	url_s = url(search);
	xstrings = generate(amount);

	scrapeProduct(url_s, xstrings);
}




