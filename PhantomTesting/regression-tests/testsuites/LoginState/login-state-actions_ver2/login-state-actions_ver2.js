var fs = require( 'fs' );
var path = fs.absolute( fs.workingDirectory + '/phantomcss.js' );
var phantomcss = require(path);
var config = require(fs.absolute( fs.workingDirectory + '/testsuites/config.js' ));
	
casper.test.begin( 'Login-state-actions_ver2 testsuite', function ( test ) {

	casper.options.pageSettings = {
        userName: config.BASIC_AUTH.LOGIN,
        password: config.BASIC_AUTH.PASSWORD
    }

	phantomcss.init( {
		rebase: casper.cli.get( "rebase" ),
		// SlimerJS needs explicit knowledge of this Casper, and lots of absolute paths
		casper: casper,
		libraryRoot: fs.absolute( fs.workingDirectory + '' ),
		screenshotRoot: fs.absolute( fs.workingDirectory + '/testsuites/LoginState/login-state-actions_ver2/screenshots' ),
		failedComparisonsRoot: fs.absolute( fs.workingDirectory + '/testsuites/LoginState/login-state-actions_ver2/failures' ),
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
		this.die( "phantomjs has errored: " + err );
	} );

	casper.on( 'resource.error', function ( err ) {
		casper.log( 'resource load error: ' + err, 'warning' );
	} );

	casper.start(config.URL.SEARCH);
	
	casper.viewport( 1680, 1050 );

	casper.then( function () {
		this.click('body > app > app-search-results > div > div.topbar > app-navmenu > div > ul > li:nth-child(3) > a');
		this.waitForSelector('body > app > popups > div > popup-signin', function() {
			phantomcss.screenshot("body", 'login-state-actions_ver2_0');
		});
	});
	casper.then( function () {
		this.click('body > app > popups > div > popup-signin > div > a');
		this.waitForSelector('body > app > popups > div > popup-email-signin', function(){
			this.sendKeys('body > app > popups > div > popup-email-signin > div > div.input-container > v-form > div:nth-child(1) > input', config.CREDENTIALS.USER_LOGIN);
			this.sendKeys('body > app > popups > div > popup-email-signin > div > div.input-container > v-form > div:nth-child(2) > div > input', config.CREDENTIALS.USER_PASSWORD);
			this.waitFor(function() {
   				 return this.evaluate(function() {
   				 	return document.querySelector('body > app > popups > div > popup-email-signin > div > div.input-container > v-form > div:nth-child(2) > div > input').value;
    			});
			}, function() {
				this.clickLabel('Login','button');
				casper.waitFor(function() {
					return this.evaluate(function() {
						return !document.querySelector('body > app > popups > div > popup-email-signin');
					});

				}, function() {
					phantomcss.screenshot("body", 'login-state-actions_ver2_1');
				});
			});
		});
	});
	casper.then( function () {
		this.click('body > app > app-home > app-navmenu > div > saved-search > div > div > div > span');
		this.waitForSelector('body > app > app-home', function() {
			phantomcss.screenshot("body", 'login-state-actions_ver2_2');
		});
	});
	casper.then( function () {
		this.click('body > app > app-home > app-navmenu > div > saved-search > div > div.saved-search-wrapper > div > div > ul > li:nth-child(1) > div.title');
		this.waitForSelector('body > app > app-home', function() {
			phantomcss.screenshot("body", 'login-state-actions_ver2_3');
		});
	});
	casper.then( function () {
		this.click('body > app > app-search-results > div > div.main > app-map > google-map > div.google-map-container-inner > div > div > div:nth-child(1) > div:nth-child(4) > div:nth-child(1) > div:nth-child(1)');
		this.waitForSelector('body > app > app-search-results', function () {
			phantomcss.screenshot("body", 'login-state-actions_ver2_4');
		});
		//this.scrollto(0, 0);
	});
	casper.then( function () {
		this.click('body > app > app-search-results > div > div.topbar > app-navmenu > div > ul > li:nth-child(2) > a');
		this.waitForSelector('body > app > slide-overlay', function () {
			phantomcss.screenshot("body", 'login-state-actions_ver2_5');
		});
		this.click('body > app > slide-overlay > div > i');
	});
	casper.then( function () {
		this.click('body > app > app-search-results > div > div.topbar > app-navmenu > div > ul > li:nth-child(3) > img');
		this.waitForSelector('body > app > app-search-results > div > div.topbar > app-navmenu > div.logout-backdrop > div', function () {
			phantomcss.screenshot("body", 'login-state-actions_ver2_6');
		});
		this.click('body > app > app-search-results > div > div.topbar > app-navmenu > div.logout-backdrop > div > div > a');
		this.waitForSelector('body > app > user-profile', function () {
			phantomcss.screenshot("body", 'login-state-actions_ver2_7');
		});
	});
	casper.then( function () {
		this.sendKeys('body > app > user-profile > div.center > div.profile > form.profile-edit > toggle-pwd:nth-of-type(1) > input', config.CREDENTIALS.USER_PASSWORD);
		this.sendKeys('body > app > user-profile > div.center > div.profile > form.profile-edit > toggle-pwd:nth-of-type(2) > input', config.CREDENTIALS.USER_PASSWORD);
		this.waitFor(function() {
   				 return this.evaluate(function() {
   				 	return document.querySelector('body > app > user-profile > div.center > div.profile > form.profile-edit > toggle-pwd:nth-of-type(2) > input').value;
    			});
			}, function() {
				this.click('body > app > user-profile > div.bottom-buttons > button.accept');
				this.waitFor(function() {
   					 return this.evaluate(function() {
   				 		return !document.querySelector('body > app > .loader-container').value;
    				});
				}, function() {
					phantomcss.screenshot("body", 'login-state-actions_ver2_8');
				});
		});
	});
	casper.then( function () {
		this.click('body > app > user-profile > app-navmenu > div > ul > li:nth-child(3) > img');
		this.waitForSelector('body > app > user-profile > app-navmenu > div.logout-backdrop > div', function() {
			phantomcss.screenshot("body", 'login-state-actions_ver2_9');
		});
	});
	casper.then( function () {
		this.click('body > app > user-profile > app-navmenu > div.logout-backdrop > div > div > a.logout');
		this.waitFor(function() {
					return this.evaluate(function() {
						return !document.querySelector('body > app > user-profile > app-navmenu > div.logout-backdrop > div');
					});

				}, function() {
			phantomcss.screenshot("body", 'login-state-actions_ver2_9');
		});
	});
	/*casper.then( function () {
		this.scrollToBottom();
		this.wait(2000, function() {
			phantomcss.screenshot("body", 'login-state-actions_ver2_10');
		});
	});*/
	//this.clickLabel('Sammenlign (3)', 'button');
	casper.then( function now_check_the_screenshots() {
		phantomcss.compareAll();
	});
	
	casper.run( function () {
		console.log( '\nTHE END.' );
		casper.test.done();
	});
});