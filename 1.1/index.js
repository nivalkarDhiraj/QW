//time complexity => O(root(n))
const checkPrime = (number) => {
	const t1 = performance.now();
	for (let i = 2; i <= Math.sqrt(number); i++) {
		if (number % i === 0) {
			const t2 = performance.now();
			return { isPrime: false, number, timeTaken: t2 - t1 };
		}
	}
	const t2 = performance.now();
	return { isPrime: true, number, timeTaken: t2 - t1 };
};

const getPrimesFromArray = (numbers) => {
	return numbers.filter((number) => number.isPrime); //filtering out prime numbers
};

const averageTimeForPrime = (numbers) => {
	return (
		numbers
			.filter((number) => number.isPrime) //filtering out prime numbers
			.map((number) => number.timeTaken) // keeping the timetaken in array
			.reduce((sum, timeTaken) => sum + timeTaken, 0) / // adding the timetaken
		numbers.filter((number) => number.isPrime).length //counting number of prime numbers
	);
};

const averageTimeForAll = (numbers) => {
	return (
		numbers
			.map((number) => number.timeTaken) // keeping the timetaken in array
			.reduce((sum, timeTaken) => sum + timeTaken, 0) / // adding the timetaken
		numbers.filter((number) => number.isPrime).length //counting all the numbers in range
	);
};

// Time Complexity => O((end-start) root(end))
const getPrimesInRange = (start, end) => {
	if (isNaN(start) || isNaN(end)) {
		return { error: "Please enter Numbers" };
	} else if (start >= end) {
		return { error: "end should be greater than start" };
	}

	let numbersInRange = [];

	start = start < 2 ? 2 : start;

	const t1 = performance.now();

	for (let i = start; i <= end; i++) {
		numbersInRange.push(checkPrime(i));
	}

	const t2 = performance.now();

	return {
		primeNumbers: getPrimesFromArray(numbersInRange),
		allNumbers: numbersInRange,
		timeTaken: t2 - t1,
		averageTimeForPrime: averageTimeForPrime(numbersInRange),
		averageTimeForAll: averageTimeForAll(numbersInRange),
	};
};

const getElementById = (id) => {
	let resultNode = null;

	const getNode = (node) => {
		if (node.id === id) {
			resultNode = node;
		}
		for (let i = 0; i < node.childNodes.length; i++) {
			getNode(node.childNodes[i]);
		}
	};
	getNode(document);

	return resultNode;
};

const addTableHeaders = (table) => {
	table.innerHTML = "";
	const tr = document.createElement("tr");
	const th1 = document.createElement("th");
	th1.innerHTML = "Number";
	tr.appendChild(th1);

	const th2 = document.createElement("th");
	th2.innerHTML = "Result";
	tr.appendChild(th2);

	const th3 = document.createElement("th");
	th3.innerHTML = "Timein ms";
	tr.appendChild(th3);

	table.appendChild(tr);
};

window.onload = () => {
	const start = getElementById("rangestart");
	const end = getElementById("rangeend");
	const findButton = getElementById("findPrime");

	const results = getElementById("results");
	const timeForFunction = getElementById("timeForFunction");
	const timeForAll = getElementById("timeForAll");
	const timeForPrime = getElementById("timeForPrime");
	const primeNumbers = getElementById("primeNumbers");

	const detailsButton = getElementById("details");
	const detailsModal = getElementById("detailsModal");
	const close = getElementById("close");
	const primeTable = getElementById("primeTable");
	const allTable = getElementById("allTable");

	let result;
	findButton.addEventListener("click", () => {
		result = getPrimesInRange(parseInt(start.value), parseInt(end.value));
		if (result.error) {
			alert(result.error);
		} else {
			results.style.display = "block";

			timeForFunction.innerHTML = result.timeTaken + " ms";
			timeForAll.innerHTML = result.averageTimeForAll + " ms";
			timeForPrime.innerHTML = result.averageTimeForPrime + " ms";

			primeNumbers.innerHTML= "";
			result.primeNumbers.map((number) => {
				primeNumbers.innerHTML += "  " + number.number;
			});
		}
	});

	detailsButton.addEventListener("click", () => {
		detailsModal.style.display = "block";

		//for Prime numbers
		addTableHeaders(primeTable);
		result.primeNumbers.map((number) => {
			const tr = document.createElement("tr");
			const td1 = document.createElement("td");
			td1.innerHTML = number.number;
			tr.appendChild(td1);

			const td2 = document.createElement("td");
			td2.innerHTML = number.isPrime ? "Prime" : "Normal";
			tr.appendChild(td2);

			const td3 = document.createElement("td");
			td3.innerHTML = number.timeTaken;
			tr.appendChild(td3);

			primeTable.appendChild(tr);
		});

		//For all Numbers
		addTableHeaders(allTable);
		result.allNumbers.map((number) => {
			const tr = document.createElement("tr");
			const td1 = document.createElement("td");
			td1.innerHTML = number.number;
			tr.appendChild(td1);

			const td2 = document.createElement("td");
			td2.innerHTML = number.isPrime ? "Prime" : "Normal";
			tr.appendChild(td2);

			const td3 = document.createElement("td");
			td3.innerHTML = number.timeTaken;
			tr.appendChild(td3);

			allTable.appendChild(tr);
		});
	});

	close.addEventListener("click", () => {
		detailsModal.style.display = "none";
	});

	window.onclick = (event) => {
		if (event.target == detailsModal) {
			detailsModal.style.display = "none";
		}
	};
};
