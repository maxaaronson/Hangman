 var app = angular.module('myApp', []);
        app.controller('ctrl', function($scope) {
        
		//intitial setup
		$scope.remaining = 13;
        $scope.guesses = 0;
        $scope.tried = "";
		var wordList = [];
		var text;
	
	
		function FileHelper() {}
		{
        FileHelper.readStringFromFileAtPath = function (pathOfFileToReadFrom) {
            var request = new XMLHttpRequest();
            request.open("GET", pathOfFileToReadFrom, false);
            request.send(null);
            var returnValue = request.responseText;

            return returnValue;
			}
		}

		//random_letter = String.fromCharCode(97 + Math.floor(Math.random() * 26));
		
		
		//path =  "../resources/"+random_letter.toUpperCase()+" Words.txt" 
		text = FileHelper.readStringFromFileAtPath ("../resources/animal_names.txt");
		wordList = (text.split("\r\n"));

		
		// randomly pick a word
		l =  wordList.length;
		
		random = Math.floor(Math.random()*l);	
		$scope.word = wordList[random];
        $scope.wordArray = [];
        $scope.wordString = "";
        
        for (i=0; i<$scope.word.length; i++){
            $scope.wordArray[i] = "_"; 
        }
        
        buildWordString();
        
        function buildWordString(){
            $scope.wordString = "";
            for (i=0; i<$scope.word.length; i++){
                $scope.wordString += " " + $scope.wordArray[i];
            }  
        }
       
		
        $scope.person = 
            ["****",
            "******",
            "******",
             "****",
    "******************",
            "**",
            "**",
            "**",
            "**",
            "*",
           "*",
          "*",
         "*"];
         
         $scope.hangman = [];
        
		// called when user makes a guess
        $scope.newGuess = function (letter) {
        
            document.getElementById('form').value='';
            
            if (!(letter.length == 1 && letter.match(/[a-z]/i))){
                alert("Not a valid guess!");
                return;
                }
            
            isCorrect = checkLetter(letter);
            if (isCorrect){
                buildWordString();
                won = checkIfWon();
                if (won){
					document.getElementById('bottom_text').innerHTML = $scope.word;
                    again = confirm("You Win!\nPlay again?");
                    if (again){
                        location.reload();
                    }
                }
            }
            else {
                
                $scope.remaining--;
                $scope.tried += letter;
                $scope.guesses++;
                $scope.hangman[$scope.guesses-1] = $scope.person[$scope.guesses-1];
                if ($scope.remaining == 0){
					document.getElementById('bottom_text').innerHTML= $scope.word;
                    again = confirm("Game Over!\nPlay again?");
                    if (again){
                        location.reload();
                    }
                }
            }
        }
        
        function checkLetter(letter){
            isCorrect = false;
            for (i = 0; i<$scope.word.length; i++){
                if ( $scope.word.charAt(i) == letter ){
                    $scope.wordArray[i] = letter;
                    isCorrect = true;
                }
            }
            return isCorrect;
        }
        
        function checkIfWon(){
            for (i=0; i<$scope.word.length; i++){
                if ($scope.wordArray[i] == "_"){
                    return false;
                    }
               }
            return true;
        }
    });

    
    