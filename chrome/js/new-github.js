if (document.URL.split(/\//g).length - 1 == 4) {
  var githubRepo = document.URL.split('/')[4];
  var githubUser = document.URL.split('/')[3];

  [
    '.octicon-repo:before',
    '.author > a > span',
    '.path-divider',
    '.js-repo-home-link'
  ].forEach(whiteOut);

  // White text doesn't look good with the gold background
  if ($('.repo-label > span').text() == 'public')
    $('.repo-label > span').css('color', 'white');

  [
    '.subscription',
    '.overall-summary',
    $('div.tooltipped-s').attr('aria-label', 'Show language statistics'),
    '.breadcrumb > .repo-root',
    '.breadcrumb > .separator'
  ].forEach(remove)

  generateGeoPatternBackground();
  createAndInsertCompareLink();
  moveCreateNewFile();
}

function generateGeoPatternBackground() {
  var repo = $('.js-current-repository').text();
  var pattern = GeoPattern.generate(repo);

  $('.pagehead').css(
    {
    'border-bottom': 'none',
    'padding': '2.5% 0',
    'background-image': pattern.toDataUrl()
    }
  );
}

function createAndInsertCompareLink() {
  var $compareLink = $('.file-navigation > a')
                      .removeClass()
                      .addClass('tooltipped tooltipped-n')
                      .css(
                        {
                        'color':'white',
                        'font-size': '15px',
                        'padding-right': '20px'
                        })
                      .append('compare');
  $('.file-navigation > a').remove();

  $listEl = $('<li>').append($compareLink);
  $('.pagehead-actions').prepend($listEl);
}

function moveCreateNewFile() {
  $createNewFile = $('.js-new-blob-form').css('color', 'white');
  $divider = $("<span class='path-divider new-github' style='color: white'>/</span>");

  $divider.insertAfter('.entry-title > strong');
  $createNewFile.insertAfter('.new-github');
  $('.js-new-blob-submit').css({'color': 'white', 'padding-left': '5px'});
}

function remove(element, index, array) { $(element).remove(); };
function whiteOut(element, index, array) { $(element).css('color', 'white') };

