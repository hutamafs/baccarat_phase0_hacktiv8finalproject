const type = ['spades','hearts','clubs','diamonds'];
const card = [1,2,3,4,5,6,7,8,9,10,11,12,13];
var userChoice = '';    
var initiationValue = 1000;
var betting = 0;
var output

 function deckKartu(a,b){
    let deck = [];
    for(let i = 0 ; i<a.length ; i++) {
        for(let j = 0 ; j<b.length ; j++) {
            let temp = ''
            temp = b[j]+'_of_'+a[i]+'.png'
            deck.push(temp);
        }
    } return deck;
}

function ambilKartu (a) {
    let table = [];
    for(let i = 0 ; i<6 ; i++) {
        let taken = Math.floor(Math.random()*(52)); // asumsi ga bisa duplikat
        table.push(a[taken]);        
    }
    return table; 
}

var cards = {};

function createCard (array) {
    cards.p1 = array[0];
    cards.b1 = array[1];
    cards.p2 = array[2];
    cards.b2 = array[3];
    cards.p3 = array[4];
    cards.b3 = array[5];
}

function playerFirstPull (input1,input2) {
    let temp1 = '';
    for(let i = 0 ; i<2 ; i++) {
        if(input1[i] == '_') {
            break;
        }
        temp1 += input1[i];
    }
    let kartu1 = Number(temp1);
    if(kartu1>=10) {
        kartu1 = 0;
    }

    let temp2 = '';
    for(let i = 0 ; i<2 ; i++) {
        if(input2[i] == '_') {
            break;
        }
        temp2 += input2[i];
    }
    let kartu2 = Number(temp2);
    if(kartu2>=10) {
        kartu2 = 0;
    }
   
    let total = kartu1 + kartu2;
    if(total>=10) {
        return total%10;
    } else if(total<10) {
        return total;
    }
}

function bankerFirstPull (firstCard,secondCard) {
    let temp1 = '';
    for(let i = 0 ; i<2 ; i++) {
        if(firstCard[i] == '_') {
            break;
        }
        temp1 += firstCard[i];
    }
    let kartu1 = Number(temp1);
    if(kartu1>=10) {
        kartu1 = 0;
    }

    let temp2 = '';
    for(let i = 0 ; i<2 ; i++) {
        if(secondCard[i] == '_') {
            break;
        }
        temp2 += secondCard[i];
    }
    let kartu2 = Number(temp2);
    if(kartu2>=10) {
        kartu2 = 0;
    }

    let total = kartu1 + kartu2;
    if(total>=10) {
        return total%10;
    } else if(total<10) {
        return total;
    }
}

function flopCard(user,ai) {
    let pNatural = 'PLAYER NATURALLY WIN';
    let bNatural = 'BANKER NATURALLY WIN';
    let bWin = 'BANKER WIN';
    let pWin = 'PLAYER WIN';
    let tie = 'TIE'
    if(user == 6 || user == 7) {
        if(ai<user) {
            return pWin;
        } else if (ai == user) {
            return tie;
        } else if (ai > user) {
            return bWin
        }
    } else if (user == 8 || user == 9 || ai == 8 || ai == 9) {
        if(ai<user) {
            return pNatural;
        } else if (ai == user) {
            return tie;
        } else if (ai > user) {
            return bNatural;
        }
    }        
}

function changeFirstRoundCard (orang1,bank1,orang2,bank2) {
    let player1 = ('cardimages/PlayingCards/' + orang1);
    let banker1 = ('cardimages/PlayingCards/' + bank1);
    let player2 = ('cardimages/PlayingCards/' + orang2);
    let banker2 = ('cardimages/PlayingCards/' + bank2);

    return [player1,banker1,player2,banker2]
}
function changePicture(first,second,third,fourth) {    
    helpChanging(".p1",first,1000);   
    helpChanging(".b1",second,2000);    
    helpChanging(".p2",third,3000);    
    helpChanging(".b2",fourth,4000);
}

function resetPicture() {
    let resetKartu = document.getElementsByClassName("card");
    for(let i = 0 ; i<resetKartu.length ; i++) {
        resetKartu[i].setAttribute("src",'cardimages/cardback.png');
    }
}

//ubah kartu player ke-3
function playerThirdCard(input3) {
    let temp3 = '';
    for(let i = 0 ; i<2 ; i++) {
        if(input3[i] == '_') {
            break;
        }
        temp3 += input3[i];
    }
    let kartu3 = Number(temp3);
    if(kartu3>=10) {
        kartu3 = 0;
    }
    return kartu3;
}

