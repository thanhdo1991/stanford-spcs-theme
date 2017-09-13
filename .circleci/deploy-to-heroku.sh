#!/bin/bash
git config --global user.email "$HEROKU_EMAIL"
git config --global user.name "Circle CI"

echo "machine api.heroku.com
          login $HEROKU_EMAIL
          password $HEROKU_TOKEN
        machine git.heroku.com
          login $HEROKU_EMAIL
          password $HEROKU_TOKEN" >> ~/.netrc
chmod 600 ~/.netrc
"[[ ! -s \"$(git rev-parse --git-dir)/shallow\" ]] || git fetch --unshallow"

if [ $CIRCLE_BRANCH == $GIT_BRANCH_DEPLOY ]
then
  # Variables
  txtgrn=$(tput setaf 2) # Green
  txtrst=$(tput sgr0) # Text reset.

  COMMIT_MESSAGE="Deploy by $(git config --get user.name), $(git rev-parse --abbrev-ref HEAD) ($(git rev-parse --short HEAD))"

  # If the Pantheon git directory does not exist.
  if [ ! -d ".heroku" ]
  then
    # Clone the Pantheon repoa
    echo -e "\n${txtgrn}Cloning Heroku repository ${txtrst}"
    heroku git:clone -a $HEROKU_APP_NAME .heroku --ssh-git
  else
    echo -e "\n${txtgrn}Pull latest from Heroku ${txtrst}"
    git -C .heroku pull
  fi

  echo -e "\n${txtgrn}Applying new changes to Heroku repo ${txtrst}"
  mkdir -p .heroku/public
  mkdir -p .heroku/public/css
  mkdir -p .heroku/public/fonts
  mkdir -p .heroku/public/images
  mkdir -p .heroku/public/js

  rsync -a --delete "pattern-lab/public/" ".heroku/public/"
  rsync -a "css/" ".heroku/public/css/"
  rsync -a "fonts/" ".heroku/public/fonts/"
  rsync -a "images/" ".heroku/public/images/"
  rsync -a "js/" ".heroku/public/js/"

  # Move into the heroku repo to apply changes.
  cd .heroku
  pwd
  git add -A
  git commit -m"$COMMIT_MESSAGE"
  git branch
  git remote -v
  echo -e "\n${txtgrn}Pushing the master branch to Heroku ${txtrst}"
  git push heroku master --force
fi
