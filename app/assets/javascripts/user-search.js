$.UsersSearch = function(el){
  this.$el = $(el);
  this.$input = $(this.$el.find(":input"));
  this.$input.on("input", this.handleInput.bind(this));
};

$.UsersSearch.prototype.handleInput = function(e){
  // e.preventDefault();
  var inputData = e.currentTarget.value;
  var that = this;
  $.ajax({
    url: "/users/search",
    type: "get",
    data: {query: inputData},
    dataType: "json",
    success: function(response){
      that.renderResults(response);
    }
  });
};

$.UsersSearch.prototype.renderResults = function(response){
  $("ul.users").html("");
  response.forEach(function(user){
    $("ul.users").append("<li> " + user.username + "</li>");
  });
};

$.fn.usersSearch = function () {
  return this.each(function (){
    new $.UsersSearch(this);
  });
};

$(function () {
  $(".users-search").usersSearch();
});