//ubah kartu banker ke-3
function bankerThirdCard(thirdCard) {
    let temp3 = '';
    for(let i = 0 ; i<2 ; i++) {
        if(thirdCard[i] == '_') {
            break;
        }
        temp3 += thirdCard[i];
    }
    let kartu3 = Number(temp3);
    if(kartu3>=10) {
        kartu3 = 0;
    }
    return kartu3;
}

function lastCard(player,banker,pfinal,bfinal) {
    let playerWin = "PLAYER WIN"
    let bankerWin = "BANKER WIN"
    let pNatural = "PLAYER NATURALLY WIN";
    let bNatural = "BANKER NATURALLY WIN";
    let draw = "TIE";

    if (0<=player && player<=5) {
        let totalPlayer = (player+pfinal) % 10;

        if(7<=banker && banker<=9) { // banker ga pull
            if(totalPlayer>banker) {
                return playerWin;
            } else if (totalPlayer<banker) {
                return bankerWin;
            } else if (totalPlayer == banker) {
                return draw;
            }
        } else if (0<=banker && banker<=2) { // banker pull
            console.log(`masuk jalur 2`)
            let totalBanker = (banker+bfinal) % 10;
            if(totalPlayer>totalBanker) {
                return playerWin;
            } else if (totalPlayer == totalBanker) {
                return draw;
            } else if (totalPlayer < totalBanker) {
                return bankerWin;
            }
        } else if (banker == 3) {
            console.log(`masuk jalur 3`)
            if(0<=totalPlayer<=7 || totalPlayer == 9) {
                let totalBanker = (banker+bfinal) % 10;
                if(totalPlayer>totalBanker) {
                    return playerWin;
                } else if (totalPlayer == totalBanker) {
                    return draw;
                } else if (totalPlayer < totalBanker) {
                    return bankerWin;
                }
            } else if (totalPlayer == 8) {
                return playerWin;
            }
        } else if (banker == 4) {
            console.log(`masuk jalur 4`)
            if(2 <=totalPlayer && totalPlayer <= 7) {
                let totalBanker = (banker+bfinal) % 10;
                if(totalPlayer>totalBanker) {
                    return playerWin;
                } else if (totalPlayer == totalBanker) {
                    return draw;
                } else if (totalPlayer < totalBanker) {
                    return bankerWin;
                }
            } else if (totalPlayer == 0 ||totalPlayer == 1 ) {
                return bankerWin;
            } else if (totalPlayer == 8 || totalPlayer == 9) {
                return playerWin;
            }
        } else if (banker == 5) {
            console.log(`masuk jalur 5`)
            if(4 <=totalPlayer<= 7) {
                let totalBanker = (banker+bfinal) % 10;
                if(totalPlayer>totalBanker) {
                    return playerWin;
                } else if (totalPlayer == totalBanker) {
                    return draw;
                } else if (totalPlayer < totalBanker) {
                    return bankerWin;
                }
            } else if (0 <= totalPlayer && totalPlayer <= 3) {
                return bankerWin;
            } else if (totalPlayer == 8 || totalPlayer == 9) {
                return playerWin;
            }
        } else if (banker == 6) {
            console.log(`masuk jalur 6`)
            if(totalPlayer == 6 || totalPlayer == 7) {
                let totalBanker = (banker+bfinal) % 10;
                if(totalPlayer>totalBanker) {
                    return playerWin;
                } else if (totalPlayer == totalBanker) {
                    return draw;
                } else if (totalPlayer < totalBanker) {
                    return bankerWin;
                }
            } else if (0 <= totalPlayer && totalPlayer <= 5) {
                return bankerWin;
            } else if (totalPlayer == 8 || totalPlayer == 9) {
                return playerWin;
            }
        }          
    }
}

function changeSecondRoundCard (orang3,bank3) {
    let player3 = ('cardimages/PlayingCards/' + orang3);
    let banker3 = ('cardimages/PlayingCards/' + bank3);
    return [player3,banker3]
}

function callThirdCard() {
    let secondRound = changeSecondRoundCard(cards.p3,cards.b3);
    flipCard(secondRound[0],secondRound[1]);
}
function flipCard (fifth,sixth) {
    helpChanging(".p3",fifth,6000);
    helpChanging(".b3",sixth,7000);
}

function helpChanging(string,behind,time) {    
    setTimeout(function(){
        document.querySelector(string).setAttribute("src",behind);
    },time)
}

