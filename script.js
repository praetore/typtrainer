/**
 * Created by Darryl on 19-6-14.
 */

$( document ).ready(function() {
    var names = ["enzo", "zino", "darryl", "mariska", "bram", "mayron", "jayden", "willy", "marvin"];
    var name = names[Math.floor(Math.random() * names.length)];
    var name_input = '.name_input input[type="text"]';
    var checked_color = 'input[name=color]:checked';

    $(name_input).focus();
    $("div.name").append('<p>' + name + '</p>');
    var color = $(checked_color, '#color').val();
    $(name_input).css("color", color);

	$('#color').find('input').on('change', function() {
        color = $(checked_color, '#color').val();
		$(name_input).css("color", color);
	});

	var audioElement = document.createElement('audio');

	$('.name_input').on('input',function(){
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
		} else if (given_name == name_check && name_check != name) {
            color = 'lightgreen';
			sound = 'smw_coin.wav';
		} else if (given_name.length == 0) {
			sound = "";
			color = 'Moccasin';
		} else {
			var correction = given_name.substring(0, given_name.length-1);
			$(name_input).val(correction);
			sound = 'smw_jump.wav';
			color = 'tomato';
		}

        audioElement.setAttribute('src', 'snd/'+sound);
		audioElement.play();
		$(name_input).css("background-color", color);
    });
});