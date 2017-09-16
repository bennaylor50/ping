$(document).ready($ => {
	
	let addPlayer =$("#submitPlayersName");
	let input =$("#text"); //text input for players name
	let list = $(".list"); //pre shuffle list of names 
	let startGame = $("#start"); 
	let store = []; // intial array
	let winners=[]; // next round array 
	let display = $("#display"); 
	let error =$("#error");
	let round= $("#round");
	let winner =$("#winner")
	counter =0;

	let shufflePlayers =() =>{
		
		store.sort((a, b)=> 0.5 - Math.random());
		store.map((val,index) => {

		    if (index % 2 === 0 || index === 0){
		    	counter += 1;
		    	
		    	// Games push to the index page, game number, the players names and 
		    	//radio buttons to record the win. 
		    	let games ="<h3>"+"Game"+" "+counter+"</h3>"+
	    	 		'<input type="radio" name='+store[index]+' value="'+store[index]+'"><label>'+store[index]+'</label>'+" "+ "v"+ " " +
	    	 		'<input type="radio" name='+store[index]+' value="'+store[index+1]+'"><label>'+store[index+1]+'</label>'
	    	 		//+'<input type="button" name="'+store[index]+' id="Winner" value="winner"/>';
	    	 	display.append(games);
	    	
	    	 }
	    	
		});

	}
	

	let nextRound =() => {
		
		store.filter((val,index) => {
			
	
			document.getElementById("round").addEventListener("click", function() {
		  		let cbChecked = document.querySelector("[value="+store[index]+"]:checked")
		
		  		if (cbChecked != null) {
		    	winners.push(cbChecked.value)
		    	}
		    	console.log(winners)
		  	});
		 });
		
	}

// shuffle function takes the store array and ranmadizes it.
// then divedes that array into game groups of 2 players. 
	
	let shuffle = (store) =>{
		if (length > 0 ){
			if (length % 2 === 0){
			
				return shufflePlayers()
			}

			if (length % 2 !== 0){
		    	store.push("buy");
	
	    		return shufflePlayers()
			}
			    	  
		} else document.getElementById('error').innerHTML="Please enter a players names";
	}

	addPlayer.on("click",(event) => {
		 event.preventDefault();
		if( input.val() !== ""){
			store.push(input.val());
			length = store.length;
			console.log(length);

		 	let item = input.val();
		 	let li = "<li>" + item + "</li>";
		 	list.append(li);
		 	input.val("");
		 	console.log(store);
		}
		
	});


	startGame.on("click",(event) => {
		event.preventDefault();
			return shuffle(store);
	});



	



	document.getElementById("display").innerHTML = store;
	document.getElementById("round").innerHTML = winners;






});
