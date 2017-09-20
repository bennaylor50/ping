/* To do list 

1. name validation, check name not aleardy in the array and does not start with a number 
4. next round button only click able if radio buttons are sellected 
5. refresh button, reload the page
8. bye can not win (if statement for next round)
9. maken first letter of name captail

*/

$(document).ready($ => {
	
	let addPlayer =$("#submitPlayersName");
	let input =$("#text"); //text input for players name
	let list = $(".list"); //pre shuffle list of names 
	let startGame = $("#start"); 
	let store = []; // intial array
	let display = $("#display"); 
	let error =$("#error");
	let round= $("#round");
	let test =$("#test");
	roundCounter =0;
	rounds = 0;
	indexNumber = 0;
	indexErray = [];

	// whichround dicded which header should displayed depending on the number of players before 
	//calling displayGames function

	let displayGames = (arr) =>{
		length = arr.length;

		if (length > 1 ){
				
			if (length % 2 === 0){
				
				return whichRound(arr)
			}

			if (length % 2 !== 0){
		    	arr.push("bye");

	    		return whichRound(arr)
			}
		    	  	
		} 
		else if( rounds >  1 && length === 1){
				let win = "<h1>"+"Winner"+"</h1>"+
				"<h4>"+arr[0]+"<h4>"
				display.append(win);

		} else {

			let err = "<p>Please enter a  players names</p>" 
			return error.append(err);
		}
	}

	let whichRound= (arr) => {
		rounds += 1
		length = arr.length;
		
			if(length === 2){
			let final ="<div>"+"<h1>"+"Final"+"</h1>"
			display.append(final);

			return shufflePlayers(arr);
			}

			if(length === 4){
			let semiFinal ="<div>"+"<h1>"+"SemiFinal"+"</h1>"
			display.append(semiFinal);

			return shufflePlayers(arr);
			}

			if(length === 6 || length === 8){
			let quaterFinal="<div>"+"<h1>"+"QuaterFinal"+"</h1>"
			display.append(quaterFinal);

			return shufflePlayers(arr);
			}

			if(length > 8){
			let rou ="<div>"+"<h1>"+"Round"+rounds+"</h1>"
			display.append(rou);

			return shufflePlayers(arr);
			}
		
	}

	//displayGames works out if a buy is requird the calls shufflePlayers Function 

	//shufflePlayers assigs players to there groupings and displayes them on screen

	let shufflePlayers =(array) =>{
		

		array.map((val,index) => {

		    if (index % 2 === 0 || index === 0){
		    	roundCounter += 1;
		    	indexNumber += 1;

		    	indexErray.push(indexNumber);
		    	console.log(indexErray);
		    	
		    	// Games push to the index page, game number, the players names and 
		    	//radio buttons to record the win. 
		    	
		    	let games = 

		    	"<div class=flex-item>"+
			    		"<h3>"+"Game"+" "+roundCounter+"</h3>"+
		    	 		'<input type="radio" id='+(indexNumber)+' name='+array[index]+' value="'+array[index]+'">'+" "+'<label>'+array[index]+'</label>'+" "+ "v"+ " " +
		    	 		'<input type="radio" id='+(indexNumber += 1)+' name='+array[index]+' value="'+array[index+1]+'">'+" "+'<label>' +" " +array[index+1]+'</label>'
	    
	    	 	+"</div>"

	    	 	let total = "<div class = flex-container>" +games+"</div>"
	    	 	display.append(total);
	    	 	

	    	 	indexErray.push(indexNumber);
	    	 	console.log(indexErray);
	    	}
	    	
		});

	}

	//This function takes the players that won the round and add them 
	// to a new array which is then fed back in to display games 
	// for the next round
	
	let nextRound =(arrs) => {
		let winners= [];

	//add in check to see radio buttons have been sellected 
		indexErray.map((val) => {

		  	let winRadio = document.getElementById(val);
		
	  			if (winRadio.checked){

	    	 	 	winners.push(winRadio.value)
	    	 	 	console.log(winners)

	    	 	 	if (winners != []){
	    	 	
		    			let rest = document.getElementById(val).checked = false;
						let dis = document.getElementById(val).disabled = true;

						arrs = 0;
		 				arrs = winners;
		  				return displayGames(arrs);
		  				console.log(arrs);
	    	 	
	    			} else {let tt = "<p>Please select a winner</p>"
	    	 	 	error.append(tt)
	    	 	 	}

	    	 	}

		});

		

				
	}
	//addPlayer click takes the inputs and display it a list and adds to an array, the array is the shuffled 
	//and length measured.

	addPlayer.on("click",(event) => {
		 event.preventDefault();
		
		if( input.val() !== "" ){

					store.push(input.val());
					store.sort((a, b)=> 0.5 - Math.random());
					
					console.log(length);

				 	let item = input.val();
				 	let li = "<li>" + item + "</li>";
				 	list.append(li);
				 	input.val("");
				 	console.log(store)
			 	//}
			//)
		}
		
	});

	// on click of start game which round function is called 
	let startClick = 0;

	startGame.on("click",(event) => {
	
		if (startClick < 1){
		event.preventDefault();
			startClick += 1;
			return displayGames(store);
		}
	});

	// on click of round the next round function is calleed
	round.on("click",(event)=>{
		event.preventDefault();
			return nextRound(store);


	});
});

