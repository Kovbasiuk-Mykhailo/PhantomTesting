var fs = require( 'fs' );
var path = fs.absolute( fs.workingDirectory + '/phantomcss.js' );
var phantomcss = require(path);
var config = require(fs.absolute( fs.workingDirectory + '/testsuites/config.js' ));
	
casper.test.begin( 'House profile testsuite', function ( test ) {

	casper.options.pageSettings = {
        userName: config.BASIC_AUTH.LOGIN,
        password: config.BASIC_AUTH.PASSWORD
    }

	phantomcss.init( {
		rebase: casper.cli.get( "rebase" ),
		// SlimerJS needs explicit knowledge of this Casper, and lots of absolute paths
		casper: casper,
		libraryRoot: fs.absolute( fs.workingDirectory + '' ),
		screenshotRoot: fs.absolute( fs.workingDirectory + '/testsuites/NotLoginState/house-profile/screenshots' ),
		failedComparisonsRoot: fs.absolute( fs.workingDirectory + '/testsuites/NotLoginState/house-profile/failures' ),
		addLabelToFailedImage: false,
		/*
		screenshotRoot: '/screenshots',
		failedComparisonsRoot: '/failures'
		casper: specific_instance_of_casper,
		libraryRoot: '/phantomcss',
		fileNameGetter: function overide_file_naming(){},
		onPass: function passCallback(){},
		onFail: function failCallback(){},
		onTimeout: function timeoutCallback(){},
		onComplete: function completeCallback(){},
		hideElements: '#thing.selector',
		addLabelToFailedImage: true,
		outputSettings: {
			errorColor: {
				red: 255,
				green: 255,
				blue: 0
			},
			errorType: 'movement',
			transparency: 0.3
		}*/
	} );

	casper.on( 'remote.message', function ( msg ) {
		this.echo( msg );
	} );

	casper.on( 'error', function ( err ) {
		this.die( "PhantomJS has errored: " + err );
	} );

	casper.on( 'resource.error', function ( err ) {
		casper.log( 'Resource load error: ' + err, 'warning' );
	} );

	casper.start(config.URL.PROPERTY);
	
	casper.viewport( 1024, 768 );

	casper.then( function () {
		this.click('body > app > property > div > div > div.flex-container.singleMode > div.fi-left > div:nth-child(1) > div.expenses.flex-container > div > property-expenses > dropdown-li:nth-child(2) > div > div > h5.right > i');
		this.click('body > app > property > div > div > div.flex-container.singleMode > div.fi-left > div:nth-child(1) > div.expenses.flex-container > div > property-expenses > dropdown-li:nth-child(3) > div > div > h5.right > i');
		this.click('body > app > property > div > div > div.flex-container.singleMode > div.fi-left > div:nth-child(2) > div.loans.flex-container > div > property-loans > dropdown-li:nth-child(1) > div > div > h5.right > i');
		this.evaluate( function () {
			var image = document.querySelector('body > app > property > div > div > div.card-wrapper.flex-container > div.fi-left.grey.clearfix > div > div.property-card.light-grey > div.house > img');
			image.src = '';

			var kontaktPris = document.querySelector('body > app > property > div > div > div.card-wrapper.flex-container > div.fi-left.grey.clearfix > div > div.property-card.light-grey > div.price > h2');
			kontaktPris.innerText = 123.456;

			var udgifter = document.querySelector('body > app > property > div > div > div.card-wrapper.flex-container > div.fi-right.grey.clearfix > div > div > div.left > h2');
			udgifter.innerText = '5.500 kr';

			var address = document.querySelector('body > app > property > div > div > div.topbar.light-grey > div > h1');
			address.innerText = 'Bønnerupvej 70b 0.sal / 8585 Glesborg';

			var type = document.querySelector('body > app > property > div > div > div.card-wrapper.flex-container > div.fi-left.grey.clearfix > div > div.property-data.clearfix > div:nth-child(1) > h4');
			type.innerText = 'default data';

			var bolig = document.querySelector('body > app > property > div > div > div.card-wrapper.flex-container > div.fi-left.grey.clearfix > div > div.property-data.clearfix > div:nth-child(2) > h4');
			bolig.innerText = 'default data';

			var kælder = document.querySelector('body > app > property > div > div > div.card-wrapper.flex-container > div.fi-left.grey.clearfix > div > div.property-data.clearfix > div:nth-child(3) > h4');
			kælder.innerText = 'default data';

			var grund = document.querySelector('body > app > property > div > div > div.card-wrapper.flex-container > div.fi-left.grey.clearfix > div > div.property-data.clearfix > div:nth-child(4) > h4');
			grund.innerText = 'default data';

			var værelser = document.querySelector('body > app > property > div > div > div.card-wrapper.flex-container > div.fi-left.grey.clearfix > div > div.property-data.clearfix > div:nth-child(5) > h4');
			værelser.innerText = 'default data';

			var energimærke = document.querySelector('body > app > property > div > div > div.card-wrapper.flex-container > div.fi-left.grey.clearfix > div > div.property-data.clearfix > div:nth-child(6) > h4');
			energimærke.innerText = 'default data';

			var ejerafgift = document.querySelector('body > app > property > div > div > div.card-wrapper.flex-container > div.fi-left.grey.clearfix > div > div.property-data.clearfix > div:nth-child(7) > h4');
			ejerafgift.innerText = 'default data';

			var liggetid = document.querySelector('body > app > property > div > div > div.card-wrapper.flex-container > div.fi-left.grey.clearfix > div > div.property-data.clearfix > div:nth-child(8) > h4');
			liggetid.innerText = 'default data';

			var udgifterMenu = document.querySelector('body > app > property > div > div > div.flex-container.singleMode > div.fi-left > div:nth-child(1) > div.header.light-grey.flex-container > div > div > span');
			udgifterMenu.innerText = '5.500 kr/md';

			var udgifterMenuFirst = document.querySelector('body > app > property > div > div > div.flex-container.singleMode > div.fi-left > div:nth-child(1) > div.expenses.flex-container > div > property-expenses > div > div > h4.right');
			udgifterMenuFirst.innerText = '5.500 kr/md';

			var renter = document.querySelector('body > app > property > div > div > div.flex-container.singleMode > div.fi-left > div:nth-child(1) > div.expenses.flex-container > div > property-expenses > dropdown-li:nth-child(2) > div > div > h5.right');
			renter = '4.000 kr/md';

			var renterFirst = document.querySelector('body > app > property > div > div > div.flex-container.singleMode > div.fi-left > div:nth-child(1) > div.expenses.flex-container > div > property-expenses > dropdown-li:nth-child(2) > editable-li:nth-child(2) > div > div > h5.right.disabled');
			renterFirst.innerText = '2.500 kr';

			var renterSecond = document.querySelector('body > app > property > div > div > div.flex-container.singleMode > div.fi-left > div:nth-child(1) > div.expenses.flex-container > div > property-expenses > dropdown-li:nth-child(2) > editable-li:nth-child(3) > div > div > h5.right.disabled');
			renterSecond.innerText = '1.500 kr';

			var fasteUdgifter = document.querySelector('body > app > property > div > div > div.flex-container.singleMode > div.fi-left > div:nth-child(1) > div.expenses.flex-container > div > property-expenses > dropdown-li:nth-child(3) > div.row-wrapper.shown > div > h5.right');
			fasteUdgifter.innerText = '1.500 kr/md';

			var fasteUdgifterFirst = document.querySelector('body > app > property > div > div > div.flex-container.singleMode > div.fi-left > div:nth-child(1) > div.expenses.flex-container > div > property-expenses > dropdown-li:nth-child(3) > editable-li:nth-child(2) > div > div > h5.right');
			fasteUdgifterFirst.innerText = '500 kr';

			var fasteUdgifterSecond = document.querySelector('body > app > property > div > div > div.flex-container.singleMode > div.fi-left > div:nth-child(1) > div.expenses.flex-container > div > property-expenses > dropdown-li:nth-child(3) > editable-li:nth-child(3) > div > div > h5.right');
			fasteUdgifterSecond.innerText = '500 kr';

			var fasteUdgifterThird = document.querySelector('body > app > property > div > div > div.flex-container.singleMode > div.fi-left > div:nth-child(1) > div.expenses.flex-container > div > property-expenses > dropdown-li:nth-child(3) > editable-li:nth-child(4) > div > div > h5.right');
			fasteUdgifterThird.innerText = '500 kr';

			var price = document.querySelector('body > app > property > div > div > div.flex-container.singleMode > div.fi-left > div:nth-child(2) > div.header.light-grey.flex-container > div > div > span');
			price.innerText = '1.000.000 kr';

			var pricePrice = document.querySelector('body > app > property > div > div > div.flex-container.singleMode > div.fi-left > div:nth-child(2) > div.loans.flex-container > div > property-loans > dropdown-li:nth-child(1) > div > div > h5.right');
			pricePrice.innerText = '800.000';

			var priceKontakt = document.querySelector('body > app > property > div > div > div.flex-container.singleMode > div.fi-left > div:nth-child(2) > div.loans.flex-container > div > property-loans > dropdown-li:nth-child(1) > editable-li:nth-child(2) > div > div > h5.right.disabled');
			priceKontakt.innerText = '800.000 kr';

			var priceBudPrice = document.querySelector('body > app > property > div > div > div.flex-container.singleMode > div.fi-left > div:nth-child(1) > div.expenses.flex-container > div > property-expenses > div > div > h4.right');
			priceBudPrice.innerText = '0 kr';
		});
		casper.waitForSelector('body > app > property > div > div > div.topbar.light-grey > div', function() {
			phantomcss.screenshot("body > app > property > div > div > div.topbar.light-grey > div", 'house-profile');
		}); 
		casper.waitForSelector('body > app > property > div > div > div.card-wrapper.flex-container > div.fi-left.grey.clearfix', function() {
			phantomcss.screenshot("body > app > property > div > div > div.card-wrapper.flex-container > div.fi-left.grey.clearfix", 'house-profile');
		}); 
		casper.waitForSelector('body > app > property > div > div > div.card-wrapper.flex-container > div.fi-right.grey.clearfix', function() {
			phantomcss.screenshot("body > app > property > div > div > div.card-wrapper.flex-container > div.fi-right.grey.clearfix", 'house-profile');
		}); 
		casper.waitForSelector('body > app > property > div > div > div.flex-container.singleMode > div.fi-left > div:nth-child(1)', function() {
			phantomcss.screenshot("body > app > property > div > div > div.flex-container.singleMode > div.fi-left > div:nth-child(1)", 'house-profile');
		}); 
		casper.waitForSelector('body > app > property > div > div > div.flex-container.singleMode > div.fi-left > div:nth-child(2)', function() {
			phantomcss.screenshot("body > app > property > div > div > div.flex-container.singleMode > div.fi-left > div:nth-child(2)", 'house-profile');
		}); 
		casper.waitForSelector('body > app > property > div > div > div.flex-container.singleMode > div.fi-left > div:nth-child(3)', function() {
			phantomcss.screenshot("body > app > property > div > div > div.flex-container.singleMode > div.fi-left > div:nth-child(3)", 'house-profile');
		}); 
		casper.waitForSelector('body > app > property > div > div > div.flex-container.singleMode > div.fi-left > div:nth-child(4)', function() {
			phantomcss.screenshot("body > app > property > div > div > div.flex-container.singleMode > div.fi-left > div:nth-child(4)", 'house-profile');
		}); 
		casper.waitForSelector('body > app > property > div > div > div.flex-container.singleMode > div.fi-right > div', function() {
			phantomcss.screenshot("body > app > property > div > div > div.flex-container.singleMode > div.fi-right > div", 'house-profile');
		}); 
	} );

	casper.then( function now_check_the_screenshots() {
		phantomcss.compareAll();
	} );
	
	casper.run( function () {
		console.log( '\nTHE END.' );
		casper.test.done();
	} );
} );