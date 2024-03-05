exports.cron = function(data) {

	const moment = require('moment');
	moment.locale('fr');
	const now = moment();

  const anniversaires = [
  { prenom: "david", birthday: "31-12-2023" },
  { prenom: "paul", birthday: "10-05-2023" },
  { prenom: "jean", birthday: "20-09-2023" },
  { prenom: "elise", birthday: "08-05-2023" }
  ];

const todayBirthday = anniversaires.find(({ birthday }) => now.format('DD-MM-YYYY') === birthday);

if (todayBirthday) {
	Avatar.speak(`Aujourd'hui, c'est l'anniversaire de ${todayBirthday.prenom}, Joyeux anniversaire, ${todayBirthday.prenom} !`, data.client, () => {
		Avatar.Speech.end(data.client);
		playMp3
	});
} else {
	Avatar.speak("Pas d'anniversaire aujourd'hui", data.client, () => {
		Avatar.Speech.end(data.client);
	});
}

function playMp3 (data, client) {
	Avatar.play(`${__dirname}/medias/JoyeuxAnniversaire.mp3`, data.client);
}


}

	
exports.action = function(data, callback){

	var tblCommand = {
		anni : function() {anni (data, client);
					},
		stop : function() {stop (data, client);
					}					
	};

	let client = setClient(data);
	info("Anniversaire:", data.action.command, "From:", data.client, "To:", client);
	tblCommand[data.action.command]();
	callback();
}


function anni (data, client) {

    Avatar.speak("Attend, je regarde", data.client, () => {

	const moment = require('moment');
	moment.locale('fr');
	const now = moment();

  const anniversaires = [
  { prenom: "david", birthday: "31-12-2023" },
  { prenom: "paul", birthday: "10-05-2023" },
  { prenom: "jean", birthday: "20-09-2023" },
  { prenom: "elise", birthday: "08-05-2023" }
  ];

const todayBirthday = anniversaires.find(({ birthday }) => now.format('DD-MM-YYYY') === birthday);

if (todayBirthday) {
	Avatar.speak(`Aujourd'hui, c'est l'anniversaire de ${todayBirthday.prenom}, Joyeux anniversaire !, ${todayBirthday.prenom} !`, data.client, () => {
		Avatar.Speech.end(data.client);
		playMp3 (data, client);
	});
} else {
	Avatar.speak("Pas d'anniversaire aujourd'hui", data.client, () => {
		Avatar.Speech.end(data.client);
	});
}

	Avatar.Speech.end(data.client);
    });
}



function playMp3 (data, client) {
       Avatar.play(`${__dirname}/medias/JoyeuxAnniversaire.mp3`, data.client);
}

function stop (data, client) {
	Avatar.speak("J'arrete la chanson anniversaire", data.client, () => {
		Avatar.speak("A bientot sur les fetes d'anniversaire", data.client, () => {
			 Avatar.Speech.end(data.client, true, () => {
				 Avatar.stop(null, client);
			 });
		});
	});
}


function setClient (data) {
	let client = data.client;
	if (data.action.room)
	client = (data.action.room != 'current') ? data.action.room : (Avatar.currentRoom) ? Avatar.currentRoom : Config.default.client;
    if (data.action.setRoom)
	client = data.action.setRoom;
	return client;
}