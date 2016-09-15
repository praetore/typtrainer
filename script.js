function getRandomName() {
    var names = ["enzo", "zino", "darryl", "mariska", "bram", "liam",
        "emma",
        "noah",
        "olivia",
        "ethan",
        "sophia",
        "mason",
        "ava",
        "logan",
        "isabella",
        "lucas",
        "mia",
        "jacob",
        "charlotte",
        "aiden",
        "emily",
        "jackson",
        "abigail",
        "jack",
        "harper",
        "elijah",
        "avery",
        "benjamin",
        "madison",
        "james",
        "ella",
        "luke",
        "amelia",
        "william",
        "lily",
        "michael",
        "chloe",
        "alexander",
        "sofia",
        "oliver",
        "evelyn",
        "gabriel",
        "hannah",
        "daniel",
        "aria",
        "carter",
        "zoey",
        "owen",
        "addison",
        "henry",
        "grace",
        "matthew",
        "aubrey",
        "ryan",
        "ellie",
        "wyatt",
        "zoe",
        "jayden",
        "audrey",
        "nathan",
        "natalie",
        "caleb",
        "elizabeth",
        "andrew",
        "scarlett",
        "dylan",
        "layla",
        "isaac",
        "victoria",
        "joshua",
        "brooklyn",
        "sebastian",
        "lucy",
        "connor",
        "lillian",
        "david",
        "claire",
        "hunter",
        "anna",
        "eli",
        "mila",
        "landon",
        "nora",
        "samuel",
        "leah",
        "mayron", "jayden", "willy", "marvin"];
    var name = names[Math.floor(Math.random() * names.length)];
    var prevName = $.jStorage.get('prevName', '');
    while (name == prevName) {
        name = names[Math.floor(Math.random() * names.length)];
    }
    $.jStorage.set('prevName', name);
    return name;
}

$(document).ready(function () {
    var name = getRandomName();

    $('input[type=radio][value=' + $.jStorage.get('color', 'darkblue') + ']').attr('checked', 'checked');

    var colorPicked = $('input[name=color]:checked', '#color').val();
    var nameInput = '.name_input input[type="text"]';

    $("div.name").append('<p>' + name + '</p>');
    $(nameInput).css('color', colorPicked).val('').prop('disabled', false).focus();


    $('#color').find('input').change(function () {
        colorPicked = $('input[name=color]:checked', '#color').val();
        $.jStorage.set('color', colorPicked);
        $(nameInput).css('color', colorPicked);
    });

    var audioElement = document.createElement('audio');
    var prevGuess = "";
    $('.name_input').on('input', function () {
        var sound;
        var backgroundColor;
        var givenName = $(nameInput).val();
        var nameCheck = name.substring(0, givenName.length);

        if (givenName == name) {
            backgroundColor = 'lightgreen';
            sound = 'smw_1-up.wav';
            $(nameInput).prop('disabled', true);
            setTimeout(function () {
                location.reload()
            }, 2000);
        } else if (givenName == nameCheck && nameCheck != name && givenName.length >= prevGuess.length) {
            backgroundColor = 'lightgreen';
            sound = 'smw_coin.wav';
        } else if (givenName.length == 0 || givenName.length < prevGuess.length) {
            sound = "";
            backgroundColor = 'Moccasin';
        } else {
            var correction = givenName.substring(0, givenName.length - 1);
            $(nameInput).val(correction);
            sound = 'smw_jump.wav';
            backgroundColor = 'tomato';
        }
        prevGuess = givenName;
        audioElement.setAttribute('src', 'snd/' + sound);
        audioElement.play();
        $(nameInput).css("background-color", backgroundColor);
    });
});
