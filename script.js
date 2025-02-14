const countries = [
    "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria", 
    "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", 
    "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cabo Verde", 
    "Cambodia", "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo", 
    "Democratic Republic of Congo", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", 
    "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", 
    "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", 
    "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", 
    "Israel", "Italy", "Ivory Coast", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "North Korea", "South Korea", 
    "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", 
    "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", 
    "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", 
    "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Macedonia", "Norway", "Oman", "Pakistan", "Palau", 
    "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia", "Rwanda", 
    "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", 
    "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", 
    "Somalia", "South Africa", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria", "Taiwan", 
    "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", 
    "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Vanuatu", 
    "Vatican City", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"
  ]

const header = document.querySelector("#header")
const body = document.querySelector("#bodytext")
const playbutton = document.querySelector("#playbutton")
const startbutton = document.querySelector("#startbutton")
const enterguessarea = document.querySelector("#enterguessarea")
const guesstxt = document.querySelector("#guesstxt")
let round = 1
let score = 0
let scorepenalty = 0
let word = randomCountry()
let availpos = posCalc(word)
let revealedpos = []

hideGuessElements()

playbutton.addEventListener("click", function() {
  body.scrollIntoView({behavior: "smooth"})
  console.log("scrolling")
})

startbutton.addEventListener("click", startRound)

function startRound() {
  changeBody()
  header.innerHTML = `<h1>What in the World??</h1>
                      <h2 id="tagline">Guess the nation, letter by letter!</h2>`
  body.innerHTML = `<h3>ROUND ${round}</h3>
                    <h3>Guess the Country</h3>
                    <p id="score">Score: ${score}</p>`
  enterguessarea.innerHTML = `<input type="text" id="guessval" placeholder="Enter your guess">
                              <button id="guessbtn">Enter Guess</button>
                              <p id="guessoutput"></p>
                              <button class="exitbtn">EXIT</button>`
  guesstxt.innerHTML = `<h2>${censorWord(word, revealedpos)}</h2>`
  console.log(word)

  const mainexitbtn = document.querySelector(".exitbtn")
  const guessVal = document.querySelector("#guessval")
  const guessbtn = document.querySelector("#guessbtn")
  const guessoutput = document.querySelector("#guessoutput")

  mainexitbtn.addEventListener("click", function() {
    location.reload()
  })

  guessbtn.addEventListener("click", function() {

    if (guessVal.value.toLowerCase() === word.toLowerCase()) {
      score += (word.length - scorepenalty)
      body.innerHTML = `<h3>ROUND ${round}</h3>
                      <h3>The answer was....</h3>
                      <h2 id="lossword">${word}</h2>
                      <h3>Score: ${score}</h3>
                      <button id="newroundbtn">New Round</button>
                      <button class="exitbtn">EXIT</button>
                      <p>Great Job!</p>`
      guesstxt.innerHTML=``
      enterguessarea.innerHTML = ``
      round += 1

      const newroundbtn = document.querySelector("#newroundbtn")
      const exitbtn = document.querySelector(".exitbtn")

      newroundbtn.addEventListener("click", function() {
        word = randomCountry()
        availpos = posCalc(word)
        revealedpos = []
        startRound()
      })

      exitbtn.addEventListener("click", function() {
        location.reload()
      })
    } else {
      posRevealCalc(availpos, revealedpos)
      guesstxt.innerHTML = `<h2>${censorWord(word, revealedpos)}</h2>`
      if (spaceElim(guesstxt.textContent).toLowerCase() === spaceElim(word).toLowerCase()) {
        body.innerHTML = `<h3>ROUND ${round}</h3>
                    <h3>The answer was....</h3>
                    <h2 id="victword">${word}</h2>
                    <h3>Score: ${score}</h3>
                    <button id="newroundbtn">New Round</button>
                    <button class="exitbtn">EXIT</button>
                    <p>Better luck next time!</p>`
        guesstxt.innerHTML=``
        enterguessarea.innerHTML = ``
        round += 1

        const newroundbtn = document.querySelector("#newroundbtn")
        const exitbtn = document.querySelector(".exitbtn")

        newroundbtn.addEventListener("click", function() {
          word = randomCountry()
          availpos = posCalc(word)
          revealedpos = []
          startRound()
        })

        exitbtn.addEventListener("click", function() {
          location.reload()
        })
      } else {
        guessoutput.textContent = "Incorrect! A random letter revealed!"
        scorepenalty += 1
        //hideGuessOutput() - //make sure to uncomment after proper css - transition: opacity 1s;
      }
    }
    guessVal.value = ""
  })
}

function censorWord(str, arr) {
  let result = ""
  for (let i=0; i<str.length; i++) {
    if (str[i] === " ") {
      result += "&nbsp;&nbsp;"
    } else if (arr.includes(i)) {
      result += word[i] + " "
    }
    else {
      result += "_ "
    }
  }
  return result
}

function randomCountry() {
  let cindex = Math.floor(Math.random() * countries.length)
  return countries[cindex]
}

function posCalc(str) {
  let arr = []
  for (let i=0; i<str.length; i++) {
    if (!(str[i] === " ")) {
      arr.push(i)
    } else {
      continue
    }
  } 
  return arr
}

function posRevealCalc(arr1, arr2) { //arr1 = available pos, arr2 = revealed pos
  let reveal = randPos(arr1)
  while (arr2.includes(reveal)) {
    reveal = randPos(arr1)
  }
  revealedpos.push(reveal)
}

function randPos(arr) {
  let index = Math.floor(Math.random() * arr.length)
  let result = arr[index]
  return result
}

function spaceElim(str) {
  let res = ""
  for (let i=0; i<str.length; i++)
    if (str[i] === " ") {
      continue
    } else {
      res += str[i]
    }
  return res
}

function hideGuessOutput() {
  guessoutput.style.opacity = "0"
}

function changeBody() {
  // body.style.backgroundColor = "lightgreen"
  enterguessarea.style.display = "block"
  guesstxt.style.display = "block"
  body.style.height = "50vh"
  // body.style.backgroundImage = "none"
}

function hideGuessElements() {
  enterguessarea.style.display = "none"
  guesstxt.style.display = "none"
}