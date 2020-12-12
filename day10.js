function addStartEndPointsAndSort(adapterList, builtInExtra) {
	let groomedAdapterList = adapterList;
	groomedAdapterList.push(0);
	groomedAdapterList.sort((a,b)=>a-b);
	// Useful note from ^: Adapters are all 1 or 3 away from each other
	groomedAdapterList.push(adapterList[adapterList.length-1]+builtInExtra);
	return groomedAdapterList;
}

function calculateJoltDifferenceProduct(adapterList, difference1, difference2) {
	const groomedAdapterList = addStartEndPointsAndSort(adapterList, difference2);
	let differenceCounts = [0,0], differencesLookingFor = [difference1, difference2];
	groomedAdapterList.slice(1).forEach((adapter)=>{
		const joltDifference = adapter-groomedAdapterList[groomedAdapterList.indexOf(adapter)-1];
		if (differencesLookingFor.includes(joltDifference)) {
			differenceCounts[differencesLookingFor.indexOf(joltDifference)] += 1;
		}
	});
	return differenceCounts[0]*differenceCounts[1];
}

// Based on all adapters being difference1 or difference2 joltage away from each other
// Assumes consecutive adapter streaks are capped at 5
function getAdapterPermutations(adapterList, difference1, difference2) {
	const groomedAdapterList = addStartEndPointsAndSort(adapterList, difference2);
	let joltDiff1Streak=0, numFiveConsec=0;
	const necessaryAdapters = groomedAdapterList.filter((adapter)=>{
		const joltDifferenceBelow = adapter-
			groomedAdapterList[groomedAdapterList.indexOf(adapter)-1];
		if (adapter === 0 || joltDifferenceBelow > difference1) {
			joltDiff1Streak = 0;
			return true;
		} else {
			joltDiff1Streak++;
			if (joltDiff1Streak === 4) {numFiveConsec++;}
			return ( groomedAdapterList[groomedAdapterList.indexOf(adapter)+1]
				-adapter > difference1 );
		}
	});
	return ( Math.pow(2, groomedAdapterList.length-necessaryAdapters.length)
		*Math.pow(7/8, numFiveConsec) );
}

function interpretInput(rawInput) {
	return rawInput.split("\n").map(number=>parseInt(number));
}

input = `67
118
90
41
105
24
137
129
124
15
59
91
94
60
108
63
112
48
62
125
68
126
131
4
1
44
77
115
75
89
7
3
82
28
97
130
104
54
40
80
76
19
136
31
98
110
133
84
2
51
18
70
12
120
47
66
27
39
109
61
34
121
38
96
30
83
69
13
81
37
119
55
20
87
95
29
88
111
45
46
14
11
8
74
101
73
56
132
23`;

console.log(calculateJoltDifferenceProduct(interpretInput(input),1,3));
console.log(getAdapterPermutations(interpretInput(input),1,3));
