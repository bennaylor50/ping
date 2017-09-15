$(document).ready($ => {
	
	let addPlayer =$("#submitPlayersName");
	let input =$("#text");
	let list = $(".list");
	let startGame = $("#start");
	let store = [];
	let display = $("#display");
	let error =$("#error");
	let round= $("#round");
	let winner =$("#winner")
	let player1 = $("#player1");

	
	
// shuffle function takes the store array and ranmadizes it.
// then divedes that array into game groups of 2 players. 

	let shuffle = (store) =>{
		let length = store.length;
		let counter =0;

		if (length > 0 ){
			if (length % 2 === 0){
		    	store.sort((a, b)=> 0.5 - Math.random());
				
			    store.map((val,index) => {

		    	 	if (index % 2 === 0 || index === 0){
		    	 		counter += 1;
		    	 		
			    	 	let games ="<h3>"+"Game"+" "+counter+"</h3>"+
	    	 						"<p>"+ store[index] +" "+ "v"+ " "+store[index + 1] + "</p>"+" "+ "</p>"
	    	 						+"<label>Winner:</label>"+" "+'<input type="radio" name="'+store[index]+' value="'+store[index]+'"><label>'+store[index]+'</label>'+" "+ 
	    	 						'<input type="radio" name="'+store[index]+' value="'+store[index+1]+'"><label>'+store[index+1]+'</label>';
	    	 
			    	 				display.append(games);
			    	}
			    });
			  }

			if (length % 2 !== 0){
			    	store.push("buy");
		    		store.sort((a, b)=> 0.5 - Math.random());
				
			    	store.map((val,index) => {

		    	 	if (index % 2 === 0 || index === 0){
		    	 		counter += 1;
		    	 		
			    	 	let games ="<h3>"+"Game"+" "+counter+"</h3>"+
	    	 						"<p>"+ store[index] +" "+ "v"+ " "+store[index + 1] + "</p>"
	    	 						+"<label>Winner:</label>"+" "+'<input type="radio" name="'+store[index]+' value="'+store[index]+'"><label>'+store[index]+'</label>'+" "+ 
	    	 						'<input type="radio" name="'+store[index]+' value="'+store[index+1]+'"><label>'+store[index+1]+'</label>';
			    	 				display.append(games);
			    	}
			     });
			}
			    	  
		} else document.getElementById('error').innerHTML="Please enter players names";
	}


	


	addPlayer.on("click",(event) => {
		 event.preventDefault();
		if( input.val() !== ""){
			store.push(input.val());
			let count= 0;

		 	let item = input.val();
		 	let li = "<li>" + item + "</li>";
		 	list.append(li);
		 	input.val("");
		 	console.log(store);
		}
		
	});

	startGame.on("click",(event) => {
		let round ="<h1>"+"Round One"+"</h1>"+
		$(this).off('click'); 
		event.preventDefault();
			return shuffle(store);
	
	

	});

	document.getElementById("display").innerHTML = store;



});
