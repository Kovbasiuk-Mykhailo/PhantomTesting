var fs = require( 'fs' );
var path = fs.absolute( fs.workingDirectory + '/phantomcss.js' );
var phantomcss = require(path);
var config = require(fs.absolute( fs.workingDirectory + '/testsuites/config.js' ));
	
casper.test.begin( 'Login-state-actions_ver5 testsuite', function ( test ) {

	casper.options.pageSettings = {
        userName: config.BASIC_AUTH.LOGIN,
        password: config.BASIC_AUTH.PASSWORD
    }

	phantomcss.init( {
		rebase: casper.cli.get( "rebase" ),
		// SlimerJS needs explicit knowledge of this Casper, and lots of absolute paths
		casper: casper,
		libraryRoot: fs.absolute( fs.workingDirectory + '' ),
		screenshotRoot: fs.absolute( fs.workingDirectory + '/testsuites/LoginState/login-state-actions_ver5/screenshots' ),
		failedComparisonsRoot: fs.absolute( fs.workingDirectory + '/testsuites/LoginState/login-state-actions_ver5/failures' ),
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

	casper.start(config.URL.HOMEPAGE);
	
	casper.viewport( 1680, 1050 );

	casper.then( function () {
		this.clickLabel('Log ind', 'a');
		this.wait(5000, function() {
			phantomcss.screenshot("body", 'login-state-actions_ver5_0');
		});
	});
	casper.then( function () {
		this.clickLabel('Login med email','a');
		this.waitForSelector('body > app > popups > div > popup-email-signin', function(){
			this.sendKeys('body > app > popups > div > popup-email-signin > div > div.input-container > v-form > div:nth-child(1) > input', config.CREDENTIALS.USER_LOGIN);
			this.sendKeys('body > app > popups > div > popup-email-signin > div > div.input-container > v-form > div:nth-child(2) > div > input', config.CREDENTIALS.USER_PASSWORD);
			this.waitFor(function() {
   				 return this.evaluate(function() {
   				 	return document.querySelector('body > app > popups > div > popup-email-signin > div > div.input-container > v-form > div:nth-child(2) > div > input').value;
    			});
			}, function() {
				this.clickLabel('Login','button');
				casper.wait(5000, function() {
					phantomcss.screenshot("body", 'login-state-actions_ver5_1');
				});
			});
		});
	});
	casper.then( function () {
		this.click('body > app > app-home > app-navmenu > div > saved-search > div > div > div > span');
		this.wait(5000, function() {
			phantomcss.screenshot("body", 'login-state-actions_ver5_2');
		});
	});
	casper.then( function () {
		this.clickLabel('Mine boliger','a');
		this.wait(5000, function() {
			phantomcss.screenshot("body", 'login-state-actions_ver5_3');
		});
	});
	casper.then( function () {
		this.scrollToBottom();
		this.wait(5000, function() {
			phantomcss.screenshot("body", 'login-state-actions_ver5_4');
		});
		this.scrollTo(0, 0);
	});
	casper.then( function () {
		this.evaluate( function(){
			document.querySelector('body > app > app-folders > div > div.main > div > div > folder > folder-menu > div.topBar > div.right > button').click();
			var cards = document.querySelector('body > app > property-choice > div > div.folders-wrapper > compare-folder:nth-child(1) > div > div.property-list');
			cards.forEach( function (card) {
				this.find('li > div.house_image > a > img').attr('src', '');
				this.find('li > div.property_info > div.sell-price-wrapper > h3').val('123.456 kr');
				this.find('li > div.property_info > div.rent-price-wrapper > h3').val('78.900 kr');
				this.find('li > div.property_info > h4').html('Villa 138m<sup>2</sup> 4V');
				this.find('li > div.property_info > p:nth-child(5)').val('Søndergade 35');
				this.find('li > div.property_info > p:nth-child(6)').val('5620 Glamsbjerg');
				
				var energyLabel = this.find('li > div.property_info > h4 > span > span');
				if (energyLabel)
					energyLabel.text('A');
			});
		});
		this.wait(5000, function () {
			phantomcss.screenshot("body", 'login-state-actions_ver5_5');
		});
	});
	casper.then( function () {
		this.evaluate(function(){
			document.querySelector('body > app > property-choice > div > div.folders-wrapper > compare-folder:nth-child(1) > div > div.property-list > property-card:nth-child(1) > li > div.house_image').click();
			document.querySelector('body > app > property-choice > div > div.folders-wrapper > compare-folder:nth-child(1) > div > div.property-list > property-card:nth-child(3) > li > div.house_image').click();
		});
		this.wait(5000, function () {
			phantomcss.screenshot("body", 'login-state-actions_ver5_6');
		});
	});
	casper.then( function () {
		this.evaluate( function () {
			document.querySelector('body > app > property-choice > div > div.folders-wrapper > compare-folder:nth-child(1) > div > div.property-list > property-card:nth-child(5) > li > div.house_image').click();
		}); 
		this.wait(5000, function() {
			phantomcss.screenshot("body", 'login-state-actions_ver5_7');
		});
	});
	casper.then( function () {
		this.evaluate( function () {
			document.querySelector('body > app > property-choice > div > div.folders-wrapper > compare-folder:nth-child(1) > div > div.property-list > property-card:nth-child(6) > li > div.house_image').click();
		});
		this.wait(5000, function() {
			phantomcss.screenshot("body", 'login-state-actions_ver5_8');
		});
	});
	casper.then( function () {
		this.evaluate( function () {
			document.querySelector('body > app > property-choice > div > div.compare-toolbar > p.item.compare > button').click();
		});
		this.wait(5000, function() {
			phantomcss.screenshot("body", 'login-state-actions_ver5_9');
		});
	});
	casper.then( function () {
		this.scrollToBottom();
		this.wait(2000, function() {
			phantomcss.screenshot("body", 'login-state-actions_ver5_10');
		});
	});
	//this.clickLabel('Sammenlign (3)', 'button');
	casper.then( function now_check_the_screenshots() {
		phantomcss.compareAll();
	});
	
	casper.run( function () {
		console.log( '\nTHE END.' );
		casper.test.done();
	});
});