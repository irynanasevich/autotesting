package airport;

import model.ClassificationLevel;
import model.ExperimentalType;
import model.MilitaryType;
import plane.ExperimentalPlane;
import plane.MilitaryPlane;
import plane.PassengerPlane;
import plane.Plane;

import java.util.*;

public class Airport {
    private final List<Plane> planes;

    public Airport(List<Plane> planes) {
        this.planes = planes;
    }

    public List<Plane> getPlanes() {
        return planes;
    }

    public List<PassengerPlane> getPassengerPlanes() {
        List<PassengerPlane> passengerPlanes = new ArrayList<>();

        for (Plane plane : planes) {
            if (plane instanceof PassengerPlane) {
                passengerPlanes.add((PassengerPlane) plane);
            }
        }

        return passengerPlanes;
    }

    public List<MilitaryPlane> getMilitaryPlanes() {
        List<MilitaryPlane> militaryPlanes = new ArrayList<>();

        for (Plane plane : planes) {
            if (plane instanceof MilitaryPlane) {
                militaryPlanes.add((MilitaryPlane) plane);
            }
        }

        return militaryPlanes;
    }



    public PassengerPlane getPassengerPlaneWithMaxPassengersCapacity() {
        List<PassengerPlane> passengerPlanes = getPassengerPlanes();
        PassengerPlane passengerPlaneWithMaxCapacity = passengerPlanes.get(0);

        for (int i = 0; i < passengerPlanes.size(); i++) {
            if (passengerPlanes.get(i).getPassengersCapacity() > passengerPlaneWithMaxCapacity.getPassengersCapacity()) {
                passengerPlaneWithMaxCapacity = passengerPlanes.get(i);
            }
        }

        return passengerPlaneWithMaxCapacity;
    }

    public List<MilitaryPlane> getMilitaryPlanesByCertainType(MilitaryType militaryType) {
        List<MilitaryPlane> militaryPlanes = getMilitaryPlanes();
        List<MilitaryPlane> militaryPlanesByCertainType = new ArrayList<>();

        for (MilitaryPlane militaryPlane : militaryPlanes) {
            if (militaryPlane.getType() == militaryType) {
                militaryPlanesByCertainType.add(militaryPlane);
            }
        }

        return militaryPlanesByCertainType;
    }

    public List<ExperimentalPlane> getExperimentalPlanes() {
        List<ExperimentalPlane> experimentalPlanes = new ArrayList<>();

        for (Plane plane : planes) {
            if (plane instanceof ExperimentalPlane) {
                experimentalPlanes.add((ExperimentalPlane) plane);
            }
        }
        return experimentalPlanes;
    }

    public List<ExperimentalPlane> getExperimentalPlanesByCertainType(ExperimentalType experimentalType) {
        List<ExperimentalPlane> experimentalPlanes = getExperimentalPlanes();
        List<ExperimentalPlane> experimentalPlanesByCertainType = new ArrayList<>();

        for (ExperimentalPlane experimentalPlane : experimentalPlanes) {
            if (experimentalPlane.getType() == experimentalType) {
                experimentalPlanesByCertainType.add(experimentalPlane);
            }
        }
        return experimentalPlanesByCertainType;
    }

    public List<ExperimentalPlane> getExperimentalPlanesByCertainClassificationLevel(ClassificationLevel classificationLevel) {
        List<ExperimentalPlane> experimentalPlanes = getExperimentalPlanes();
        List<ExperimentalPlane> experimentalPlanesByCertainClassificationLevel = new ArrayList<>();

        for (ExperimentalPlane experimentalPlane : experimentalPlanes) {
            if (experimentalPlane.getClassificationLevel() == classificationLevel) {
                experimentalPlanesByCertainClassificationLevel.add(experimentalPlane);
            }
        }
        return experimentalPlanesByCertainClassificationLevel;
    }

    public List<ExperimentalPlane> getExperimentalPlanesByCertainTypeAndClassificationLevel(
            ExperimentalType experimentalType, ClassificationLevel classificationLevel) {
        List<ExperimentalPlane> experimentalPlanes = getExperimentalPlanes();
        List<ExperimentalPlane> experimentalPlanesByCertainTypeAndClassificationLevel = new ArrayList<>();

        for (ExperimentalPlane experimentalPlane : experimentalPlanes) {
            if (experimentalPlane.getType() == experimentalType &&
                experimentalPlane.getClassificationLevel() == classificationLevel) {
                experimentalPlanesByCertainTypeAndClassificationLevel.add(experimentalPlane);
            }
        }
        return experimentalPlanesByCertainTypeAndClassificationLevel;
    }

    public void sortPlanesByModel() { planes.sort(Comparator.comparing(Plane::getModel)); }

    public void sortPlanesByMaxFlightDistance() {
        planes.sort(Comparator.comparingInt(Plane::getMaxFlightDistance));
    }

    public void sortPlanesByMaxSpeed() {
        planes.sort(Comparator.comparingInt(Plane::getMaxSpeed));
    }

    public void sortPlanesByMaxLoadCapacity() {
        planes.sort(Comparator.comparingInt(Plane::getMaxLoadCapacity));
    }

    @Override
    public String toString() {
        return "Airport{" + "Planes=" + planes + '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Airport airport = (Airport) o;
        return Objects.equals(planes, airport.planes);
    }

    @Override
    public int hashCode() {
        return Objects.hash(planes);
    }
}
