import Vector from 'victor';

const ENERGY_WEIGHT_POWER = 3.5;
const ENERGY_PEAK = 3;

export class ForceFieldCalculator {
  constructor(energies) {
    this.energies = energies;
  }

  absStrengthSum() {
    return this.energies.reduce((prev, current) => prev + Math.abs(current.strength) , 0);
  }

  forceVectorAtPoint(x, y) {
    const vectorToPOI = new Vector(x, y);
    const absStrengthSum = this.absStrengthSum();

    return this.energies.reduce(
      (result, energy) => {
        const energyVector = new Vector(energy.x, energy.y);
        const distance = vectorToPOI.distance(energyVector);
        const length = energy.strength / absStrengthSum;
        const weight = (ENERGY_PEAK / Math.pow(distance + 1, ENERGY_WEIGHT_POWER));
        const energyDirectionVector = directionVector(energyVector, length);
        return result.add(energyDirectionVector.multiplyScalar(weight));
      },
      new Vector(0, 0),
    );
  }
}

function directionVector(energyVector, length) {
  const sign = (energyVector.x > 0) ? 1 : -1;
  return energyVector.clone().multiplyScalar(sign * length);
}
