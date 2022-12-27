function lsImageTemplate(id, prompt) {
    return {
        id: id,
        prompt: prompt,
        images: [] // { url: Path Image }
    };
}


export function jsonToLSImage(json, prompt) {
    var lsImage = lsImageTemplate(json.created, prompt);

    json.data.forEach(element => {
        lsImage.images.push({ url: element.url });
    });

    return lsImage;
}


export function getLSImages() {
    return JSON.parse(localStorage.getItem('lsImages'));
}


export function addLSImage(lsImage) {
    if (localStorage.getItem('lsImages') === null) {
        localStorage.setItem('lsImages', JSON.stringify(new Array(lsImage)));
    } else {
        var listOfImages = getLSImages();

        listOfImages.push(lsImage);

        localStorage.setItem('lsImages', JSON.stringify(listOfImages));
    }
}


export function deleteLSImage(id) {
    var listOfImages = getLSImages();

    if (listOfImages.length < 2) {
        localStorage.clear();

        $('#results').hide();
    } else {
        var index = -1;

        listOfImages.find(function (lsImage, i) {
            if (lsImage.id == id) {
                index = i;
                return null;
            }
        });

        listOfImages.splice(index, 1);

        localStorage.setItem('lsImages', JSON.stringify(listOfImages));
    }
}