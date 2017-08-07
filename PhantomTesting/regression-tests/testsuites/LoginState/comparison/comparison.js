var fs = require( 'fs' );
var path = fs.absolute( fs.workingDirectory + '/phantomcss.js' );
var phantomcss = require(path);
var config = require(fs.absolute( fs.workingDirectory + '/testsuites/config.js' ));
	
casper.test.begin( 'Comparison testsuite', function ( test ) {

	casper.options.pageSettings = {
        userName: config.BASIC_AUTH.LOGIN,
        password: config.BASIC_AUTH.PASSWORD
    }

	phantomcss.init( {
		rebase: casper.cli.get( "rebase" ),
		// SlimerJS needs explicit knowledge of this Casper, and lots of absolute paths
		casper: casper,
		libraryRoot: fs.absolute( fs.workingDirectory + '' ),
		screenshotRoot: fs.absolute( fs.workingDirectory + '/testsuites/LoginState/comparison/screenshots' ),
		failedComparisonsRoot: fs.absolute( fs.workingDirectory + '/testsuites/LoginState/comparison/failures' ),
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
						this.wait(2000, function() {
							this.click('body > app > app-home > app-navmenu > div > ul > li.bookmark > a');
							this.wait(2000, function () {
								this.click('body > app > app-folders > div > div.main > div > div > folder > folder-menu > div.topBar > div.right > button');
							});
							
							this.wait(5000, function () {
								this.click("body > app > property-choice > div > div.folders-wrapper > compare-folder:nth-child(1) > div > div.property-list > property-card > li");
								this.click("body > app > property-choice > div > div.folders-wrapper > compare-folder:nth-child(2) > div > div.property-list > property-card > li");
								this.click("body > app > property-choice > div > div.folders-wrapper > compare-folder:nth-child(3) > div > div.property-list > property-card > li");
								this.click("body > app > property-choice > div > div.compare-toolbar > p.item.compare > button");
								phantomcss.screenshot("body > app > property-comparsion > div > div.compare-toolbar", 'comparison');
								phantomcss.screenshot("body > app > property-comparsion > div > div:nth-child(3)", 'comparison');
								phantomcss.screenshot("body > app > property-comparsion > div > div:nth-child(4)", 'comparison');
								phantomcss.screenshot("body > app > property-comparsion > div > div:nth-child(5)", 'comparison');
								phantomcss.screenshot("body > app > property-comparsion > div > div:nth-child(6)", 'comparison');
								phantomcss.screenshot("body > app > property-comparsion > div > div:nth-child(7)", 'comparison');
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