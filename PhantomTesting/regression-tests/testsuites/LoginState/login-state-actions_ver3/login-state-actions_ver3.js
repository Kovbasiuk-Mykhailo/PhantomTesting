var fs = require( 'fs' );
var path = fs.absolute( fs.workingDirectory + '/phantomcss.js' );
var phantomcss = require(path);
var config = require(fs.absolute( fs.workingDirectory + '/testsuites/config.js' ));
	
casper.test.begin( 'Login-state-actions_ver3 testsuite', function ( test ) {

	casper.options.pageSettings = {
        userName: config.BASIC_AUTH.LOGIN,
        password: config.BASIC_AUTH.PASSWORD
    }

	phantomcss.init( {
		rebase: casper.cli.get( "rebase" ),
		// SlimerJS needs explicit knowledge of this Casper, and lots of absolute paths
		casper: casper,
		libraryRoot: fs.absolute( fs.workingDirectory + '' ),
		screenshotRoot: fs.absolute( fs.workingDirectory + '/testsuites/LoginState/login-state-actions_ver3/screenshots' ),
		failedComparisonsRoot: fs.absolute( fs.workingDirectory + '/testsuites/LoginState/login-state-actions_ver3/failures' ),
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
			phantomcss.screenshot("body", 'login-state-actions_ver3_0');
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
					phantomcss.screenshot("body", 'login-state-actions_ver3_1');
				});
			});
		});
	});
	casper.then( function () {
		this.click('body > app > app-home > app-navmenu > div > saved-search > div > div > div > span');
		this.wait(5000, function() {
			phantomcss.screenshot("body", 'login-state-actions_ver3_2');
		});
	});
	casper.then( function () {
		this.clickLabel('Mine boliger','a');
		this.wait(5000, function() {
			phantomcss.screenshot("body", 'login-state-actions_ver3_3');
		});
	});
	casper.then( function () {
		//this.scrollToBottom();
		//this.scrollTo(0, 0);
	});
	casper.then( function () {
		this.click('body > app > app-folders > div > div.main > div > div > folder > folder-menu > div.topBar > div.left > button');
		this.waitForSelector('body > app > popups > div', function () {
			this.sendKeys('body > app > popups > div > invite-user  input', config.CREDENTIALS.USER_LOGIN);
			this.waitFor(function() {
				return this.evaluate(function() {
					return document.querySelector('body > app > popups > div > invite-user  input').value;
				});
			}, function() {
				this.wait(5000, function() {
					phantomcss.screenshot("body", 'login-state-actions_ver3_4');
				});		
				this.click('body > app > popups > div > invite-user > div > button');	
			});
		});
		this.wait(5000, function () {
			phantomcss.screenshot("body", 'login-state-actions_ver3_5');
		});
	});
	casper.then( function () {
		this.evaluate(function(){
			document.querySelector('body > app > app-folders > div > div.main > div > div > folder > folder-menu > div.topBar > div.header > a').click();
		});
		this.wait(5000, function () {
			phantomcss.screenshot("body", 'login-state-actions_ver3_6');
		});
		this.evaluate(function(){
			document.querySelector('body > app > popups > div > edit-folder > div > ul > li.sent > p > span > a').click();
		});
		this.wait(5000, function () {
			phantomcss.screenshot("body", 'login-state-actions_ver3_7');
		});
	});
	casper.then( function () {
		this.evaluate( function () {
			document.querySelector('body > app > app-folders > div > div.main > div > activity-list > div > div.closeActivities').click();
		}); 
		this.wait(5000, function() {
			phantomcss.screenshot("body", 'login-state-actions_ver3_8');
		});
		this.evaluate( function () {
			document.querySelector('body > app > app-folders > div > div.main > div > activity-list > div > div.closeActivities').click();
			document.querySelector('body > app > app-folders > div > div.main > div > div > folder > folder-menu > div.topBar > div.header > a').click();
		}); 
		this.wait(5000, function() {
			phantomcss.screenshot("body", 'login-state-actions_ver3_9');
		});
		this.evaluate( function () {
			document.querySelector('body > app > popups > div > edit-folder > div > ul > li:nth-child(2) > p > a').click();
		}); 
	});
	casper.then( function () {
		this.evaluate( function () {
			this.sendKeys('body > app > popups > div > invite-user > div > div:nth-child(5) > input', config.CREDENTIALS.USER_LOGIN);
		});
		this.wait(5000, function() {
			phantomcss.screenshot("body", 'login-state-actions_ver3_10');
		});
		this.evaluate( function () {
			document.querySelector('body > app > popups > div > invite-user > div > button').click();
		});
	});
	casper.then( function () {
		this.evaluate( function () {
			document.querySelector('body > app > popups > div > edit-folder > div > i').click();
		});
		this.wait(5000, function() {
			phantomcss.screenshot("body", 'login-state-actions_ver3_11');
		});
	});
	casper.then( function () {
		this.evaluate( function () {
			document.querySelector('body > app > app-folders > div > div.topbar > app-navmenu > div > ul > li:nth-child(3) > img').click();
		});
		this.wait(1000, function() {
		});
		this.evaluate( function () {
			document.querySelector('body > app > app-folders > div > div.topbar > app-navmenu > div.logout-backdrop.ng-tns-c6-109.ng-trigger.ng-trigger-logoutAnimation > div > div > a.logout').click();
		});
		this.wait(5000, function() {
			phantomcss.screenshot("body", 'login-state-actions_ver3_12');
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