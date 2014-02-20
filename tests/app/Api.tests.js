( function( define ) {

define(
	['qunit', 'jquery', 'Api', 'Author', 'LicenceStore', 'LICENCES'],
	function( QUnit, $, Api, Author, LicenceStore, LICENCES ) {

	QUnit.module( 'Api' );

	var testCases = {
		'LRO_Tycho_Central_Peak.jpg': {
			// Author without link:
			authors: [new Author( $( document.createTextNode( 'NASA / GSFC / Arizona State Univ. / Lunar Reconnaissance Orbiter' ) ) )],
			licenceId: 'PD',
			attribution: null,
			title: 'LRO Tycho Central Peak'
		},
		'Helene Fischer 2010.jpg': {
			// Author with internal wiki link:
			authors: [new Author( $( '<a href="http://commons.wikimedia.org/wiki/User:Fleyx24">Fleyx24</a>' ) )],
			licenceId: 'cc-by-sa-3.0',
			attribution: '',
			title: 'Helene Fischer 2010'
		},
		'JapaneseToiletControlPanel.jpg': {
			authors: [new Author( $( '<a href="http://commons.wikimedia.org/wiki/User:Chris_73">Chris 73</a>' ) )],
			licenceId: 'cc-by-sa-3.0',
			// Complex attribution:
			attribution: $( '<a href="http://commons.wikimedia.org/wiki/User:Chris_73">Chris 73</a> / <a href="http://commons.wikimedia.org/">Wikimedia Commons</a>' ),
			title: 'JapaneseToiletControlPanel'
		},
		'13-09-29-nordfriesisches-wattenmeer-RalfR-15.jpg': {
			// Complex author attribution:
			authors: [new Author( $( '<div/>' ).html( '©&nbsp;<a href="http://commons.wikimedia.org/wiki/User:Ralf_Roletschek">Ralf Roletschek</a> - <a rel="nofollow" href="http://www.roletschek.de">Fahrradtechnik und Fotografie</a>' ).contents() )],
			// Multi-licence-template:
			licenceId: 'cc-by-sa-3.0',
			attribution: null,
			title: '13-09-29-nordfriesisches-wattenmeer-RalfR-15'
		},
		'Statue Andrrea Palladio Vicenza.jpg': {
			// No detectable author:
			authors: [],
			licenceId: 'cc-zero',
			attribution: null,
			title: 'Statue Andrrea Palladio Vicenza'
		},
		'Inisheer Gardens 2002 dry-stone walls.jpg': {
			authors: [new Author( $( '<a href="http://commons.wikimedia.org/wiki/User:Arcimboldo">Eckhard Pecher</a>' ) )],
			// Features additional newer CC-BY-SA licence, preferring non-SA licence:
			licenceId: 'cc-by-2.0-de',
			// Simple attribution:
			attribution: $( '<a href="http://commons.wikimedia.org/wiki/User:Arcimboldo">Eckhard Pecher</a>' ),
			title: 'Inisheer Gardens 2002 dry-stone walls'
		},
		'Wien Karlsplatz3.jpg': {
			// Strip "(talk)" link:
			authors: [new Author( $( '<a href="http://commons.wikimedia.org/wiki/User:Ikar.us">Ikar.us</a>' ) )],
			licenceId: ['cc-by-2.0-de'],
			attribution: null,
			title: 'Wien Karlsplatz3'
		},
		'Brandenburg gate sunset quadriga.jpg': {
			authors: [],
			licenceId: 'cc-by-sa-3.0',
			attribution: null,
			title: 'Brandenburg gate sunset quadriga'
		},
		'Gerardus_t\'_Hooft_at_Harvard.jpg': {
			// Inter-wiki links:
			authors: [new Author( $( '<div/>' ).html( '<a href="http://en.wikipedia.org/wiki/User:Lumidek">Lumidek</a> at <a href="http://en.wikipedia.org/wiki/">English Wikipedia</a>' ).contents() )],
			licenceId: 'cc-by-3.0',
			attribution: null,
			title: 'Gerardus t\' Hooft at Harvard'
		},
		'1950_Yankees.jpg': {
			authors: [new Author( $( document.createTextNode( 'jcasabona' ) ) )],
			// Unsupported CC licence CC-BY-1.0:
			licenceId: null,
			attribution: null,
			title: '1950 Yankees'
		},
		'NatMonumFengegKapell.jpg': {
			authors: [new Author( $( '<div/>' ).html( '<a href="http://lb.wikipedia.org/wiki/User:Pecalux">Pecalux</a> at <a href="http://lb.wikipedia.org">lb.wikipedia</a>' ).contents() ) ],
			// Unsupported licence derivative CC-BY-3.0-LU:
			licenceId: null,
			attribution: null,
			title: 'NatMonumFengegKapell'
		},
		'"Граничар" - Туховища.JPG': {
			authors: [new Author( $( document.createTextNode( 'Ерол Шукриев' ) ) )],
			licenceId: 'cc-by-3.0',
			attribution: null,
			title: '"Граничар" - Туховища'
		},
		'03602 - Monti, Gaetano - Allegoria (1832) - Porta Venezia, Milano - Foto Giovanni Dall\'Orto 23-Jun-2007.jpg': {
			authors: [],
			// Completely unsupported licence:
			licenceId: null,
			attribution: null,
			title: '03602 - Monti, Gaetano - Allegoria (1832) - Porta Venezia, Milano - Foto Giovanni Dall\'Orto 23-Jun-2007'
		},
		// Video:
		'The_Little_Princess_(1939)_full.ogv': {
			authors: [new Author( $( document.createTextNode( 'Walter Lang/20th Century Fox' ) ) )],
			licenceId: 'PD',
			attribution: null,
			title: 'The Little Princess (1939) full'
		},
		// Audio:
		'05 Air from Suite in C minor.ogg': {
			authors: [new Author( $( '<a href="http://commons.wikimedia.org/wiki/User:Bdegazio">Bdegazio</a>' ) )],
			licenceId: 'cc-by-sa-3.0',
			attribution: null,
			title: '05 Air from Suite in C minor'
		},
		// Office:
		'Cox_and_box.pdf': {
			authors: [new Author( $( document.createTextNode( 'F C Burnand' ) ) )],
			licenceId: 'PD',
			attribution: null,
			title: 'Cox and box'
		}
	};

	var api = new Api(
		'//commons.wikimedia.org/w/api.php?callback=?',
		new LicenceStore( LICENCES )
	);

	/**
	 * Returns a nodes HTML as plain text.
	 *
	 * @param {jQuery|null} $node
	 * @return {string|null}
	 */
	function getHtmlText( $node ) {
		return $node ? $( '<div/>' ).append( $node ).html() : null
	}

	QUnit.test( 'Check scraped asset', function( assert ) {

		$.each( testCases, function( filename, testCase ) {

			QUnit.stop();

			api.getAsset( filename )
			.done( function( asset ) {

				assert.equal(
					asset.getFilename(),
					filename,
					'Filename "' + asset.getFilename() + '" matches.'
				);

				assert.equal(
					asset.getTitle(),
					testCase.title,
					'Title "' + asset.getTitle() + '" matches.'
				);

				$.each( asset.getAuthors(), function( i, author ) {

					assert.equal(
						author.getText(),
						testCase.authors[i].getText(),
						'"' + filename + '": Author text "' + author.getText() + '" matches.'
					);

					var authorHtml = getHtmlText( author.getHtml() );

					assert.equal(
						authorHtml,
						getHtmlText( testCase.authors[i].getHtml() ),
						'"' + filename + '": Author html "' + authorHtml + '" matches.'
					);

				} );

				if( asset.getLicence() === null ) {
					assert.strictEqual(
						asset.getLicence(),
						testCase.licenceId,
						'No supported licence.'
					);
				} else {
					assert.equal(
						asset.getLicence().getId(),
						testCase.licenceId,
						'Licence "' + asset.getLicence().getId() + '" matches.'
					);
				}

				assert.equal(
					getHtmlText( asset.getAttribution() ),
					getHtmlText( testCase.attribution ),
					'Dedicated attribution of "' + filename + '" matches.'
				);

			} )
			.fail( function() {
				assert.ok(
					false,
					'API call failed.'
				);
			} )
			.always( function() {
				QUnit.start()
			} );

		} );

	} );

	QUnit.test( 'getAsset() error handling', function( assert ) {
		var negativeTestCases = [
			'string that is not supposed to be the name of an existing image',
			'{invalid input}',
			// Not in "File:" namespace:
			'TimedText:Elephants_Dream.ogg.ca.srt'
		];

		for( var i = 0; i < negativeTestCases.length; i++ ) {
			var input = negativeTestCases[i];

			QUnit.stop();

			( function( input ) {
				api.getAsset( input )
				.done( function( parsedFilename ) {
					assert.ok(
						false,
						'Unexpected result: "' + parsedFilename + '".'
					);
				} ).fail( function( message ) {
					assert.ok(
						true,
						'Rejected input "' + input + '" with error message "' + message + '".'
					);
				} )
				.always( function() {
					QUnit.start();
				} );
			}( input ) );
		}
	} );

} );

}( define ) );
