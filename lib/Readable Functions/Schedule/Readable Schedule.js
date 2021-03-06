/**
 * Gets the official Event Schedule for the given event.
 * 
 * @param {String}
 *            eventKey - TBA Event Key
 * @returns {Array} returns the official Event Schedule for the event
 */
function getScheduleReadable(eventKey) {
	var eventData = getMatchesSimple(eventKey, "", true);

	var qm = getQM_(eventData).filter(Boolean);

	qm = sortQM_(qm);

	var schedule = [];

	schedule.push(getMatchNums_(qm), getTimes_(qm));

	schedule = schedule.concat(getRedTeams_(qm), getBlueTeams_(qm));

	schedule.push(getRedScore_(qm), getBlueScore_(qm))

	return transpose_(schedule);
}

function getQM_(eventData) {
	return eventData.map(function(a) {
		if (a["comp_level"].toString() === "qm")
			return a;
	});
}

function sortQM_(qm) {
	return qm.sort(function(a, b) {
		if (a["match_number"] > b["match_number"]) {
			return 1;
		} else if (a["match_number"] < b["match_number"]) {
			return -1;
		}
		return 0;
	});
}

function getTimes_(qm) {
	return [ "Start Time" ].concat(qm.map(function(a) {
		if(a["time"]) {
			return new Date(a["time"] * 1000).toLocaleString('en-US');
		}
		else {
			return "Time not posted";
		}
	}));
}

function getMatchNums_(qm) {
	return [ "Qualification Match" ].concat(qm.map(function(a) {
		return a["match_number"]
	}));
}

function getRedTeams_(qm) {
	return [ [ "Red 1" ].concat(qm.map(function(a) {
		return a["alliances"]["red"]["team_keys"][0].replace("frc", "")
	})), [ "Red 2" ].concat(qm.map(function(a) {
		return a["alliances"]["red"]["team_keys"][1].replace("frc", "")
	})), [ "Red 3" ].concat(qm.map(function(a) {
		return a["alliances"]["red"]["team_keys"][2].replace("frc", "")
	})) ];
}

function getBlueTeams_(qm) {
	return [ [ "Blue 1" ].concat(qm.map(function(a) {
		return a["alliances"]["blue"]["team_keys"][0].replace("frc", "")
	})), [ "Blue 2" ].concat(qm.map(function(a) {
		return a["alliances"]["blue"]["team_keys"][1].replace("frc", "")
	})), [ "Blue 3" ].concat(qm.map(function(a) {
		return a["alliances"]["blue"]["team_keys"][2].replace("frc", "")
	})) ];
}

function getRedScore_(qm) {
	return [ "Red Final" ].concat(qm.map(function(a) {
		if(a["alliances"]["red"]["score"] > -1) {
			return a["alliances"]["red"]["score"];
		}
		else {
			return 0;
		}
	}));
}

function getBlueScore_(qm) {
	return [ "Blue Final" ].concat(qm.map(function(a) {
		if(a["alliances"]["blue"]["score"] > -1) {
			return a["alliances"]["blue"]["score"];
		}
		else {
			return 0;
		}
	}));
}