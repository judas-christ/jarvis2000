(function() {

  'use strict';

  var searchInput = document.querySelector('[name="q"]');

  jarvis.init({
    parser: jarvis.parsers.regexParser({
      commands: {
        '^hello.*': () => {
          jarvis.say('Hello!');
        },
        'search(?: for)? (.+)': match => {
          let query = match[1];
          console.log('search for:', query);
          location.href = '/?q=' + encodeURIComponent(query);
          // searchInput.value = query;
          // searchInput.form.submit();
        },
        '(?:go|navigate) back': () => {
          history.back();
        },
        '(?:go|navigate) to (.+)': match => {
          var linkText = match[1];
          console.log('going to', linkText);
          var links = document.querySelectorAll('a[href]');
          for (let link of[].slice.call(links, 0).filter(l => l.offsetWidth > 0)) {
            if (link.innerText.toLowerCase() === linkText.toLowerCase()) {
              console.log('found a link:', link);
              location.href = link.href;
              return;
            }
          }
        },
        'scroll (down|up)': match => {
          var dir = match[1];
          console.log('scrolling', dir);
          jarvis.say('Scrolling '+dir+'.');
          var vh = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
          window.scrollBy(0, vh * 0.85 * (dir === 'up' ? -1 : 1));
        },
        'find (.+)': match => {
          var text = match[1];
          window.find(text);
        },
        'help': () => {
          jarvis.say('I know these commands: "search for (something)" to search for "something". "go to (link text)" or "navigate to (link text)" to navigate to a link with the text "link text". "scroll up" and "scroll down" to scroll up or down. "hello" to say hello. What can I do for you?');
        }
      }
    })
  });

  //do search
  var searchQuery = location.search.match(/[?&]q=([^?&]+)/);
  if (searchQuery) {
    searchQuery = decodeURIComponent(searchQuery[1].replace(/\+/g, ' ')).toLowerCase();
    console.log('you did a search for', searchQuery);
    searchInput.value = searchQuery;
    let resultTalk = 'I found these results for "' + searchQuery + '": ';
    let searchResults = document.querySelector('.search-results');
    searchResults.style.display = null;
    let hitCount = 0;
    for (let li of[].slice.call(searchResults.children, 0)) {
      if (li.innerText.toLowerCase().indexOf(searchQuery) >= 0) {
        li.style.display = null;
        if(hitCount > 10) {
          resultTalk += ' and more'
        } else {
          resultTalk += li.innerText + ', '
        }
        hitCount++;

      } else {
        li.style.display = 'none';
      }
    }
    if (hitCount > 0) {

      resultTalk = resultTalk.replace(/, $/, '.');
      resultTalk += ' Did you find what you were looking for?';
    } else {
      resultTalk = 'I\'m sorry. I did not find any match for your search query. Would you like to search for something else? May I suggest "wild", for instance?';
    }
    jarvis.say(resultTalk);
  }

  var movieTitle = location.search.match(/[?&]m=([^?&]+)/);
  if (movieTitle) {
    movieTitle = decodeURIComponent(movieTitle[1].replace(/\+/g, ' '));
    [].forEach.call(document.querySelectorAll('.js-movie__title'), el => {
      el.innerText = movieTitle;
    });
  }

})();
