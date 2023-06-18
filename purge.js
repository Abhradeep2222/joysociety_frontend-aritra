const exec = require('child_process').exec;
const fs = require('fs');
const path = require('path');

// find the styles css file
const files = [...getFilesFromPath('./dist/joy-society-crm/', '.css'), ...getFilesFromPath('./dist/joy-society-crm/', '.js'), ...getFilesFromPath('./dist/joy-society-crm/', '.html')];
const data = [];

if (!files && files.length <= 0) {
    console.log("cannot find style files to purge");
    return;
}

for (const f of files) {
    // get original file size
    const originalSize = getFilesizeInKiloBytes('./dist/joy-society-crm/' + f) + "kb";
    var o = { "file": f, "originalSize": originalSize, "newSize": "" };
    data.push(o);
}

console.log("Run PurgeCSS...");

exec("purgecss -css dist/joy-society-crm/*.css --content dist/joy-society-crm/index.html dist/joy-society-crm/*.js -o dist/joy-society-crm/", function (error, stdout, stderr) {
    console.log("PurgeCSS done");
    for (const d of data) {
        // get new file size
        const newSize = getFilesizeInKiloBytes('./dist/joy-society-crm/' + d.file) + "kb";
        d.newSize = newSize;
    }

    console.table(data);
});

function getFilesizeInKiloBytes(filename) {
    var stats = fs.statSync(filename);
    var fileSizeInBytes = stats.size / 1024;
    return fileSizeInBytes.toFixed(2);
}

function getFilesFromPath(dir, extension) {
    let files = fs.readdirSync(dir);
    return files.filter(e => path.extname(e).toLowerCase() === extension);
}