var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {
  		if(creep.memory.upgrading && creep.carry.energy == 0) {creep.memory.upgrading = false;}
        if(!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity) {creep.memory.upgrading = true;}

  		if (creep.memory.upgrading) {
  			if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
  				creep.moveTo(creep.room.controller)
  			}
  		} else {
            // Find the closest source of energy
            var closeSource = creep.pos.findClosestByPath(creep.room.find(FIND_SOURCES));
            if(creep.harvest(closeSource) == ERR_NOT_IN_RANGE) {
                creep.moveTo(closeSource);
            }
  		}
  	}
};

module.exports = roleUpgrader;
