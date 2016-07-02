var roleScrounger = {

    /** @param {Creep} creep **/
    run: function(creep) {
      if(creep.memory.scrounging && creep.carry.energy == 0) {creep.memory.scrounging = false;}
      if(!creep.memory.scrounging && creep.carry.energy == creep.carryCapacity) {creep.memory.scrounging = true;};

      var energy = creep.pos.findInRange(FIND_DROPPED_ENERGY,80);
      var targets = creep.room.find(FIND_STRUCTURES, {
          filter: (structure) => {
              return ((structure.structureType == STRUCTURE_TOWER ||
                  structure.structureType == STRUCTURE_EXTENSION ||
                  structure.structureType == STRUCTURE_CONTAINER ||
                  structure.structureType == STRUCTURE_SPAWN) &&
                  (structure.energy < structure.energyCapacity))
          }
      });

      if (creep.carry.energy == creep.carryCapacity) {
          if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
              creep.moveTo(targets[0])
          };
      }

      if (energy.length > 0) {
          var closestEnergy = creep.pos.findClosestByPath(energy);
          if (creep.pickup(closestEnergy) == ERR_NOT_IN_RANGE) {
              creep.moveTo(closestEnergy);
          } ;
      } else {
          if(creep.transfer(Game.spawns.Spawn1, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(Game.spawns.Spawn1);
          } ;
      }
    }
};
module.exports = roleScrounger;
