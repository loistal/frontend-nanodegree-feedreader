/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
     * a related set of tests. This suite is all about the RSS
     * feeds definitions, the allFeeds variable in our application.
     */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('have a defined and non-empty URL', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBeLessThan(1);
            });
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('have a defined and non-empty name', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBeLessThan(1);
            });
        });
    });


    /* TODO: Write a new test suite named "The menu" */
    describe('The menu ', function() {
        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        it('is hidden by default', function() {
            expect($('.menu-hidden').size()).toEqual(1);
        });

        /* TODO: Write a test that ensures the menu changes
         * visibility when the menu icon is clicked. This test
         * should have two expectations: does the menu display when
         * clicked and does it hide when clicked again.
         */
        it('changes visibility when clicked', function() {
            // trigger a click event
            $('.menu-icon-link').trigger('click');

            // check that the click event has indeed made the menu visible
            expect($('.menu-hidden').size()).toEqual(0);

            $('.menu-icon-link').trigger('click');

            // check that the click event has indeed made the menu invisible again
            expect($('.menu-hidden').size()).toEqual(1);

        });

    });


    /* TODO: Write a new test suite named "Initial Entries" */
    describe('Initial entries ', function() {
        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        beforeEach(function(done) {
            loadFeed(0, function() {
                done();
            });
        });

        it('should have at least one feed', function(done) {
            expect($('.feed .entry-link .entry').size()).not.toBeLessThan(1);
            done();
        });
    });

    /* TODO: Write a new test suite named "New Feed Selection" */
    describe('New Feed Selection ', function() {

        var initialFeedUrls = [];

        beforeEach(function(done) {
            loadFeed(0, function() {

                // Store all the Urls from the 1st feed
                $('.feed .entry-link').each(function(index) {
                    initialFeedUrls.push($(this).attr('href'));
                });

                loadFeed(1, function() {
                    done();
                });
            });
        });

        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
        it('changes the content', function(done) {

            var currentFeedUrls = [];

            // Get all the Urls from the current feed
            $('.feed .entry-link').each(function(index) {
                currentFeedUrls.push($(this).attr('href'));
            });

            /* 
             * If the number of feeds is the same, then we need to check that
             * the content has actually changed
             */
            if (initialFeedUrls.length == currentFeedUrls.length) {
                
                /*
                 * We check that the content has changed by checking whether a URL
                 * that originally was in the feed is gone.
                 */
                var matchCount = 0;
                initialFeedUrls.forEach(function(initialUrl) {
                    if (currentFeedUrls.includes(initialUrl)) {
                        matchCount += 1;
                    }
                });

                // There should be at least one different Url
                expect(matchCount).not.toEqual(initialFeedUrls.length);
            }

            done();
        });
    });

}());
