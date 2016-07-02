var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        //Set flags to see if creep should be harvesting
		if(creep.memory.harvesting && creep.carry.energy == 0) {creep.memory.harvesting = false;}
		if(!creep.memory.harvesting && creep.carry.energy == creep.carryCapacity) {creep.memory.harvesting = true;}

        if(!creep.memory.harvesting) {
            // Find the closest source of energy
            var closeSource = creep.pos.findClosestByPath(creep.room.find(FIND_SOURCES));
            if (closeSource.energy != 0){
                console.log(closeSource);
                if(creep.harvest(closeSource) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(closeSource);
                }
            }
            else {
                var closeContainer = creep.pos.findClosestByPath(creep.room.find(STRUCTURE_CONTAINER));
                console.log(closeContainer);
                if(closeContainer.transfer(creep, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                    creep.moveTo(closeContainer);
                }
            }
        }
        else {
            //Find things to transfer energy to
            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (((structure.structureType == STRUCTURE_TOWER ||
                        structure.structureType == STRUCTURE_EXTENSION ||
                        structure.structureType == STRUCTURE_SPAWN) &&
                        (structure.energy < structure.energyCapacity)) ||
                        (structure.structureType == STRUCTURE_CONTAINER &&
                        structure.store[RESOURCE_ENERGY] < structure.storeCapacity))
                }
            });
            if (targets.length > 0) {
                var close = creep.pos.findClosestByPath(targets);
                if(creep.transfer(close, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(close);
                }
            }
            else {
                if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.controller)
                }
            }
        }
	}
};

module.exports = roleHarvester;
