const fs = require('fs');
const path = require('path');

function updatePopupHtml() {
    // Find the latest CSS and JS files
    const buildDir = path.join(__dirname, '../extension/build/static');
    const cssDir = path.join(buildDir, 'css');
    const jsDir = path.join(buildDir, 'js');

    const cssFile = fs.readdirSync(cssDir).find(f => f.startsWith('main.') && f.endsWith('.css'));
    const jsFile = fs.readdirSync(jsDir).find(f => f.startsWith('main.') && f.endsWith('.js'));

    // Read popup.html template
    const popupPath = path.join(__dirname, '../extension/popup.html');
    let popupContent = fs.readFileSync(popupPath, 'utf8');

    // Update the file references
    popupContent = popupContent.replace(
        /build\/static\/css\/main\.[a-f0-9]+\.css/,
        `build/static/css/${cssFile}`
    );
    popupContent = popupContent.replace(
        /build\/static\/js\/main\.[a-f0-9]+\.js/,
        `build/static/js/${jsFile}`
    );

    // Write back to popup.html
    fs.writeFileSync(popupPath, popupContent);
    console.log('Updated popup.html with new build files');
}

updatePopupHtml();