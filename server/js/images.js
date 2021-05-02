

const coolImages = require("cool-images");

let generate = () => {
// 'https://unsplash.it/300/500?image=125'
    coolImages.many(600, 800);
}



module.exports ={
    generate : generate
}