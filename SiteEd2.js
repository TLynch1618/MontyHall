//Establish variables - player name, player door, host door, min/max rndint, door array

let playrName = "";
let playrDoor = 0;
let hostDoor = 0;
let min = 0;
let max = 0;
const doorArray = [1,2,3];
let x = 0;
let fOpen1 = 0;
let fOpen2 = 0;


//Transition from Comm1 to Comm2.  Save player name.  

document.getElementById("Continue1").addEventListener("click", function() {
	document.getElementById("Comm1").style.display = "none";
	playrName = document.getElementById("PlayrName").value;
	document.getElementById("namescript").innerHTML = "Welcome, " + playrName + "!  It's great to make your acquaintance.  Now, let's see if we can make a deal.  Of the three doors above, one is hiding a <strong>brand new car</strong>!  Click on the door you think is hiding your new set of wheels.";
	document.getElementById("Comm2").style.display = "block";
	document.getElementById("Continue1").style.display = "none";

});

//Transition from Comm2 to Comm3.  Add event listeners to doors.  This nests event listeners to preclude someone selecting a door from the first stage. 

function getRndInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

document.getElementById("Continue1").addEventListener("click", function() {
	document.getElementById("door1").addEventListener("click", myFunction1);
});

function myFunction1() {
	document.getElementById("Comm2").style.display = "none";
	document.getElementById("doorselectscript").innerHTML = "Alright, you've selected: Door 1.  Is that your final answer?  If not, select another door.";
	document.getElementById("Comm3").style.display = "block";
	playrDoor = 1;
	document.getElementById("Continue2").style.display = "block";
}

document.getElementById("Continue1").addEventListener("click", function() {
	document.getElementById("door2").addEventListener("click", myFunction2);
});

function myFunction2() {
	document.getElementById("Comm2").style.display = "none";
	document.getElementById("doorselectscript").innerHTML = "Alright, you've selected: Door 2.  Is that your final answer?  If not, select another door.";
	document.getElementById("Comm3").style.display = "block";
	playrDoor = 2;
	document.getElementById("Continue2").style.display = "block";
}

document.getElementById("Continue1").addEventListener("click", function() {
	document.getElementById("door3").addEventListener("click", myFunction3);
});

function myFunction3() {
	document.getElementById("Comm2").style.display = "none";
	document.getElementById("doorselectscript").innerHTML = "Alright, you've selected: Door 3.  Is that your final answer?  If not, select another door.";
	document.getElementById("Comm3").style.display = "block";
	playrDoor = 3;
	document.getElementById("Continue2").style.display = "block";
}

//Transition from Comm3 to Comm4.  Remove event listeners from doors. Select host door. Select first door to open.

function firstDoor(x) {
	hostDoor = getRndInt(1, 3);
	fOpen1 = x - 1;
		doorArray.splice(fOpen1, 1);
		if (doorArray.includes(hostDoor) == true) {
			fOpen2 = doorArray[1 - doorArray.indexOf(hostDoor)];
			fOpen3 = hostDoor;
		}
		else {
			fOpen2 = doorArray[getRndInt(0,1)];
			if (fOpen2 == doorArray[0]) {
				fOpen3 = doorArray[1];
			}
			else {
				fOpen3 = doorArray[0];
			}
		}
}
	
document.getElementById("Continue2").addEventListener("click", function() {
	document.getElementById("door1").removeEventListener("click", myFunction1);
	document.getElementById("door2").removeEventListener("click", myFunction2);
	document.getElementById("door3").removeEventListener("click", myFunction3);
	document.getElementById("confirmationscript").innerHTML = "You have officially locked in your answer as door number " + playrDoor + ".  If that <strong>brand new car</strong> is behind door " + playrDoor + ", you could be driving it home today.  We're going to save your door for a moment and check to see if the car is behind one of these other doors.  Are you ready?";
	document.getElementById("Comm3").style.display = "none";
	document.getElementById("Comm4").style.display = "block";
	document.getElementById("Continue3").style.display = "block";
	document.getElementById("Continue2").addEventListener("click", firstDoor(playrDoor));
	document.getElementById("Continue3").addEventListener("click", function() {
		document.getElementById("door" + fOpen2).className = "donkey";
	});
});

//Open donkey door.

document.getElementById("Continue3").addEventListener("click", function() {
	document.getElementById("Comm4").style.display = "none";
	document.getElementById("frstDonkeyscript").innerHTML = "We're sneaking a peek behind door " + fOpen2 + ", and it's a donkey!  Whew!  Luckily that wasn't the new car.  Now I have a very important question for you...";
	document.getElementById("Comm5").style.display = "block";
	document.getElementById("Continue4").style.display = "block";
});

//Switch doors?

document.getElementById("Continue4").addEventListener("click", function() {
	document.getElementById("Comm5").style.display = "none";
	document.getElementById("switchscript").innerHTML = "Now we now that car is behind one of the remaining doors.  It could be the door you selected, but it could also be the door you've neglected.  My question to you, " + playrName + ", is would you like to stick with door " + playrDoor + ", or switch to door " + fOpen3 + "?";
	document.getElementById("Comm6").style.display = "block";
	document.getElementById("Confirm1").style.display = "block";
	document.getElementById("Confirm2").style.display = "block";
});	

//Reveal what's behind the player's final selected door. 

function stayDoor() {
	document.getElementById("Game").style.display = "none";
	document.getElementById("Dialogue").style.display = "none";
	document.body.style.backgroundColor = "black";
	document.getElementById("containerF").style.display = "block";
	document.getElementById("finalLabel").innerHTML = "Door " + playrDoor;
	document.getElementById("finalLabel").style.display = "block";
	document.getElementById("Final").style.display = "block";
	document.getElementById("openfinalbutton").style.display = "block";
}

function switchDoor() {
	document.getElementById("Game").style.display = "none";
	document.getElementById("Dialogue").style.display = "none";
	document.body.style.backgroundColor = "black";
	document.getElementById("containerF").style.display = "block";
	document.getElementById("finalLabel").innerHTML = "Door " + fOpen3;
	document.getElementById("finalLabel").style.display = "block";
	document.getElementById("Final").style.display = "block";
	document.getElementById("openfinalbutton").style.display = "block";
}

function openFinal() {
	document.getElementById("finalLabel").style.display = "none";
	document.getElementById("openfinalbutton").style.display = "none";
	document.getElementById("Final").style.display = "block";
	if (hostDoor == playrDoor) {
		document.getElementById("Final").className = "car";
	}
	else {
		document.getElementById("Final").className = "finaldonkey";
	}
}