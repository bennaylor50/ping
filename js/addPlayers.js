/* To do list 

1. name validation,
2. desiable radio buttons
3. change to j query for radio selector
4. One click buttons
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
	counter =0;
	rounds = 0;


	// whichround dicded which header should displayed depending on the number of players before 
	//calling displayGames function

	let whichRound= (arr) => {
		rounds += 1
		length = arr.length;
		

		if (length > 0 ){

			if( rounds >  1 && length === 1){

			let win = "<h1>"+"Winner"+"</h1>"+
				"<h4>"+arr[0]+"<h4>"
				display.append(win);
			}

			if(length === 2){
			let final ="<h1>"+"Final"+"</h1>"
			display.append(final);

			return displayGames(arr);
			}

			if(length === 4){
			let semiFinal ="<h1>"+"SemiFinal"+"</h1>"
			display.append(semiFinal);

			return displayGames(arr);
			}

			if(length === 6 || length === 8){
			let quaterFinal="<h1>"+"QuaterFinal"+"</h1>"
			display.append(quaterFinal);

			return displayGames(arr);
			}

			if(length > 8){
			let rou ="<h1>"+"Round"+rounds+"</h1>"
			display.append(rou);

			return displayGames(arr);
			}
		} 
		else{
			let err = "<p>Please enter a players names</p>" 
			return error.append(err);
		}
	}

	//displayGames works out if a buy is requird the calls shufflePlayers Function 

	let displayGames = (arr) =>{
		
			
		if (length % 2 === 0){
			
			return shufflePlayers(arr)
		}

		if (length % 2 !== 0){
	    	arr.push("buy");

    		return shufflePlayers(arr)
		}
		    	  	
	}

	//shufflePlayers assigs players to there groupings and displayes them on screen

	let shufflePlayers =(array) =>{
		
		array.map((val,index) => {

		    if (index % 2 === 0 || index === 0){
		    	counter += 1;
		    	
		    	// Games push to the index page, game number, the players names and 
		    	//radio buttons to record the win. 
		    	let games = "<div>"+
		    		"<h3>"+"Game"+" "+counter+"</h3>"+
	    	 		'<input type="radio" name='+array[index]+' value="'+array[index]+'"><label>'+array[index]+'</label>'+" "+ "v"+ " " +
	    	 		'<input type="radio" name='+array[index]+' value="'+array[index+1]+'"><label>'+array[index+1]+'</label>'
	    	 			+"</div>"//'<input type="button" name="'+array[index]+' id="Winner" value="winner"/>';
	    	 	display.append(games);
	    	}
	    	
		});
		
	}

	//This function takes the players that won the round and add them 
	// to a new array which is then fed back in to display games 
	// for the next round
	
	let nextRound =(arrs) => {
		let winners= [];
	
		arrs.map((val,index) => {


		  		let winRadio = document.querySelector("[name="+arrs[index]+"]:checked")
		  	
		
		  		if (winRadio != null) {
		    	 	 winners.push(winRadio.value)	
		    	}
		    //$("[name="+arrs[index]+"]").removeAttr("checked"); 	
		
		});

		//arrs.map((val,index) => {

			//document.querySelector("[name = "+arrs[index]+ "].attr('checked',false");
		  	
		 //});

		arrs = 0;
	 	arrs = winners;
	  	return whichRound(arrs);
	  	console.log(arrs);
	  	

	}
	//addPlayer click takes the inputs and display it a list and adds to an array, the array is the shuffled 
	//and length measured.

	addPlayer.on("click",(event) => {
		 event.preventDefault();
		 
		
		 	
		if( input.val() !== "" ){

			//store.filter(index =>
				//if(input.val !== store[index]){

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

	startGame.on("click",(event) => {
		event.preventDefault();
			return whichRound(store);
	});

	// on click of round the next round function is calleed
	round.on("click",(event)=>{
		event.preventDefault();
			return nextRound(store);


	});
});

