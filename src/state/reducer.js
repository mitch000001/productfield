import Immutable, {Map, List} from 'immutable';
import {ForceFieldCalculationSingleton, coordinateSystemTransformation} from '../ForceFieldCalculation'
import {
  SET_ENERGY_STRENGTH,
  SET_STATE,
  MOVE_ENERGY,
  EDIT_ENERGY,
  START_DRAGGING,
  STOP_DRAGGING,
  DELETE_ENERGY,
  ADD_ENERGY,
  SET_STRENGTH,
  SET_PRESENTATION,
  SET_MUTE,
} from './action_types';

function setState(state, newState) {
  return state.merge(newState);
}

function setMute(state, mutedEnergy) {
  var mutedEnergies = state.get('energies').map(function(energy) {
    if (energy.get('id') == mutedEnergy.get('id')) {
      return energy.merge(mutedEnergy);
    } else {
      return energy;
    }
  });

  return state.set('energies', mutedEnergies);
}

function moveEnergy(state, newEnergy) {
  var newEnergies = state.get('energies').map(function(energy) {
    if (energy.get('id') == newEnergy.get('id')) {
      return energy.merge(newEnergy);
    } else {
      return energy
    }
  });

  return state.set('energies', newEnergies);
}

function addEnergy(state, energy) {
  const currentEnergies = state.get('energies');
  const nextID = (currentEnergies.size > 0) ? (currentEnergies.max().get('id') + 1) : 1;
  const newEnergies = currentEnergies.push(Map({id: nextID, x: energy.x, y: energy.y, strength: energy.strength || 0}));
  return state.set('energies', newEnergies);
}

function editEnergy(state, energy) {
  return state.set('editingEnergy', energy)
}

function setPresentation(state, presentation = false) {
  return state.set('isPresentation', presentation)
}

function deleteEnergy(state) {
  var deletingEnergyId = state.getIn(['editingEnergy', 'id'])
  var newEnergies = state.get('energies').filter(function(energy) {
    return energy.get('id') !== deletingEnergyId;
  });
  return state.set('editingEnergy', null).set('energies', newEnergies);
}

function setStrength(state, newStrength) {
  const energyId = state.getIn(['editingEnergy', 'id'])

  return setEnergyStrength(
    state.setIn(['editingEnergy', 'strength'], newStrength),
    energyId,
    newStrength,
  );
}

function setEnergyStrength(state, energyId, newStrength) {
  const energyIndex = state.get('energies', List()).findIndex((energy) => energy.get('id') === energyId);
  if (energyIndex !== -1) {
    return state.setIn(['energies', energyIndex, 'strength'], newStrength);
  } else {
    return state;
  }
}

const appState = Map({
  energies: List(),
})

export default function(state = appState, action) {
  switch (action.type) {
  case SET_STATE:
    return setState(state, action.state);
  case MOVE_ENERGY:
    return setState(state, moveEnergy(state, action.energy));
  case ADD_ENERGY:
    return setState(state, addEnergy(state, action.energy));
  case DELETE_ENERGY:
    return setState(state, deleteEnergy(state));
  case EDIT_ENERGY:
    return setState(state, editEnergy(state, action.energy));
  case START_DRAGGING:
    return setState(state, state.set('dragging', true));
  case STOP_DRAGGING:
    return setState(state, state.set('dragging', false));
  case SET_STRENGTH:
    return setState(state, setStrength(state, action.strength));
  case SET_PRESENTATION:
    return setState(state, setPresentation(state, action.presentation));
  case SET_MUTE:
    return setState(state, setMute(state, action.energy));
  case SET_ENERGY_STRENGTH:
    return setEnergyStrength(state, action.id, action.strength);
  default:
    return state;
  }
}

export function observeEnergies(store, onChange) {
  return observeStore(store, (state) => state.get('energies'), onChange);
}

export function observeStore(store, select, onChange) {
  let currentState;

  function handleChange() {
    const nextState = select(store.getState());
    if (!Immutable.is(nextState, currentState)) {
      currentState = nextState;
      onChange(currentState);
    }
  }

  const unsubscribe = store.subscribe(handleChange);
  handleChange();
  return unsubscribe;
}
