# This is a URL Shortener app.

Put a correct url, and it will save it on the database and it will give a new address to be redirected to.
[Live version](https://urled.herokuapp.com)

##Features:
1. If you give the program a URL already in the database, it will show you the same one.
2. This app is completely portable, you can change the name of the domain and it will still work.
2. When it gives you the short url, the programs picks 5 letters out of 64. Therefore, it can give you 1 out of 64^5 unique urls.
3. If you put an incorrect URL, it will alert you.
4. You don't have to put the protocol (http) or the WWW at the beginning, it will still know if it is a real URL (Thanks REGEX!).
5. You can save the URL in the clipboard just by clicking on the copy button.


This project actually started as a microservice API and then I saw potential and I wanted to develop it further.

If you go to, let's say: https://urled.herokuapp.com/new/www.hola.com
It will give you a JSON object with a shortened URL. (/Syagi)

Thank you!

Full disclosure: I know that as a Heroku app, the URL is pretty long. However, it was a fun project.

