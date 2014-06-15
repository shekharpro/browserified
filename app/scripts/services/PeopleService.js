'use strict';

var PeopleService = function() {
  function getPeopleDetails(){
    return {"Sample":"People1"};
  }

  return {"getPeopleDetails":getPeopleDetails}
};

module.exports = PeopleService;
