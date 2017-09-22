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

	let pageScroll =() => {
	    window.scrollBy(0,100);
	}

	String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
	}
	// whichround dicded which header should displayed depending on the number of players before 
	//calling displayGames function

	//displayGames works out if a bye is requird the calls shufflePlayers Function

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
			"<h4>"+arr[0]+"<h4>";
			display.append(win);
			return pageScroll();

		} else {

			let err = "<p>Please enter a  players names</p>";
			return error.append(err);
		}
	};

	// whichround decides the round title  

	let whichRound= (arr) => {
		rounds += 1
		length = arr.length;
		
		if(length === 2){
			let final ="<div>"+"<h1>"+"Final"+"</h1>";
			display.append(final);

			return shufflePlayers(arr);
		}

		if(length === 4){
			let semiFinal ="<div>"+"<h1>"+"Semi Final"+"</h1>";
			display.append(semiFinal);

			return shufflePlayers(arr);
		}

		if(length === 6 || length === 8){
			let quaterFinal="<div>"+"<h1>"+"Quater Final"+"</h1>";
			display.append(quaterFinal);

			return shufflePlayers(arr);
		}

		if(length > 8){
			let rou ="<div>"+"<h1>"+"Round"+" "+rounds+"</h1>";
			display.append(rou);

			return shufflePlayers(arr);
		}
		
	};

	//shufflePlayers assigs players to  groupings and displays them on screen

	let shufflePlayers =(array) =>{

		array.map((val,index) => {

		    if (index % 2 === 0 || index === 0){
		    	roundCounter += 1;
		    	indexNumber += 1;

		    	indexErray.push(indexNumber);
		    	
		    	// Games push to the index page, game number, the players names and 
		    	//radio buttons to record the win. 
		    	
		    	let games = "<div class=flex-item>"+
					    		"<h3>"+"Game"+" "+roundCounter+"</h3>"+
				    	 		'<input type="radio" id='+(indexNumber)+' name='+array[index]+' value="'+array[index]+'">'+" "+'<label>'+array[index]+" "+"v"+'</label>'+" "+ " " +
				    	 		'<input type="radio" id='+(indexNumber += 1)+' name='+array[index]+' value="'+array[index+1]+'">'+" "+'<label>' +" " +array[index+1]+'</label>'
		    
		    	 			+"</div>"

	    	 	let total = "<div class = flex-container>" +games+"</div>";
	    	 	display.append(total);

	    	 	indexErray.push(indexNumber);
	    	 	
	    	}
	    return pageScroll();
	    	
		});
	};

	//nextRound collects winners and disbales radio buttons 
	
	let nextRound =(arrs) => {
		let winners= [];
		let counterOne =[];
		let counterTwo= [];
		indexErray.map((val) => {

		  	let winRadio = document.getElementById(val);

			counterOne.push(winRadio);

			if(winRadio.disabled){

				counterTwo.push(winRadio.value);
			}

	  		if (winRadio.checked){

  				if (winRadio.value !== "bye"){

	    	 	 	winners.push(winRadio.value);
	    	 	 	
				}
    	 	}
		});
	
		//prevents the next round button being pressed if all winners are not selected

		if ((counterOne.length-counterTwo.length)/2 == winners.length ){

			indexErray.map((val) => {

			   	let rest = document.getElementById(val).checked = false;
				let dis = document.getElementById(val).disabled = true;

			});
				
			arrs = 0;
			arrs = winners;
			
			return displayGames(arrs);
	    }	
		
	};	


	//addPlayer takes the inputs and display it as list and adds them to an array, the array is then shuffled 

	addPlayer.on("click",(event) => {
		event.preventDefault();

		if( input.val() !== "" ){

			let item = input.val().capitalize();

			if(store.indexOf(item) == -1){

				store.push(item);
				store.sort((a, b)=> 0.5 - Math.random());

			 	let li = "<li class=flex-item>" + item + "</li>";
			 	list.append(li);
			 	input.val("");
			}	

			return pageScroll();	
		}
		
	});

	// start game calls display game function 
	let startClick = 0;

	startGame.on("click",(event) => {
	
		if (startClick < 1){
			event.preventDefault();
			startClick += 1;
			return displayGames(store);
		}
	});

	// round the next round function is called
	round.on("click",(event)=>{
		event.preventDefault();
		return nextRound(store);
	});
});

