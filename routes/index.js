const express = require('express');
const validator = require('validator');
const shortid = require('shortid');
const Url = require('./../models/url');
const router = express.Router();
const PORT = "3000";

// Function to get the domain URL so code is DRY
function getUrl(req, res, port) {
	return `${req.protocol}://${req.hostname}:${PORT}`;
}

// Index
router.get('/',function(req, res) {
	console.log(`${getUrl(req, res, PORT)}/`);
    res.render('index');
});

// Send JSON DB
router.get('/new/:full_url(*)', function(req, res) {
	let full_url = req.params.full_url;
	
	//If it is NOT a valid URL
	if (!validator.isURL(full_url)) {
		res.json({
			error: "Unable to shorten that link. It is not a valid url."
		});
	} else {	
		// Find out if the object exists, if it doesn't exist, save it.
		Url.findOne({original_url: full_url}).exec(function(err, url) {
			if (err) throw console.error(err);

			// If the url is null, then it does not exist in the database.
			// Then it is okay to create a new site and save it.
			if (url == null) {
				// generate a random id to shorten the url of the website
				let url_id = shortid.generate().slice(0, 5);

				// create a new user called site and save it.
				let site = new Url({
				  original_url: full_url, 	
				  short_url: `${getUrl(req, res, PORT)}/${url_id}`
				});

				site.saveSite();
				res.json(site.getSite());
			} else {
				res.json({
					"original_url": url.original_url,
					"short_url": url.short_url
				});
			}
		});
	}
});

// Error page
router.get('/new/', function(req, res) {
    res.status(400);
    res.send('404: Page Not Found');
});

//When the user writes a short_url in the router, it redirects to the original url.
router.get('/:short_url/', function(req, res) {
	Url.findOne({short_url: `${getUrl(req, res, PORT)}/${req.params.short_url}`}).exec(function(err, url) {
		if (err) throw console.error(err);
		
		if (url == null) {
			res.json({
				error: "The short link does not exist."
		});
		} else {
			let original_url = url.original_url;
			let httpRegex = /http(s)?:\/\//;

			// if http:// is not part of the original_url, add http:// add the beginning
			!(httpRegex.test(original_url)) ?
				res.redirect('http://' + original_url) : 
				res.redirect(original_url);

		}
	});	

	//This is a previous error, I do not know if it still occurs.
	//When I go to index / it gives me this error, why?
	//console.log('There was an error with the short_url: parameter');
});

// Handle 404 - Keep this as a last route
router.use(function(req, res, next) {
    res.status(400);
    res.send('404: Page Not Found');
});

module.exports = router;