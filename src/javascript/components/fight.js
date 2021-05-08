import { controls } from '../../constants/controls';

export async function fight(firstFighter, secondFighter) {
  return new Promise((resolve) => {
    // resolve the promise with the winner when fight is over
  });
}

export function getDamage(attacker, defender) { 
  return getBlockPower(defender) >= getHitPower(attacker) ? 0 : getHitPower(attacker) - getBlockPower(defender)
  // return damage
}

export function getHitPower(fighter) {
  let criticalHitChance = Math.floor(Math.random() * 2) + 1;
  let hitPower = fighter.attack * criticalHitChance
  return hitPower
  // return hit power
}

export function getBlockPower(fighter) {
  let dodgeChance = Math.floor(Math.random() * 2) + 1;
  let blockPower = fighter.defense * dodgeChance
  return blockPower
  // return block power
}

export function getCritHit(fighter){
  return 2 * fighter.attack
}
