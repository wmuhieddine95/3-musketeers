# Currency

#Overview
This project converts currencies from/to in addition to BTC Currency.(Bit Coins)

The user deals with cli.js where the default values are set and initialized. (amount,from,to)
Default values are (1,'USD','BTC')
Once command line is launched ora Library launches the loading waiting for result in async method.
As defined in package.json the Main is index.js so it is launched with the given parameters or the defaults one.
Once the result is returned by index.js, it is written on the command line after ora is stopped.

#index.js
Simply it uses the money Library to convert from currency to another based on the given amount
Rates are found in RATES_URL. But since this project is compatible with BTC which is not found in RATES_URL,
we are in need to get the rates of BTC compared to the other currency based on the BLOCKCHAIN_URL
then we append the extracted new rate to our Rates list from RATES_URL and swap the from/to
because BLOCKCHAIN_URL works opposite to the user's from/to order.

#index.test.js
Affords the project with the needed Unit_Testing to make sure the project is working defined

 
