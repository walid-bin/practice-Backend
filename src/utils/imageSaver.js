const fileS = require('fs');

const path = require('path');

const imageSaver = async (taget, initpath) => {
    try {
        const root = path.resolve() + '/images'
        if (!fs.existsSync(root)) fs.mkdir(root, err => { if (err) throw new Error('failed') });
    } catch (error) {
        console.log(error);
    }
};

imageSaver();