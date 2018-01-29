// import { filterResult } from "gulp-eslint/util";

// Built by LucyBot. www.lucybot.com
$(document).ready(function(){
  $('select').on('change', function (event) {
   event.preventDefault();


    var url = "https://api.nytimes.com/svc/topstories/v2/";
    var value = $(this).val();
    url += value + ('.json');
    url += '?' + $.param({
      'api-key': "a0f2fb5adadf4660ac0eb18fbb12876e"
    });

    $('.artList').empty(),

    // console.log(url);


    $.ajax({
      url: url,
      method: 'GET',
      datatype: JSON
    }).done(function (data) {
      // console.log(data.results);


      var filtered = data.results.filter(function (el) {
        return el.multimedia.length > 0;
      }).slice(0, 12)
      // console.log(filtered);

      $.each(filtered, function (index, value) {
        // console.log(value);
 // $('.artList').append('<li>' + value.abstract + '</li>');
        var articlePic = '';


        articlePic += '<li>';
        articlePic += '<div class="pictures" style="background-image:url(' + value.multimedia[4].url + ')">';
        articlePic += '<div class="text">';
        articlePic += '<p>' + value.abstract + '<p></div></div>';
        articlePic += '</li>';

        $('.artList').append(articlePic);

      })



    }).fail(function (err) {
      throw err;
    });
  });
});