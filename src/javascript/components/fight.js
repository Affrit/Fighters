import { controls } from '../../constants/controls';

export async function fight(firstFighter, secondFighter) {
  return new Promise((resolve) => {

    const firstFighterHealthBar = document.getElementById('left-fighter-indicator')
    const secondFighterHealthBar = document.getElementById('right-fighter-indicator')

    const fullFirstFighterHealth = firstFighter.health
    const fullSecondFighterHealth = secondFighter.health

    const [keyQ, keyW, keyE] = controls.PlayerOneCriticalHitCombination
    const [keyU, keyI, keyO] = controls.PlayerTwoCriticalHitCombination

    const pressed = new Set()

    let firstisBloked = false
    let secondisBloked = false

    document.addEventListener('keydown', function(event){
      const action = event.code

      pressed.add(action)

      if (pressed.has(keyQ) && pressed.has(keyW) && pressed.has(keyE)){
        secondFighter.health -= getCritHit(firstFighter)
        secondFighterHealthBar.style.width = `${(100 * secondFighter.health) / fullSecondFighterHealth}%`
      }
      if (pressed.has(keyU) && pressed.has(keyI) && pressed.has(keyO)){
        firstFighter.health -= getCritHit(secondFighter)
        firstFighterHealthBar.style.width = `${(100 * firstFighter.health) / fullFirstFighterHealth}%`
      }

      switch(action){
        case controls.PlayerOneAttack:
          if (!firstisBloked && !secondisBloked){
            secondFighter.health -= getDamage(firstFighter, secondFighter)
            secondFighterHealthBar.style.width = `${(100 * secondFighter.health) / fullSecondFighterHealth}%`
            break
          }
        case controls.PlayerTwoAttack:
          if (!firstisBloked && !secondisBloked){
            firstFighter.health -= getDamage(secondFighter, firstFighter)
            firstFighterHealthBar.style.width = `${(100 * firstFighter.health) / fullFirstFighterHealth}%`
            break
          }
        case controls.PlayerOneBlock:
          firstisBloked = true
          break
        case controls.PlayerTwoBlock:
          secondisBloked = true
          break
      }

      document.addEventListener('keyup', function(event){
        const action = event.code
        if (action === controls.PlayerOneBlock || action === controls.PlayerTwoBlock){
          firstisBloked = false
          secondisBloked = false
        }
      })

      if (firstFighter.health <= fullFirstFighterHealth * 0.35){
        firstFighterHealthBar.style.backgroundColor = 'red'
      }
      if (secondFighter.health <= fullSecondFighterHealth * 0.35){
        secondFighterHealthBar.style.backgroundColor = 'red'
      }
      if (firstFighter.health <= 0 ){
        firstFighterHealthBar.style.width = '0px'
        resolve(secondFighter)
      }
      if (secondFighter.health <= 0 ){
        secondFighterHealthBar.style.width = '0px'
        resolve(firstFighter)
      }
    });

    document.addEventListener('keyup', function(event) {
      pressed.delete(event.code);
    });
  // resolve the promise with the winner when fight is over
});
}

export function getDamage(attacker, defender) { 
  const blockPower = getBlockPower(defender)
  const hitPower = getHitPower(attacker)
  return blockPower >= hitPower ? 0 : hitPower - blockPower
  // return damage
}

export function getHitPower(fighter) {
  let criticalHitChance = Math.random() * 2 + 1;
  let hitPower = fighter.attack * criticalHitChance
  return hitPower
  // return hit power
}

export function getBlockPower(fighter) {
  let dodgeChance = Math.random() * 2 + 1;
  let blockPower = fighter.defense * dodgeChance
  return blockPower
  // return block power
}

export function getCritHit(fighter){
  return 2 * fighter.attack
}
