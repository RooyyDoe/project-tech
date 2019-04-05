console.log('Hello World');

/* eslint-env browser */
/* eslint-disable semi */

var gameList = document.getElementsByClassName('del');
// This is for every element with the class 'del', so all the games on the profile
for(var i = 0; i < gameList.length; i++) {
	// gets the cross
	var remove = gameList[i].getElementsByClassName('remove');
	// Another check for the crosses to be sure
	if(remove.length) {
		// add the event handler for each cross. All the crosses needs to be looped
		// over so that its not only one. Error fixed by changing it up to class
		// instead of IDs.
		remove[0].addEventListener('click', onremove);
	}			
}

function onremove(e) {
	// The cross you click on is inside the link. Because e.target is being called
	// is that the img. The parent element has the attribute data-name.
	// This needs to get retrieved as first, and the value in data-name.
	var game = e.target.parentElement.getAttribute('data-name');
	
	// we are making a res variable with a new http request inside of it.
	var res = new XMLHttpRequest();
	// Part that I don't know how to explain.
	// Its running the delete route. after that it will run the function onload
	// and then it wil send it to the next page.
	res.open('DELETE', '/' + game);
	res.onload = onload;
	res.send();
	// Function onload checks if their is an error or not. with the status part.
	// if the status isn't 200 it will give an error, otherways it will go to
	// the link /profile
	function onload() {
		if (res.status !== 200) {
			throw new Error('Could not delete!');
		}
		else {
			window.location = '/profile';
		}
	}
}

