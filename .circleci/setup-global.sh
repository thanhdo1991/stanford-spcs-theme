# Install heroku
sudo apt-get update
sudo apt-get -y install software-properties-common
sudo add-apt-repository "deb https://cli-assets.heroku.com/branches/stable/apt ./"
curl -L https://cli-assets.heroku.com/apt/release.key | sudo apt-key add -
sudo apt-get install apt-transport-https
sudo apt-get update
sudo apt-get install heroku

# Login heroku
cat > ~/.netrc << EOF
machine api.heroku.com
  login $HEROKU_EMAIL
  password $HEROKU_TOKEN
machine git.heroku.com
  login $HEROKU_EMAIL
  password $HEROKU_TOKEN
EOF

chmod 600 ~/.netrc