function callEverything(t,c) {
    if(!userChoice) {
        document.querySelector("h1").innerText = 'PLACE YOUR BETS';
        return 
    } 

    let playingCard = deckKartu(t,c);
    let cardOnTable = ambilKartu(playingCard);
    createCard(cardOnTable);

    //pengubahan gambar
    let firstRound = changeFirstRoundCard(cards.p1,cards.b1,cards.p2,cards.b2);

    changePicture(firstRound[0],firstRound[1],firstRound[2],firstRound[3]);    

    //perhitungan menang kalah ronde 1
    let playerFirstRound = playerFirstPull(cards.p1,cards.p2);
    let bankerFirstRound = bankerFirstPull(cards.b1,cards.b2);

    flopCard(playerFirstRound,bankerFirstRound);
    let result1 = flopCard(playerFirstRound,bankerFirstRound); 
    
    let playerAdditionalCard = playerThirdCard(cards.p3);
    let bankerAdditionalCard = bankerThirdCard(cards.b3);
    
    let totalPlayer = (playerFirstRound+playerAdditionalCard) % 10;
    let totalBanker = (bankerFirstRound+bankerAdditionalCard) % 10;

    console.log(totalPlayer);
    console.log(totalBanker);

    if(result1 == undefined) {
        callThirdCard();
       output = lastCard(playerFirstRound,bankerFirstRound,playerAdditionalCard,bankerAdditionalCard)
       setTimeout(function(){
            document.querySelector("h1").innerText = output;
            document.getElementById("playerScore").innerText = totalPlayer;
            document.getElementById("bankerScore").innerText = totalBanker;
            bettingResult();
        },8000);
        setTimeout(function() {
            resetPicture();
            document.querySelector("h1").innerText = 'PLACE YOUR BETS';
            document.getElementById("playerScore").innerText = 0;
            document.getElementById("bankerScore").innerText = 0;
        },10000);

    } else if(result1 != undefined) {
        output = result1;
        setTimeout(function() {
            document.querySelector("h1").innerText = output;
            document.getElementById("playerScore").innerText = playerFirstRound;
            document.getElementById("bankerScore").innerText = bankerFirstRound;
            bettingResult();
        },6000);
        setTimeout(function() {
            resetPicture();
            document.querySelector("h1").innerText = 'PLACE YOUR BETS';
            document.getElementById("playerScore").innerText = 0;
            document.getElementById("bankerScore").innerText = 0;
        },8000);
    }
}

function bettingResult () {
    //milih pb
    if(!userChoice) {
        document.querySelector("h1").innerText = 'PLACE YOUR BETS';
    } else{
        if(userChoice == output[0]) {
            initiationValue += betting;
        } else if (userChoice != output[0]) {
            initiationValue -= betting;
        }       
        betting = 0;
        document.getElementById("balance").innerText = initiationValue;
        updateBetting();
        userChoice = ''
        document.getElementById("option1").classList.remove("focus");
        document.getElementById("option2").classList.remove("focus");
    }
}
document.getElementById("main").addEventListener("click",function() {
    playAudio();
    callEverything(type,card);      
});

document.getElementById("reset").addEventListener("click",function() {
    console.log(`reset`);
    location.reload(); 
});

function playAudio() {
    document.getElementById("cardShuffle").play();
}
 
function choosePlayer () {
    userChoice = 'P'
    document.getElementById("option1").classList.add("focus");
    document.getElementById("option2").classList.remove("focus");
}
function chooseBanker () {
    userChoice = 'B';
    document.getElementById("option2").classList.add("focus");
    document.getElementById("option1").classList.remove("focus");
}
function lima () {
    betting += 5;
}
function duaLima () {
    betting += 25;
}
function limaPuluh () {
    betting += 50;
}
function seratus() {
    betting +=100
}

function updateBetting() {
    document.getElementById("bet").innerText = betting;
}

//load semua klik
window.onload = function() {
       document.getElementById("option1").addEventListener("click",function() {
        choosePlayer();
    });
    document.getElementById("option2").addEventListener("click",function() {
        chooseBanker();
    });
    document.getElementById("five").addEventListener("click",function() {
        lima();
        updateBetting()
    });
    document.getElementById("twentyfive").addEventListener("click",function() {
        duaLima();  
        updateBetting()
    });
    document.getElementById("fifty").addEventListener("click",function() {
        limaPuluh();
        updateBetting()  
    });
    document.getElementById("hundred").addEventListener("click",function() {
        seratus();
        updateBetting() 
    });

    document.getElementById("bet").innerText = betting;
}



// 1. terima dulu mau pasang brp v
// 2. terima klik an ny mau d banker ato player v
// 3. start game ny 
// 4. cocokin gameny sama pilihan user ny , banker ato player v
// 5. pas lagi flip kartu ny , keluar kartu itu valueny brp 

 
// cara buat flip apakah harus siapin 2 picture di 1 html
// cara supaya bettingan nya cocok
// cara atur text di sebelah kanan bawah

