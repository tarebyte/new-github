if (document.URL.split(/\//g).length - 1 == 4) {
  injectCSS();

  var githubRepo = document.URL.split('/')[4];
  var githubUser = document.URL.split('/')[3];

  generateGeoPatternBackground(githubRepo);
  createAndInsertCompareLink();
  moveCreateNewFile();
  moveBranchListing();

  [
    '.octicon-repo:before',
    '.author > a > span',
    '.path-divider',
    '.js-repo-home-link',
    '.fork-flag > .text > a',
    '.fork-flag'
  ].forEach(whiteOut);

  if ($('.repo-label > span').text() == 'public')
    $('.repo-label > span').css('color', 'white');

  [
    '.subscription',
    '.overall-summary',
    $('div.tooltipped-s').attr('aria-label', 'Show language statistics'),
    '.breadcrumb > .repo-root',
    '.breadcrumb > .separator',
    '.sunken-menu-separator',
    '.in-mid-page'
  ].forEach(remove)
}

function generateGeoPatternBackground(githubRepo) {
  var pattern = GeoPattern.generate(githubRepo, {baseColor: '#333'});

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
                      .css({
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

function moveBranchListing() {
  $buttonContainer = $('.select-menu').last();
  $buttonContainer.children().find('i').remove();

  // Clear out uneeded button styles
  $buttonContainer
                .children().first()
                .css({
                  'color': 'white',
                  'background': 'none',
                  'text-shadow': 'none',
                  'border': 'none',
                  'font-weight': 'normal',
                  'font-size': '15px'
                });

  $listEl = $('<li>').append($buttonContainer);
  $('.pagehead-actions').prepend($listEl);
}

// This is due to the constraint right now that I only style the main repo page
function injectCSS() {
  var styleCSS = "<style>\
                    .white { \
                        color: white !important; \
                    }\
                    .octicon-repo:before {\
                      color: white !important;\
                      opacity: 0.6 !important;\
                    }\
                    .starred, .unstarred, .social-count, .fork-button {\
                      border-color: rgba(51, 51, 51, 0.6) !important;\
                    }\
                    </style>";

  $('head').append(styleCSS);
}

function remove(element, index, array) { $(element).remove(); };
function whiteOut(element, index, array) { $(element).addClass('white') };
