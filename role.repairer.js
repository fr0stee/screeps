var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {
      // Test to see if creep should be repairing
	    if(creep.memory.repairing && creep.carry.energy == 0) {creep.memory.repairing = false;}
	    if(!creep.memory.repairing && creep.carry.energy == creep.carryCapacity) {creep.memory.repairing = true;};

        if(!creep.memory.repairing) {
            // Find the closest source of energy
            var closeSource = creep.pos.findClosestByPath(creep.room.find(FIND_SOURCES));
            if(creep.harvest(closeSource) == ERR_NOT_IN_RANGE) {
                creep.moveTo(closeSource.pos);
            } else {
                creep.harvest(closeSource);
            }
        } else {
            //Find things to transfer energy to
            var targets = creep.room.find(FIND_STRUCTURES, {filter: (structure) => {
                return (
                    structure.structureType == STRUCTURE_RAMPART  && structure.hits < structure.hitsMax * .5 ||
                    structure.structureType == STRUCTURE_TOWER  && structure.hits < structure.hitsMax * .8 ||
        			structure.structureType == STRUCTURE_ROAD && structure.hits < structure.hitsMax * .6 ||
        			structure.structureType == STRUCTURE_WALL && structure.hits < structure.hitsMax *.0005
                    )
        		}});
            if (targets.length > 0) {
                if(creep.repair(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0]);
                } else {
                    creep.repair(targets[0]);
                }
            } else {
                creep.moveTo(Game.spawns.Spawn1)
            }
        }
    }
};

module.exports = roleBuilder;
