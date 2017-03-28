$(document).ready(function(){

  var quote = "";
  var author= "";


  function getNewQuote(){
    $.ajax({
            url: "http://api.forismatic.com/api/1.0/",
            jsonp: "jsonp",
            dataType: "jsonp",
            data: {
                    method: "getQuote",
                    lang: "en",
                    format: "jsonp"
                  },
            success: function(response){
                quote = response.quoteText;

              //Make quote string into an array
              var arrayQuote = quote.split("");

              //Store the last variable of the array
              var checkLast = arrayQuote[arrayQuote.length - 1];

              // Everytime the last element = " " splice, because sometimes the array has > 1 " " at the end
              for (i=1; checkLast == " "; i++){
                var baddieLocation = arrayQuote.length - 1;
                i = arrayQuote.splice(baddieLocation, 1)
                checkLast = arrayQuote[arrayQuote.length - 1]
              }
              var fixedQuote = arrayQuote.join(" ");

                // "\"" + fixedQuote + "\""

                author = response.quoteAuthor;
                $("#quote").text(quote);
                if(author){
                  document.getElementById("author").innerHTML = "&#8212" + " " + author;
                }else{
                  //author = " — Anonymous";
                  $('#author').text("&#8212" + " " + Anonymous);
                }
              }
          });
        }
  $(".getQuote").on("click", function(event){
    event.preventDefault();
    getNewQuote();
  });

  $("#tweetButton").on('click', function(){
      if(quote == ""){
        alert("Generate a quote first, please!");
      }else{
        if(author !== ""){
            window.open("https://twitter.com/intent/tweet/?text=" + quote + " — " + author);
        }
        else{
          window.open("https://twitter.com/intent/tweet/?text=" + quote + " — Anonymous");
        }
      }
  });
});

/* JSON API Call for Twitter POST
$("#share").on("click", function(){
  function updateTweeter(){
    $.ajax({
      url: "https://api.twitter.com/1.1/statuses/update.json",
      data:

    })
  }
});

<a class='twitter-share-button'
 href='https://twitter.com/share'
 data-size='large'
 data-text=" quote + author"
 data-via='forismatic'>
 </a>"
*/
