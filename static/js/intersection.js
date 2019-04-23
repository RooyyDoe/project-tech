/* eslint-disable comma-dangle */
// Bronnen:
// https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
// https://codepen.io/kriskuiper/pen/OqzXzE
// https://developer.mozilla.org/nl/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach
// https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserverEntry/isIntersecting
// https://developers.google.com/web/updates/2019/02/intersectionobserver-v2

// enables javascript when query is selected
if ('querySelector' in document) {
	document.body.classList.add('js-enabled');
}

// Gets all games in the list
var gameList = document.querySelectorAll('.gameList');
// console.log(gameList);

// Create a new intersection observer
var gameObserver = new IntersectionObserver(showList, {
	threshold: [0, .33, .66, 1]
});
// console.log(gameObserver);

// whenever the gameList meets a threshold for the gameObserver
// the callback is invoked. The callback recieves a list of entry
gameList.forEach(function check(gList) {
	gameObserver.observe(gList);
	// console.log(gList);
});

// Callback for the gameObserver variabel (So when the
// user scrolls down and a new entry comes into the
// viewport it will run the callback and add the
// class visible to the element.)
function showList(entries) {
	entries.forEach(function show(entry) {

		// this var gets all the threshold entrys
		var entryClass = entry.target.classList;
		console.log(entryClass);
		// looks if there is a new entry in the viewport
		if (entry.isIntersecting) {
			// adds class visible to the li element.
			entryClass.add('visible');
		}

	});
}
