var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {
      // Test to see if creep should be building
	    if(creep.memory.building && creep.carry.energy === 0) {creep.memory.building = false;}
	    if(!creep.memory.building && creep.carry.energy === creep.carryCapacity) {creep.memory.building = true;}

        if(!creep.memory.building) {
            // Find the closest source of energy
            var closeSource = creep.pos.findClosestByPath(creep.room.find(FIND_SOURCES));
            if (closeSource.energy != 0) {
                if(creep.harvest(closeSource) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(closeSource);
                }
                //else {
                //    if (creep.
                //}
            }
        } else {
            var constSite = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
            if (constSite != undefined) {
                if(creep.build(constSite) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(constSite);
                }
            } else {
                //Find things to repair
                var targets = creep.room.find(FIND_STRUCTURES, {filter: (structure) => {
                    return (
                        structure.structureType == STRUCTURE_RAMPART  && structure.hits < structure.hitsMax * .5 ||
                        structure.structureType == STRUCTURE_TOWER  && structure.hits < structure.hitsMax * .8 ||
            			structure.structureType == STRUCTURE_ROAD && structure.hits < structure.hitsMax * .6 ||
            			structure.structureType == STRUCTURE_WALL && structure.hits < structure.hitsMax *.0005
                        )
            		}});

                if (targets.length > 0) {
                    var closestRepair = creep.pos.findClosestByPath(targets);
                    if(creep.repair(closestRepair) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(closestRepair);
                    }
                }
            }
        }
    }
};

module.exports = roleBuilder;
