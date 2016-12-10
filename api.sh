#! /bin/bash

cd "$(dirname "$0")"

# Config
DB_USER="usuario"      # "$AGENDA_DB_USER"
DB_PASS="password"     # "$AGENDA_DB_PASS"

# Check requirements
requires() {
  if [ ! -x "$(command -v $1)" ]; then
    echo "$1 is not installed. Try:"
    echo -e "\n\thttps://www.google.es/search?q=how+to+install+$1+ubuntu\n"
    exit 0
  fi
}

install_api() {
  echo "Installing packages..."

  npm install

  if [ "$?" == "0" ]; then
    echo "All done!"
  fi
}

create_database() {
  echo -e "\nCreating database..."

  # Using an existing user
  psql -a -f sql/createdb.sql

  # Create a specific user
  psql -c "create user $DB_USER with password '$DB_PASS';"
  psql -c "grant all privileges on database agenda to $DB_USER;"
  psql -d agenda -c "grant all privileges on table islas to $DB_USER;"
  psql -d agenda -c "grant all privileges on table municipios to $DB_USER;"
  psql -d agenda -c "grant all privileges on table espaciosagenda to $DB_USER;"
  psql -d agenda -c "grant all privileges on table agendacultural to $DB_USER;"

  if [ "$?" == "0" ]; then
    echo "All done!"
  fi
}

show_help() {
  echo -e "Agenda Cultural API: PostgreSQL RESTful API with Node.js.\n"
  echo -e "Usage: api [options]\n"
  echo -e "Options:"
  echo "  install     Install and configure api"
  echo "  run         Run api"
  echo "  help        Print help"
  exit 0
}

# MAIN

# Check requirements
requires npm
requires postgres

while [ "$1" != "" ]; do
  case "$1" in
    install)
      install_api
      create_database
      ;;
    run)
      npm start
      ;;
    help)
      show_help
      ;;
    *)
      echo -e "$0: unknown argument '$1'.\nRun '$0 help' for usage."
      exit 0
      ;;
  esac
  shift
done
