const puppeteer = require('puppeteer');
const download = require('image-downloader');
let errors = 0;

// generate a url with the search term
function url(searchTerm) {
	//https://duckduckgo.com/?q=car&t=hf&iax=images&ia=images
	let base1 = "https://duckduckgo.com/?q=";
	let base2 = "&t=hf&iax=images&ia=images";
	let final = base1 + searchTerm + base2;
	return final;
}

// generates xpaths for the images on google images
function generate(amount) {
	let xstrings = [];


	for(let i = 0; i < amount; i++){
		let xstring = '//*[@id="zci-images"]/div/div[2]/div/div['+i+']/div[1]/span/img';
		xstrings[i] = xstring;
		
	}
	return xstrings;
}	

function install_image(src, i){
	
	
	options = {
	url: src,
	dest: 'images/' + i +'.jpg'      
	}
 
	download.image(options)
	.then(({ filename }) => {
		console.log('Saved to', filename)  
	})
	.catch((err) => console.error(err))
}

//main funtion that gets the images from the url using the xpaths generated
async function scrapeProduct(url,xstrings) {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	await page.goto(url);
	let srcs = [];
	console.log(xstrings.length);
	for(let i = 0; i < xstrings.length; i++){
		const [el] = await page.$x(xstrings[i]);

		try {
			const src = await el.getProperty('src');
			const srcTxt = await src.jsonValue();
			//console.log(srcTxt);
			srcs[i] = srcTxt;
			install_image(srcTxt,i);
			
		}catch (err){
			;
			//errors++;
		}

	}
	console.log({errors});
	await browser.close();
	return srcs;
}



function main(){
	var amount = process.argv[3];
	var search = process.argv[2];

	url_s = url(search);
	xstrings = generate(amount);

	scrapeProduct(url_s, xstrings);
}



main();

//*[@id="zci-images"]/div/div[2]/div/div[1]/div[1]/span/img
//*[@id="zci-images"]/div/div[2]/div/div[2]/div[1]/span/img

//*[@id="zci-images"]/div/div[2]/div/div[156]/div[1]/span/img
//*[@id="zci-images"]/div/div[2]/div/div[285]/div[1]/span/img