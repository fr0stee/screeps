var roleHarvester = require('role.harvester');
var roleBuilder = require('role.builder');
var roleUpgrader = require('role.upgrader');
var roleScrounger = require('role.scrounger');
var roleFighter = require('role.fighter');
var roleRepairer = require('role.repairer');
var roleMiner = require('role.miner');

var tower = Game.getObjectById('577234edb6fc33ff07710a25');

// Set the number of creeps per role
var fightersDesired = 5;
var harvestersDesired = 4;
var upgradersDesired = 1;
var buildersDesired = 3;
var scroungersDesired =  2;
var repairersDesired = 4;
var minersDesired = 0;

module.exports.loop = function () {
// Variables
	// Store the creeps by role
	var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
	var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
	var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
	var scroungers = _.filter(Game.creeps, (creep) => creep.memory.role == 'scrounger');
	var fighters = _.filter(Game.creeps, (creep) => creep.memory.role == 'fighter');
	var repairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer');
	var miners = _.filter(Game.creeps, (creep) => creep.memory.role == 'miner');

	// Set the name of the room to a variable
	for (var name in Game.rooms) {
		var myRoom = Game.rooms[name];
	}

	// Remove all stale memory fragments of dead creeps
	for(var name in Memory.creeps) {
		if(!Game.creeps[name]) {
			delete Memory.creeps[name];
		}
	}

	// Spawn fighters if there are hostile creeps
	var hostiles = myRoom.find(FIND_HOSTILE_CREEPS);

// If the number of creeps is less than desired, spawn a new one of that role
	//Harvesters
	if(harvesters.length < harvestersDesired && myRoom.energyAvailable >= 450) {var newName = Game.spawns.Spawn1.createCreep([WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE], undefined, {role: 'harvester'});}
	//Upgraders
	if(upgraders.length < upgradersDesired && myRoom.energyAvailable >= 450 && harvesters.length >= harvestersDesired) {var newName = Game.spawns.Spawn1.createCreep([WORK,WORK,CARRY,CARRY,MOVE,MOVE], undefined, {role: 'upgrader'});}
	//Builders
	if(builders.length < buildersDesired && myRoom.energyAvailable >= 450 && harvesters.length >= harvestersDesired && upgraders.length >= upgradersDesired){var newName = Game.spawns.Spawn1.createCreep([WORK,WORK,CARRY,CARRY,MOVE,MOVE], undefined, {role: 'builder'});}
	//Scroungers
	if(scroungers.length < scroungersDesired && myRoom.energyAvailable >= 200 && harvesters.length >= harvestersDesired && upgraders.length >= upgradersDesired && builders.length >= buildersDesired){var newName = Game.spawns.Spawn1.createCreep([CARRY,CARRY,MOVE,MOVE], undefined, {role: 'scrounger'});}
	//Repairers
	if (repairers.length < repairersDesired && myRoom.energyAvailable >= 450 && harvesters.length >= harvestersDesired && upgraders.length >= upgradersDesired && builders.length >= buildersDesired && scroungers.length >= scroungersDesired) {var newName = Game.spawns.Spawn1.createCreep([WORK,WORK,CARRY,CARRY,MOVE,MOVE], undefined, {role: 'repairer'});}
	//Repairers
	if (miners.length < minersDesired && myRoom.energyAvailable >= 300 && harvesters.length >= harvestersDesired && upgraders.length >= upgradersDesired && builders.length >= buildersDesired && scroungers.length >= scroungersDesired) {var newName = Game.spawns.Spawn1.createCreep([WORK,WORK,WORK,CARRY,MOVE], undefined, {role: 'miner'}, {mining: true});}
	//Fighters
	if (hostiles.length > 0) {
		console.log('Hostiles! '+hostiles[0].pos)
		if(fighters.length < fightersDesired && myRoom.energyAvailable >= 390) {
			var newName = Game.spawns.Spawn1.createCreep([ATTACK,ATTACK,ATTACK,MOVE,MOVE,MOVE], undefined, {role: 'fighter'});
			console.log('Spawning new fighter: ' + newName);
		};
	}

	// Tower code
	if(tower) {
		var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
		if (closestHostile) {tower.attack(closestHostile);}
	}

// Run each creep according to their role
    for(var name in Game.creeps) {
		var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {roleHarvester.run(creep);}
        if(creep.memory.role == 'upgrader') {roleUpgrader.run(creep);}
        if(creep.memory.role == 'builder') {roleBuilder.run(creep);}
		if(creep.memory.role == 'scrounger') {roleScrounger.run(creep);}
		if(creep.memory.role == 'fighter') {roleFighter.run(creep);}
		if(creep.memory.role == 'repairer') {roleRepairer.run(creep);}
		if(creep.memory.role == 'miner') {roleMiner.run(creep);}
	}
	console.log(" --- ")
}
