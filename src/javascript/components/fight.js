import { controls } from '../../constants/controls';

export async function fight(firstFighter, secondFighter) {
  return new Promise((resolve) => {

    let firstFighterHealthBar = document.getElementById('left-fighter-indicator')
    let secondFighterHealthBar = document.getElementById('right-fighter-indicator')

    const fullFirstFighterHealth = firstFighter.health
    const fullSecondFighterHealth = secondFighter.health

    let firstisBloked = false
    let secondisBloked = false

    console.log(`firstHealth = ${firstFighter.health}`)
    console.log(`secondHealth = ${secondFighter.health}`)

    document.addEventListener('keydown', function(event){
      const action = event.code
      console.log(action);

      switch(action){
        case controls.PlayerOneAttack:
          if (!firstisBloked && !secondisBloked){
            secondFighter.health -= getDamage(firstFighter, secondFighter)
            secondFighterHealthBar.style.width = `${(100 * secondFighter.health) / fullSecondFighterHealth}%`
            console.log(`secondHealth = ${secondFighter.health}`)
            break
          }
        case controls.PlayerTwoAttack:
          if (!firstisBloked && !secondisBloked){
            firstFighter.health -= getDamage(secondFighter, firstFighter)
            firstFighterHealthBar.style.width = `${(100 * firstFighter.health) / fullFirstFighterHealth}%`
            console.log(`firstHealth = ${firstFighter.health}`)
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
      if (firstFighter.health <= 0 ){
        firstFighterHealthBar.style.width = '100%'
        firstFighterHealthBar.style.backgroundColor = 'red'
        resolve(secondFighter)
      }
      if (secondFighter.health <= 0 ){
        secondFighterHealthBar.style.width = '100%'
        secondFighterHealthBar.style.backgroundColor = 'red'
        resolve(firstFighter)
      }
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
