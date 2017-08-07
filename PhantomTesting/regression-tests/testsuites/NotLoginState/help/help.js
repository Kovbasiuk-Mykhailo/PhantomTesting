var fs = require( 'fs' );
var path = fs.absolute( fs.workingDirectory + '/phantomcss.js' );
var phantomcss = require(path);
var config = require(fs.absolute( fs.workingDirectory + '/testsuites/config.js' ));
	
casper.test.begin( 'Unblock testsuite', function ( test ) {

	casper.options.pageSettings = {
        userName: config.BASIC_AUTH.LOGIN,
        password: config.BASIC_AUTH.PASSWORD
    }

	phantomcss.init( {
		rebase: casper.cli.get( "rebase" ),
		// SlimerJS needs explicit knowledge of this Casper, and lots of absolute paths
		casper: casper,
		libraryRoot: fs.absolute( fs.workingDirectory + '' ),
		screenshotRoot: fs.absolute( fs.workingDirectory + '/testsuites/NotLoginState/unblock/screenshots' ),
		failedComparisonsRoot: fs.absolute( fs.workingDirectory + '/testsuites/NotLoginState/unblock/failures' ),
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
	});

	casper.on( 'remote.message', function ( msg ) {
		this.echo( msg );
	});

	casper.on( 'error', function ( err ) {
		this.die( "PhantomJS has errored: " + err );
	});

	casper.on( 'resource.error', function ( err ) {
		casper.log( 'Resource load error: ' + err, 'warning' );
	});

	casper.start(config.URL.HOMEPAGE);
	
	casper.viewport( 1024, 768 );

	casper.then( function () {
		this.click('body > app > app-home > app-navmenu > div > ul > li:nth-child(2) > a');
		this.waitForSelector("body", function() {
			phantomcss.screenshot("body", 'help');
		});   
	});

	casper.then( function now_check_the_screenshots() {
		phantomcss.compareAll();
	});
	
	casper.run( function () {
		console.log( '\nTHE END.' );
		casper.test.done();
	} );
} );