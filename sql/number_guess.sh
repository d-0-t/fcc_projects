#!/bin/bash

PSQL="psql --username=freecodecamp --dbname=number_guess -t --no-align -c"

# Generate secret number
SECRET_NUMBER=$(( RANDOM % 1000 + 1 ))

echo "Enter your username:"
read USERNAME

# Get user info
USER_ID=$($PSQL "SELECT user_id FROM users WHERE username='$USERNAME'")

if [[ -z $USER_ID ]]
then
  # New user
  echo "Welcome, $USERNAME! It looks like this is your first time here."
  INSERT_USER_RESULT=$($PSQL "INSERT INTO users(username) VALUES('$USERNAME')")
  USER_ID=$($PSQL "SELECT user_id FROM users WHERE username='$USERNAME'")
else
  # Returning user
  GAMES_PLAYED=$($PSQL "SELECT COUNT(*) FROM games WHERE user_id=$USER_ID")
  BEST_GAME=$($PSQL "SELECT MIN(guesses) FROM games WHERE user_id=$USER_ID")
  
  echo "Welcome back, $USERNAME! You have played $GAMES_PLAYED games, and your best game took $BEST_GAME guesses."
fi

echo -e "\nGuess the secret number between 1 and 1000:"
GUESS_COUNT=0

PLAY_GAME() {
  if [[ $1 ]]
  then
    echo -e "\n$1"
  fi

  read USER_GUESS
  ((GUESS_COUNT++))

  # Check if integer
  if [[ ! $USER_GUESS =~ ^[0-9]+$ ]]
  then
    PLAY_GAME "That is not an integer, guess again:"
  # If the user guessed correctly, they win
  elif [[ $USER_GUESS -eq $SECRET_NUMBER ]]
  then
    INSERT_GAME_RESULT=$($PSQL "INSERT INTO games(user_id, guesses) VALUES($USER_ID, $GUESS_COUNT)")
    echo "You guessed it in $GUESS_COUNT tries. The secret number was $SECRET_NUMBER. Nice job!"
  # If the number is lower/higher, tell the user
  elif [[ $USER_GUESS -gt $SECRET_NUMBER ]]
  then
    PLAY_GAME "It's lower than that, guess again:"
  else
    PLAY_GAME "It's higher than that, guess again:"
  fi
}

PLAY_GAME