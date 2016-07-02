var roleMiner = {

    /** @param {Creep} creep **/
    run: function(creep) {
        //Set flags to see if creep should be mining
		if(creep.memory.mining && creep.carry.energy == 0) {creep.memory.mining = true;}
		if(!creep.memory.mining && creep.carry.energy == creep.carryCapacity) {creep.memory.mining = false;}

        if(creep.memory.mining) {
            // Find the closest source of energy
            var closeSource = creep.pos.findClosestByPath(creep.room.find(FIND_SOURCES));
            if(creep.harvest(closeSource) == ERR_NOT_IN_RANGE) {
                creep.moveTo(closeSource.pos);
            }
        } else {
            //Find things to transfer energy to
            var targets = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (structure) => {
                    return ((structure.structureType == STRUCTURE_EXTENSION ||
                        structure.structureType == STRUCTURE_CONTAINER ||
                        structure.structureType == STRUCTURE_SPAWN) &&
                        (structure.energy < structure.energyCapacity))
                }
            });

            if(targets.length > 0) {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0]);
                }
            } else {
                if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.controller)
                }
            }
        }
	}
};

module.exports = roleMiner;
