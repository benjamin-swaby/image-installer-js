# images-installer-js


## installing dependancies

### arch based
` sudo pacman -Syu nodejs npm && npm install puppeteer && npm install image-downloader`
### debian based
` sudo apt install nodejs npm && npm install puppeteer && npm install image-downloader`
### other:
`i dont know tbh consult above and adapt`

## install
`git clone https://github.com/benjamin-swaby/image-installer-js.git`
`cd image-installer-js && bash reset.bash`


## usage
1. `cd image-installer-js`
2. `node main.js [search term] [amount]`


## info
all of the images will be installed from duckduckgo images to the folder `./images` which 
will need to be reset with the included bash script if you are finished with your images and 
intend to use a smaller amount

## tasks
- [ ] add suppourt for more than 100 images at once
- [ ] comment code (i am sorry)


