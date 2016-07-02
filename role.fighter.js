var roleFighter = {

    /** @param {Creep} creep **/
    run: function(creep) {
      var target = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
      if (target) {
        creep.say("Found hostile at: "+target.pos)
        if(creep.attack(target) == ERR_NOT_IN_RANGE) {
            creep.moveTo(target);
        }
      }

    }
};
module.exports = roleFighter;
