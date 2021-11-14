import airport.Airport;
import model.ClassificationLevel;
import model.ExperimentalType;
import model.MilitaryType;
import org.testng.Assert;
import org.testng.annotations.Test;
import plane.ExperimentalPlane;
import plane.MilitaryPlane;
import plane.PassengerPlane;
import plane.Plane;

import java.util.Arrays;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

public class AirportTest {
    private static final List<Plane> planes = Arrays.asList(
            new PassengerPlane("Boeing-737", 900, 12000, 60500, 164),
            new PassengerPlane("Boeing-737-800", 940, 12300, 63870, 192),
            new PassengerPlane("Boeing-747", 980, 16100, 70500, 242),
            new PassengerPlane("Airbus A320", 930, 11800, 65500, 188),
            new PassengerPlane("Airbus A330", 990, 14800, 80500, 222),
            new PassengerPlane("Embraer 190", 870, 8100, 30800, 64),
            new PassengerPlane("Sukhoi Superjet 100", 870, 11500, 50500, 140),
            new PassengerPlane("Bombardier CS300", 920, 11000, 60700, 196),
            new MilitaryPlane("B-1B Lancer", 1050, 21000, 80000, MilitaryType.BOMBER),
            new MilitaryPlane("B-2 Spirit", 1030, 22000, 70000, MilitaryType.BOMBER),
            new MilitaryPlane("B-52 Stratofortress", 1000, 20000, 80000, MilitaryType.BOMBER),
            new MilitaryPlane("F-15", 1500, 12000, 10000, MilitaryType.FIGHTER),
            new MilitaryPlane("F-22", 1550, 13000, 11000, MilitaryType.FIGHTER),
            new MilitaryPlane("C-130 Hercules", 650, 5000, 110000, MilitaryType.TRANSPORT),
            new ExperimentalPlane("Bell X-14", 277, 482, 500, ExperimentalType.HIGH_ALTITUDE, ClassificationLevel.SECRET),
            new ExperimentalPlane("Ryan X-13 Vertijet", 560, 307, 500, ExperimentalType.VTOL, ClassificationLevel.TOP_SECRET)
    );

    private static final PassengerPlane PASSENGER_PLANE_WITH_MAX_PASSENGER_CAPACITY =
            new PassengerPlane("Boeing-747", 980, 16100, 70500, 242);

    private static final MilitaryType BOMBER_MILITARY_TYPE = MilitaryType.BOMBER;
    private static final MilitaryType TRANSPORT_MILITARY_TYPE = MilitaryType.TRANSPORT;
    private static final ExperimentalType VTOL_EXPERIMATNAL_TYPE = ExperimentalType.VTOL;
    private static final ClassificationLevel UNCLASSIFIED_EXPERIMENTAL_CLASSIFICATION_LEVEL = ClassificationLevel.UNCLASSIFIED;
    private static final ExperimentalType HIGH_ALTITUDE_EXPERIMENTAL_TYPE = ExperimentalType.HIGH_ALTITUDE;
    private static final ClassificationLevel SECRET_EXPERIMENTAL_CLASSIFICATION_LEVEL = ClassificationLevel.SECRET;

    private static final Comparator<Plane> PLANE_COMPARATOR_BY_MODEL
            = Comparator.comparing(Plane::getModel);
    private static final Comparator<Plane> PLANE_COMPARATOR_BY_MAX_FLIGHT_DISTANCE
            = Comparator.comparingInt(Plane::getMaxFlightDistance);
    private static final Comparator<Plane> PLANE_COMPARATOR_BY_MAX_SPEED
            = Comparator.comparingInt(Plane::getMaxSpeed);
    private static final Comparator<Plane> PLANE_COMPARATOR_BY_MAX_LOAD_CAPACITY
            = Comparator.comparingInt(Plane::getMaxLoadCapacity);

    @Test
    public void hasPlanesTest() {
        Assert.assertFalse(new Airport(planes).getPlanes().isEmpty());
    }

    @Test
    public void hasPassengerPlanesTest() {
        Assert.assertFalse(new Airport(planes).getPassengerPlanes().isEmpty());
    }

    @Test
    public void comparePassengerPlaneWithMaxCapacityTest() {
        Assert.assertEquals(new Airport(planes).getPassengerPlaneWithMaxPassengersCapacity(),
                PASSENGER_PLANE_WITH_MAX_PASSENGER_CAPACITY);
    }

    @Test
    public void hasMilitaryPlanesTest() {
        Assert.assertFalse(new Airport(planes).getMilitaryPlanes().isEmpty());
    }

    @Test
    public void hasTransportMilitaryPlanesTest() {
        Assert.assertFalse(new Airport(planes).getMilitaryPlanesByCertainType(TRANSPORT_MILITARY_TYPE).isEmpty());
    }

    @Test
    public void hasBomberMilitaryPlanesTest() {
        Assert.assertFalse(new Airport(planes).getMilitaryPlanesByCertainType(BOMBER_MILITARY_TYPE).isEmpty());
    }

    @Test
    public void hasExperimentalPlanesTest() {
        Assert.assertFalse(new Airport(planes).getExperimentalPlanes().isEmpty());
    }

    @Test
    public void hasVtolExperimentalPlanesTest() {
        Assert.assertFalse(new Airport(planes).getExperimentalPlanesByCertainType(VTOL_EXPERIMATNAL_TYPE).isEmpty());
    }

    @Test
    public void hasNotUnclassifiedExperimentalPlanesTest() {
        Assert.assertTrue(new Airport(planes)
                .getExperimentalPlanesByCertainClassificationLevel(UNCLASSIFIED_EXPERIMENTAL_CLASSIFICATION_LEVEL)
                .isEmpty());
    }

    @Test
    public void hasHighAltitudeSecretExperimentalPlanesTest() {
        Assert.assertFalse(new Airport(planes)
                .getExperimentalPlanesByCertainTypeAndClassificationLevel(
                        HIGH_ALTITUDE_EXPERIMENTAL_TYPE, SECRET_EXPERIMENTAL_CLASSIFICATION_LEVEL)
                .isEmpty());
    }

    @Test
    public void sortPlanesByModelTest() {
        Airport airport = new Airport(planes);
        airport.sortPlanesByModel();
        Assert.assertEquals(airport.getPlanes()
                        .stream()
                        .sorted(PLANE_COMPARATOR_BY_MODEL)
                        .collect(Collectors.toList()),
                planes);
    }

    @Test
    public void sortPlanesByMaxFlightDistanceTest() {
        Airport airport = new Airport(planes);
        airport.sortPlanesByMaxFlightDistance();
        Assert.assertEquals(airport.getPlanes()
                        .stream()
                        .sorted(PLANE_COMPARATOR_BY_MAX_FLIGHT_DISTANCE)
                        .collect(Collectors.toList()),
                planes);
    }

    @Test
    public void sortPlanesByMaxSpeedTest() {
        Airport airport = new Airport(planes);
        airport.sortPlanesByMaxSpeed();
        Assert.assertEquals(airport.getPlanes()
                        .stream()
                        .sorted(PLANE_COMPARATOR_BY_MAX_SPEED)
                        .collect(Collectors.toList()),
                planes);
    }

    @Test
    public void sortPlanesByMaxLoadCapacityTest() {
        Airport airport = new Airport(planes);
        airport.sortPlanesByMaxLoadCapacity();
        Assert.assertEquals(airport.getPlanes()
                                   .stream()
                                   .sorted(PLANE_COMPARATOR_BY_MAX_LOAD_CAPACITY)
                                   .collect(Collectors.toList()),
                planes);
    }
}
