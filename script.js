function getRandomName() {
    var names = ["enzo", "zino", "darryl", "mariska", "bram", "mayron", "jayden", "willy", "marvin"];
    return names[Math.floor(Math.random() * names.length)];
}

$( document ).ready(function() {
    var name_input = '.name_input input[type="text"]';
    var checked_color = 'input[name=color]:checked';
    var color = $(checked_color, '#color').val();
    var name = getRandomName();

    $("div.name").append('<p>' + name + '</p>');

	$('#color').find('input').change(function() {
        color = $(checked_color, '#color').val();
		$(name_input).css("color", color);
	});

    $(name_input).css("color", color).val('').prop('disabled', false).focus();

	var audioElement = document.createElement('audio');
    var prevLen = 0;
	$('.name_input').on('input', function(){
		var sound;
        var color;
        var given_name = $(name_input).val();
		var name_check = name.substring(0, given_name.length);

		if (given_name == name){
            color = 'lightgreen';
            sound = 'smw_1-up.wav';
			$(name_input).prop('disabled', true);
			setTimeout(function() {
				location.reload()
			}, 2000);
		} else if (given_name == name_check && name_check != name && given_name.length >= prevLen) {
            color = 'lightgreen';
			sound = 'smw_coin.wav';
		} else if (given_name.length == 0 || given_name.length < prevLen) {
			sound = "";
			color = 'Moccasin';
		} else {
			var correction = given_name.substring(0, given_name.length-1);
			$(name_input).val(correction);
			sound = 'smw_jump.wav';
			color = 'tomato';
		}
        prevLen = given_name.length;
        audioElement.setAttribute('src', 'snd/'+sound);
		audioElement.play();
		$(name_input).css("background-color", color);
    });
});