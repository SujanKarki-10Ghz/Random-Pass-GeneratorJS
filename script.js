const lengthSlider = document.querySelector(".pass-length input"),
options = document.querySelectorAll(".option input"),
 passwordInput = document.querySelector(".input-box input"),
generateBtn = document.querySelector(".generate-btn");

const characters = {
    lowercase : "abcdefghijklmnopqrstuvwxyz",
    uppercase :"ADBCDEFGHIJKLMNOPQRSTUVWXYZ",
    numbers :"0123456789",
    symbols : "^!$%&|[](){}:;.,*+-#@<>~",
}

const generatePassword = ()=>{
    let staticPassword ="",
    randomPassword ="",
    excludeDuplicate = false,
    passLength= lengthSlider.value;
    options.forEach((option)=>{
        if(option.checked){
            //if checkbox id isn't ex-duplicate && spaces
            if(option.id!=="exc-duplicate" && option.id!=="spaces"){
                //adding particular key value from character object to static password
                staticPassword+= characters[option.id];
            }else if(option.id ==="spaces"){// if checkbox id is spaces
                staticPassword+=`  ${staticPassword}  `; //adding spaces at the begining & end of static password
            }else{ //else pass true value to excludeDuplicate
                excludeDuplicate = true;
            }
        }
    })
    for(let i=0; i< passLength; i++){
        // getting random char from static password
        let randomChar =staticPassword[Math.floor(Math.random()* staticPassword.length)];
        if(excludeDuplicate){ //if exclude duplicate is true
            // if randomPassword doesn't contains the current random character or randomChar is equal
            // to space then add randomChar to random password else decrement i by -1
            !randomPassword.includes(randomChar) || randomChar == " "? randomPassword +=randomChar: i--;
        }else{ //else add randomchar to the randomPassword
            randomPassword+=randomChar; 
        }
    }
    // console.log(randomPassword);
    passwordInput.value = randomPassword; //passing randomPassword to passwordInput value
}

const updateSlider = ()=>{
    //passing slider value as counter text
    document.querySelector(".pass-length span").innerText = lengthSlider.value;
    generatePassword();
}
updateSlider();

lengthSlider.addEventListener("input", updateSlider);
generateBtn.addEventListener("click", generatePassword);