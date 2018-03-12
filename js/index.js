$(document).ready(function(){
  $('.loader').hide();

  $('select').on('change', function(event) {
    event.preventDefault();

    $('.loader').show();

    var url = 'https://api.nytimes.com/svc/topstories/v2/';
    var value = $(this).val();
    url += value + ('.json');
    url += '?' + $.param({
      'api-key': 'a0f2fb5adadf4660ac0eb18fbb12876e'
    });

    $('.artList').empty(),

      $.ajax({
        url: url,
        method: 'GET',
        datatype: JSON
      }).done(function(data) {


        var filtered = data.results.filter(function(el) {
          return el.multimedia.length > 0;
        }).slice(0, 12)

        $.each(filtered, function(index, value) {

          var articlePic = '';
          var articleLink= value.url;


          articlePic += '<li class="nyt-li" style="background-image:url(' + value.multimedia[4].url + ')">';
          articlePic += '<a href="' + articleLink + '" target="_blank">';  
          articlePic += '<div class="text">';
          articlePic += '<p>' + value.abstract + '<p></div></div>';
          articlePic += '</a>';
          articlePic += '</li>';
          
          $('.loader').hide();
          $('.artList').append(articlePic);     
          $('.container').addClass('article-true');
          $('.container').removeClass('container'); 


        })

      }).fail(function(err) {
        throw err;
      });
  });
});