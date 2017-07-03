const fs = require('fs');
const postcss = require('postcss');
const cssnext = require('postcss-cssnext');
const autoprefixer = require('autoprefixer');

fs.readFile('src/app.css', (err,css) =>{
    postcss([cssnext,autoprefixer])
        .process(css,{from: 'src/app.css' , to:'dist/app.css' })
        .then(result =>{
            fs.writeFile('dist/app.css',result.css);
            if(result.map) fs.writeFile('dist/app.css.map',result.map)
        });
})
