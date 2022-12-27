import { jsonToLSImage, getLSImages, addLSImage, deleteLSImage } from './local_storage.js';


$(document).ready(function () {
    loadLSImages();

    $('#txtPrompt').focus();

    $('#frmTextToImg').submit(function (event) {
        $(':focus').blur();
        jQuery('<div>', { id: 'loading' }).appendTo('body');

        fetch('https://api.openai.com/v1/images/generations', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer YOUR_API_KEY' // https://beta.openai.com/account/api-keys
            },
            body: JSON.stringify({
                'prompt': $('#txtPrompt').val(),
                'n': parseInt($('input[name="noImages"]:checked').val()),
                'size': $('input[name="resImg"]:checked').val()
            })
        })
            .then(response => response.json())
            .then(showImages)
            .catch(showError)
            .finally(() => { $('#loading').remove(); });

        event.preventDefault();
    });

    $('.back-to-top').click(function () {
        $(window).scrollTop(0);
    });
});


function loadLSImages() {
    var lsImages = getLSImages();

    if (lsImages != null) {
        lsImages.forEach(lsImage => {
            addImage(lsImage);
        });
    }
}


function showImages(json) {
    var lsImage = jsonToLSImage(json, $('#txtPrompt').val());

    addImage(lsImage);
    addLSImage(lsImage);

    $(window).scrollTop($('#' + lsImage.id).offset().top);
}


function addImage(lsImage) {
    var elementToHTML =
        '<div class="row" id="' + lsImage.id + '">' +
        '   <div class="col">' +
        '       <div class="alert alert-dark alert-dismissible text-break">' +
        '           <strong>Prompt</strong>: ' + lsImage.prompt +
        '           <button class="close" type="button" id="remove-' + lsImage.id + '" title="Remove this creation"><span>&times;</span></button>' +
        '       </div>' +
        '   </div>' +
        '</div>' +
        '<div class="row" id="' + lsImage.id + '">';

    lsImage.images.forEach(image => {
        elementToHTML +=
            '<div class="col">' +
            '   <a href="' + image.url + '" target="_blank" title="View Full-Size">' +
            '       <img src="' + image.url + '" class="border border-5 border-light rounded-circle">' +
            '   </a>' +
            '</div>';
    });

    elementToHTML += '</div>';

    if ($('#results').is(':visible')) { elementToHTML += '<div class="separator" id="' + lsImage.id + '"><hr class="my-1"></div>'; } else { $('#results').show(); }

    $('#results').prepend(elementToHTML);

    $('[id*=remove-]').unbind().click(function () {
        var id = this.id.split("-")[1];

        $('div').remove('#' + id);
        deleteLSImage(id);
    });
}


function showError(err) {
    console.log('An error has occurred: ' + err);
    alert('An error has occurred.');
}


$(window).scroll(function () {
    if ($(window).scrollTop() > $('.title').offset().top) {
        $('.back-to-top').show();
    } else {
        $('.back-to-top').hide();
    }
});