Whats gucci

Refactor yelpCamp version 1.0

Video 321 - Dynamic Price Feature
SKIP
Next Video: DEploy yelpCAmp to Heroku

To deploy to Heroku, make sure Heroku is installed (homebrew)

make sure code is up to date on git
  heroku CREATE
  git push heroku master

HOW TO CONNECT MONOGDB TO Heroku

  switch from local host to Mlab.com
  paste mongoURI below the connect statement in app.js
    create a DB user for access to DB

Monday Jan 22
Lecture 334

 need to make the deployment code on heroku use a different database
then our development code (dont want to be pushing to the same db (testing vs deplyment))

Make deployment code use local instance of mongodb (uncomment connect line/ comment out mongoURI)

Environment variables - vars that change depending on the Environment they app is running on(heroku vs localhost)
