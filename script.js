function getRandomName() {
    var names = ["enzo", "zino", "darryl", "mariska", "bram", "mayron", "jayden", "willy", "marvin"];
    var name = names[Math.floor(Math.random() * names.length)];
    var prevName = $.jStorage.get('prevName', '');
    while (name == prevName) {
        name = getRandomName();
    }
    $.jStorage.set('prevName', name);
    return name;
}

$( document ).ready(function() {
    var name = getRandomName();

    var colorPicked = $('input[name=color]:checked', '#color').val();
    var nameInput = '.name_input input[type="text"]';

    $("div.name").append('<p>' + name + '</p>');
    $(nameInput).css('color', colorPicked).val('').prop('disabled', false).focus();

    $('input[type=radio][value=' + $.jStorage.get('color', 'darkblue') + ']').
        attr('checked', 'checked');

	$('#color').find('input').change(function() {
        colorPicked = $('input[name=color]:checked', '#color').val();
        $.jStorage.set('color', colorPicked);
        $(nameInput).css('color', colorPicked);
    });

    var audioElement = document.createElement('audio');
    var prevGuess = "";
	$('.name_input').on('input', function(){
		var sound;
        var backgroundColor;
        var givenName = $(nameInput).val();
        var nameCheck = name.substring(0, givenName.length);

		if (givenName == name){
            backgroundColor = 'lightgreen';
            sound = 'smw_1-up.wav';
            $(nameInput).prop('disabled', true);
            setTimeout(function() {
				location.reload()
			}, 2000);
		} else if (givenName == nameCheck && nameCheck != name && givenName.length >= prevGuess.length) {
            backgroundColor = 'lightgreen';
			sound = 'smw_coin.wav';
		} else if (givenName.length == 0 || givenName.length < prevGuess.length) {
			sound = "";
			backgroundColor = 'Moccasin';
		} else {
			var correction = givenName.substring(0, givenName.length-1);
            $(nameInput).val(correction);
            sound = 'smw_jump.wav';
			backgroundColor = 'tomato';
		}
        prevGuess = givenName;
        audioElement.setAttribute('src', 'snd/'+sound);
		audioElement.play();
        $(nameInput).css("background-color", backgroundColor);
    });
});