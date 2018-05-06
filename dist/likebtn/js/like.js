(function() {
  'use strict';

  // Components

  var likeComponent = Vue.extend({
    template: '<button>Like</button>'
  });

  var app = new Vue({
    el: '#app',
    components: {
      'like-component': likeComponent
    }
  });

})();
