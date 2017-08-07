var fs = require( 'fs' );
var path = fs.absolute( fs.workingDirectory + '/phantomcss.js' );
var phantomcss = require(path);
var config = require(fs.absolute( fs.workingDirectory + '/testsuites/config.js' ));
	
casper.test.begin( 'Folders page testsuite', function ( test ) {

	casper.options.pageSettings = {
        userName: config.BASIC_AUTH.LOGIN,
        password: config.BASIC_AUTH.PASSWORD
    }

	phantomcss.init( {
		rebase: casper.cli.get( "rebase" ),
		// SlimerJS needs explicit knowledge of this Casper, and lots of absolute paths
		casper: casper,
		libraryRoot: fs.absolute( fs.workingDirectory + '' ),
		screenshotRoot: fs.absolute( fs.workingDirectory + '/testsuites/LoginState/folders-page/screenshots' ),
		failedComparisonsRoot: fs.absolute( fs.workingDirectory + '/testsuites/LoginState/folders-page/failures' ),
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
	
	casper.viewport( 1024, 768 );

	casper.then( function () {
		this.click("body > app > app-home > app-navmenu > div > ul > li:nth-child(3) > a");
		this.waitForSelector("body > app > popups > div > popup-signin > div", function () {
			this.click("body > app > popups > div > popup-signin > div > a");
			this.waitForSelector('body > app > popups > div > popup-email-signin', function(){
				this.sendKeys('body > app > popups > div > popup-email-signin > div > div.input-container > v-form > div:nth-child(1) > input', config.CREDENTIALS.USER_LOGIN);
				this.sendKeys('body > app > popups > div > popup-email-signin > div > div.input-container > v-form > div:nth-child(2) > div > input', config.CREDENTIALS.USER_PASSWORD);
				this.waitFor(function() {
   				 	return this.evaluate(function() {
   				 		return document.querySelector('body > app > popups > div > popup-email-signin > div > div.input-container > v-form > div:nth-child(2) > div > input').value;
    				});
				}, function() {
						this.click('body > app > popups > div > popup-email-signin > div > button');
						this.click('body > app > app-home > app-navmenu > div > ul > li.bookmark > a');
						this.waitForSelector("body > app > app-folders > div > div.main > folder-list > div", function() {
							phantomcss.screenshot("body > app > app-folders > div > div.main > folder-list > div", 'folders page');
						});
						this.waitForSelector("body > app > app-folders > div > div.main > div > div > folder > folder-menu > div.topBar", function() {
							phantomcss.screenshot("body > app > app-folders > div > div.main > div > div > folder > folder-menu > div.topBar", 'folders page');
						});
						this.waitForSelector("body > app > app-folders > div > div.main > div > activity-list > div", function() {
							phantomcss.screenshot("body > app > app-folders > div > div.main > div > activity-list > div", 'folders page');
						});
						this.waitForSelector("body > app > app-folders > div > div.main > div > div > folder > div.property-list", function() {
							this.evaluate(function() {
								var propertyList = document.querySelector('body > app > app-folders > div > div.main > div > div > folder > div.property-list');
								Array.prototype.forEach.call(propertyList.children, function(card, i) {
									card.querySelector('li > div.house_image > a > img').setAttribute('src', '');
									card.querySelector('li > div.property-info > div.sell-price-wrapper > h3').innerText = '123.456 kr';
									card.querySelector('li > div.property-info > div.rent-price-wrapper > h3').innerText = '78.900 kr';
									card.querySelector('li > div.property-info > h4').innerHTML = 'Villa 138m<sup>2</sup> 4V';
									card.querySelector('li > div.property-info > p:nth-child(5)').innerText = 'Søndergade 35';
									card.querySelector('li > div.property-info > p:nth-child(6)').innerText = '5620 Glamsbjerg';
				
									var energyLabel = card.querySelector('li > div.property-info > h4 > span > span');
									if (energyLabel)
									energyLabel.text('A');
								});
							});
							this.wait(5000, function() {
								phantomcss.screenshot('body > app > app-folders > div > div.main > div > div > folder > div.property-list.ps-container.ps-theme-default', 'folders page');
							});
						});
					});
			});
		});
	});

	casper.then( function now_check_the_screenshots() {
		phantomcss.compareAll();
	} );
	
	casper.run( function () {
		console.log( '\nTHE END.' );
		casper.test.done();
	} );
} );