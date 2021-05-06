import { createElement } from '../helpers/domHelper';
import { getFighterInfo } from '../components/fighterSelector'

export function createFighterPreview(fighter, position) {
  const positionClassName = position === 'right' ? 'fighter-preview___right' : 'fighter-preview___left';
  const fighterElement = createElement({
    tagName: 'div',
    className: `fighter-preview___root ${positionClassName}`,
  });

  const { name, health, attack, defense } = fighter;
  const fighterImage = createFighterImage(fighter);
  const fighterProps = createElement({
    tagName: 'div',
    className: `fighter-prop`,
  });
  
  fighterProps.innerHTML = `
  <h1>${name}</h1>
  <div>health: ${health}</div>
  <div>attack: ${attack}</div>
  <div>defense: ${defense}</div>`;
  fighterElement.append(fighterImage, fighterProps);
  // todo: show fighter info (image, name, health, etc.)

  return fighterElement;
}

export function createFighterImage(fighter) {
  const { source, name } = fighter;
  const attributes = { 
    src: source, 
    title: name,
    alt: name 
  };
  const imgElement = createElement({
    tagName: 'img',
    className: 'fighter-preview___img',
    attributes,
  });

  return imgElement;
}
