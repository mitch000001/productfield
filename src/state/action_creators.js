import {
  SET_ENERGY_STRENGTH,
  SET_EDITING_ENERGY_ID,
  SET_ENERGY_IS_MUTED,
  SET_STATE,
  MOVE_ENERGY,
  EDIT_ENERGY,
  DELETE_ENERGY,
  ADD_ENERGY,
  START_DRAGGING,
  STOP_DRAGGING,
  SET_PRESENTATION,
} from './action_types';

export function setEnergyStrength(energyId, strength) {
  return {
    type: SET_ENERGY_STRENGTH,
    id: energyId,
    strength,
  }
}

export function setEditingEnergyId(energyId) {
  return {
    type: SET_EDITING_ENERGY_ID,
    id: energyId,
  };
}

export function setEnergyIsMuted(energyId, isMuted) {
  return {
    type: SET_ENERGY_IS_MUTED,
    id: energyId,
    isMuted,
  };
}

export function moveEnergy(energyId, x, y) {
  return {
    type: MOVE_ENERGY,
    id: energyId,
    x,
    y,
  };
}

export function deleteEnergy(energyId) {
  return {
    type: DELETE_ENERGY,
    id: energyId,
  };
}

export function setState(state) {
  return {
    type: SET_STATE,
    state
  };
}

export function startDragging() {
  return {
    type: START_DRAGGING
  };
}

export function stopDragging() {
  return {
    type: STOP_DRAGGING
  };
}

export function addEnergy(energy) {
  return {
    type: ADD_ENERGY,
    energy
  };
}

export function setPresentation(presentation) {
  return {
    type: SET_PRESENTATION,
    presentation
  };
}
