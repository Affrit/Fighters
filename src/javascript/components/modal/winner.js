import { showModal } from './modal'

export function showWinnerModal(fighter) {
  const winner = {
    title: `WINNER IS ${fighter.name}!!!`,
    bodyElement: `Congratulations ${fighter.name}!`,
    onClose: () => {
      window.location.reload()
    },
  }
  showModal(winner)
  // call showModal function 
}
