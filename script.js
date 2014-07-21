function getRandomName() {
    var names = ["enzo", "zino", "darryl", "mariska", "bram", "mayron", "jayden", "willy", "marvin"];
    return names[Math.floor(Math.random() * names.length)];
}

$( document ).ready(function() {
    var nameInput = '.name_input input[type="text"]';
    var name = getRandomName();

    var storedColor = $.jStorage.get('color', 'darkblue');

    $('input[type=radio][value=' + storedColor + ']').attr('checked', 'checked');

    var checkedColor = 'input[name=color]:checked';
    var color = $(checkedColor, '#color').val();

    $("div.name").append('<p>' + name + '</p>');

	$('#color').find('input').change(function() {
        color = $(checkedColor, '#color').val();
        $.jStorage.set('color', color);
		$(nameInput).css("color", color);
	});

    $(nameInput).css("color", color).val('').prop('disabled', false).focus();

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