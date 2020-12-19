function getBusToAirport(currentTime, busServices) {
	let departureTime = currentTime - 1, noBus=true, myBus = 0;
	while (noBus) {
		departureTime++;
		busServices.forEach((bus)=>{
			if (departureTime % bus === 0) {
				myBus = bus;
				noBus = false;
			}
		});
	}
	return myBus*(departureTime-currentTime);
}

console.log(getBusToAirport(1000510, [19, 41, 523, 17, 13, 29, 853, 37, 23]));

// Assumes bus numbers are all prime
function contest(busServicesWithXs) {
	let timestamp = 0, busAndOffsetList = [], multiplier = 1;
	busServicesWithXs.forEach((bus)=>{
		if (bus != `x`) {
			busAndOffsetList.push({ bus: parseInt(bus),
				offset: busServicesWithXs.indexOf(bus) });
		}
	});
	busAndOffsetList.forEach((busAndOffset)=>{
		let busDone = false;
		while (!busDone) {
			if ((timestamp+busAndOffset[`offset`])%busAndOffset[`bus`] === 0) {
				multiplier *= busAndOffset[`bus`];
				busDone = true;
			} else {
				timestamp += multiplier;
			}
		}
	});
	return timestamp;
}

function interpretInput(rawInput) {
	return rawInput.split(",");
}

input = `19,x,x,x,x,x,x,x,x,41,x,x,x,x,x,x,x,x,x,523,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,17,13,x,x,x,x,x,x,x,x,x,x,29,x,853,x,x,x,x,x,37,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,23`;

console.log(contest(interpretInput(input)));