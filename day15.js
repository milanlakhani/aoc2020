function memoryGame(startingNumbers, endPosition) {
	let spokenList = startingNumbers.map(number=>number.toString()), spokenDict = {};
	spokenList.slice(0,-1).forEach((number)=>{
		spokenDict[number]=spokenList.indexOf(number)+1
	});
	while (spokenList.length < endPosition) {
		const lastNumber = spokenList[spokenList.length-1];
		if (spokenDict[lastNumber]) {
			spokenList.push(spokenList.length - spokenDict[lastNumber]);
		} else {
			spokenList.push(0);
		}
		spokenDict[lastNumber] = spokenList.length-1;
	}
	return spokenList[endPosition-1]
}

input = [1,0,16,5,17,4];

console.log(memoryGame(input, 2020));
console.log(memoryGame(input, 30000000));