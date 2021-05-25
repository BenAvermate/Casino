#this was a (not so complete) demo of craps I made in python on the train.

#https://towardsdatascience.com/run-python-code-on-websites-exploring-brython-83c43fb7ac5f
#https://stackoverflow.com/questions/7460938/how-to-run-python-script-in-webpage
#https://www.digitalocean.com/community/tutorials/how-to-set-up-an-apache-mysql-and-python-lamp-server-without-frameworks-on-ubuntu-14-04
#!/usr/bin/env python
import sys
import random

#https://en.wikipedia.org/wiki/Craps#:~:text=The%20fundamental%20bet%20in%20craps,as%20%22crapping%20out%22).

#to implement:
    #full rules
    #pot
    #changeable bets
#improvements

#dice-functions=================================================
def dice():
    return [random.randrange(1,7),random.randrange(1,7)]
def sumDice(roll):
    return sum(roll)

#bets==========================================================
#1=win
#0=tie
#-1=loss
#-2=stay point
#other number is point
def checkStartBet(TempBet):
    if TempBet=="PL":
        return Bet
    elif TempBet=="DPL":
        return DBet
    else:
        print("Invalid bet\nAcceptable bets are PL and DPL")
        sys.exit()

def checkGameBet(TempBet):
    if TempBet=="CB":
        return Bet
    elif TempBet=="DCB":
        return DBet
    else:
        print("Invalid bet\nAcceptable bets are CB and DCB")
        sys.exit()

def Bet(result):
    switch = {
        2: -1,
        3: -1,
        4: 4,
        5: 5,
        6: 6,
        7: 1,
        8: 8,
        9: 9,
        10: 10,
        11: 1,
        12: -1
    }
    return switch.get(result,"Invalid roll")

def DBet(result):
    switch = {
        2: 1,
        3: 1,
        4: 4,
        5: 5,
        6: 6,
        7: -1,
        8: 8,
        9: 9,
        10: 10,
        11: -1,
        12: 0
    }
    return switch.get(result,"Invalid roll")

def Point(roll):
    if roll==7:
        return -1
    elif point==roll:
        return 1
    else:
        return -2

def DPoint(roll):
    if roll==7:
        return 1
    elif point==roll:
        return -1
    else: 
        return -2
#==============================================================
ended=False
if len(sys.argv)>1:
    bet=checkStartBet(sys.argv[1])
else:
    #repeat every throw until bet is placed or game over
    print("No bet placed")
    while not "bet" in globals() and not ended:
        roll=dice()
        roll=sumDice(roll)
        print(roll)
        if roll==2 or roll==3 or roll==7 or roll==11 or roll==12:
            print("Game ended")
            ended=True
        else:
            tempBet=input("Bet?\n")
            if tempBet:
                bet=checkGameBet(tempBet)


while not ended:
    roll = dice()
    roll=sumDice(roll)
    print(roll)
    outcome=bet(roll)
    
    if outcome == -2:
        print("Keep rolling")
    elif outcome == -1:
        print("You Lose!")
        ended=True
    elif outcome == 0 :
        print("Tie!")
        ended=True
    elif outcome == 1:
        print("You Win!!!")
        ended=True
    else:
        print(f"Point= {outcome}")
        if bet == Bet:
            bet=Point
        else:
            bet=DPoint
        point=outcome
