const fs = require('fs');

const excluded_dirs = ['node_modules', '.idea'];

const content = {
    files: [],
    dirs: []
};

const options = {
    withFileTypes: true
};

function getPathFromArgs() {
    let dirPath = process.argv[2];
    if (process.argv.length <= 2) {
        console.log("To run script enter into the console: 'node " + __filename.slice(__dirname.length + 1) + " path/to/directory'");
        process.exit(-1);
    }

    return dirPath;
}

function getFileTree(path) {
    buildfileTree(path).then(res => console.log(res));
}

function buildfileTree(path) {
    return new Promise(async (resolve, reject) => {
        try {
            let items = await getDirContent(path);
            for (let item of items) {
                const filePath = `${path}/${item.name}`;
                if (item.isFile()) {
                    content.files.push(filePath);
                } else if (item.isDirectory()) {
                    if (excluded_dirs.includes(item.name)) continue;
                    await buildfileTree(filePath);
                    content.dirs.push(filePath);
                }
            }
            resolve(content)
        } catch (error) {
            reject(error)
        }
    });
}

async function getDirContent(path) {
    return new Promise((resolve, reject) => {
        fs.readdir(path, options, (error, items) => {
            if (!items) {
                console.log('No items. Please, check the path.');
                return;
            }

            if (error !== null) {
                reject(error);
                return
            }

            resolve(items);
        })
    })

}

getFileTree(getPathFromArgs());




