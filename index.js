const colors    = require('colors');
const _         = require('lodash');

let SillyFighter = function () {
}

const newBond = '{{blank}} used to spot me at the gym, they can have some of my protein shake.';
const consoleCols = process.stdout.columns;

let num = 0;
SillyFighter.prototype.extendDataCompiler = function (compiler, opts) {
  //compiler.config.debug = true;
  compiler.registerStartingStep((d) => {
    var data = (d);
    console.log(('/' + '`'.repeat(consoleCols-2) + '\\').magenta)
    console.log(' Running '.magenta + ' dw-silly-fighter '.bgMagenta.black + (' module ' + (' ' + opts.compilerType + ' ').bgWhite + ' compile step').magenta);
    let moves = data.moves;
    moves.fighter_dwarf.description = moves.fighter_dwarf.description.replace('share a drink', 'get uproariously drunk');
    moves.bend_bars_lift_gates.name = 'Do You Even Lift?';
    moves.superior_warrior.description = moves.superior_warrior.description.replace('impress, dismay, or frighten your enemy', 'make your enemy poop themselves');
    console.log(' Changed some flavor of the following fighter moves: ');
    console.log('   dwarf_fighter, bend_bars_lift_gates, superior_warrior'.gray);

    let fighter = data.classes.fighter;
    fighter.name = fighter.name + num;
    let bonds =  fighter.bonds; //I don't know why clone is required here, but it is. Otherwise the second compiler to run gets the bonds added twice
    bonds.push(newBond);
    console.log(' Added new Fighter bond');
    fighter.names.human = ['Todd', 'Francis', 'Sheila', 'Ruth', 'Murray', 'Tim', 'Katie'];
    console.log(' Changed fighter Human names');
    data.moves = moves;
    fighter.bonds = bonds;
    data.classes.fighter = fighter;


    //Give the fighter a lightsaber
    data.equipment.lightsaber = {
      name: 'Lightsaber',
      description: 'From a more civilized age.',
      tags: ['close', 'dangerous']
    }

    console.log(' Give Fighter a lightsaber option');
    fighter.gear_choices[0].list.push("{{item 'lightsaber' uppercase=true}} or bad breath");

    console.log(('\\' + '_'.repeat(consoleCols-2) + '/').magenta)
    return data;
  });
}

SillyFighter.prototype.extendRawCompiler = function (compiler) {
  this.extendDataCompiler(compiler, {
    compilerType: 'raw'
  });
}

SillyFighter.prototype.extendBasicCompiler = function (compiler) {
  this.extendDataCompiler(compiler, {
    compilerType: 'basic'
  });
  compiler.registerStep((d) => {
    return d;
  });
}

module.exports = SillyFighter;