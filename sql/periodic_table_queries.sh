#!/bin/bash
# A program to get information about periodic table elements

# Log into the database and connect
PSQL="psql --username=freecodecamp --dbname=periodic_table -t --no-align -c"
# 
# If no argument (element) is provided, show a message
if [[ -z $1 ]]
then
  echo "Please provide an element as an argument."
else
  # Match the element based on atomic number, name or symbol
  ELEMENT_DATA=$($PSQL "SELECT atomic_number, name, symbol, type, atomic_mass::FLOAT, melting_point_celsius, boiling_point_celsius FROM elements JOIN properties USING(atomic_number) JOIN types USING(type_id) WHERE atomic_number::TEXT = '$1' OR symbol = '$1' OR name = '$1'")

  # If an element is not found, tell the user
  if [[ -z $ELEMENT_DATA ]]
  then
    echo "I could not find that element in the database."
  else
    # If found, return the element properties
    echo "$ELEMENT_DATA" | while IFS="|" read ATOMIC_NUMBER NAME SYMBOL TYPE MASS MELTING BOILING
    do
      echo "The element with atomic number $ATOMIC_NUMBER is $NAME ($SYMBOL). It's a $TYPE, with a mass of $MASS amu. $NAME has a melting point of $MELTING celsius and a boiling point of $BOILING celsius."
    done
  fi
fi