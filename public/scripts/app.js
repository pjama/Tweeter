var modal;

$(document).ready(function() {
  loadTweets();
  
  $(".new-tweet").submit(function(event) {
    event.preventDefault();
    var formData = $(this).serialize();
    console.log("formData", formData)
    $.ajax({
      url: "/tweets",
      type: "post",
      data: formData
    }).done(function(data) {
      console.log("Response:", data);
      $(".new-tweet-text").val("");
    });
    return false;
  });
  
  modal = new Modal();
});

function loadTweets() {
  $.ajax({
    url: "/tweets",
    dataType: "json"
  }).done(function(result) {
    console.log("result:", result);
    renderTweets(result);
  });
}

function renderTweets(tweets) {
  if (!tweets || !tweets.length) {
    console.warn("Expected an array of tweets");
    return;
  }
  var tweetsContainer = $("#tweets-container");
  for (var i=0; i<tweets.length; i++) {
    var tweetElement = createTweetElement(tweets[i]);
    tweetsContainer.append(tweetElement);
  }
}

function createTweetElement(tweetData) {
  var tweetElement = $("<div/>").addClass("tweet")
        .append($("<img/>").addClass("user-avatar").attr("src", "http://placehold.it/100x100"))
        .append($("<div/>").addClass("tweet-body")
          .append($("<div/>").addClass("tweet-header")
            .append($("<span/>").addClass("user-name").text(tweetData.user.name))
            .append($("<span/>").addClass("user-handle").addClass("light-text").text(tweetData.user.handle))
          )
          .append($("<div/>").addClass("tweet-text")
            .append($("<span/>").text(tweetData.content["text"]))
        ));
  return tweetElement;
}

function Modal() {
  var closeButtonElement = $(".close-button");
  var ctx = this;
  closeButtonElement.click(function(e) {
    ctx.hide();
  });
}

Modal.prototype.show = function(avatarURL, userName, userHandle) {
  var modalElement = $(".opaque-overlay");
  modalElement.css("visibility", "visible");
  
  var avatarElement = $("");
};

Modal.prototype.hide = function() {
  var modalElement = $(".opaque-overlay");
  modalElement.css("visibility", "hidden");
};
