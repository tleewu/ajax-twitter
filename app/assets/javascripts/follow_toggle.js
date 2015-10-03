$.FollowToggle = function(el) {
  this.$el = $(el);
  this.followState = this.$el.data("initial-follow-state");
  this.userId = this.$el.data("user-id");
  this.render();
  this.$el.on("click", this.handleClick.bind(this));
};

$.FollowToggle.prototype.render = function () {
  if(this.followState === "followed"){
    this.clickVerb = "delete";
    this.$el.html("Unfollow!");
  } else if ((this.followState === "unfollowed")){
    this.clickVerb = "post";
    this.$el.html("Follow!");
  }
};

$.FollowToggle.prototype.handleClick = function(e){
  e.preventDefault();
  var that = this;
  $.ajax({
    url: "/users/" + this.userId + "/follow",
    type: this.clickVerb,
    dataType: "json",
    success: function(){
      if (that.followState === "followed"){
        that.followState = "unfollowed";
      } else {
        that.followState = "followed";
      }
      that.render();
    }
  });
};

$.fn.followToggle = function () {
  return this.each(function () {
    new $.FollowToggle(this);
  });
};

$(function () {
  $("button.follow-toggle").followToggle();
});
