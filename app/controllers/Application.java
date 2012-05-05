package controllers;

import play.*;
import play.mvc.*;

import java.util.*;

import models.*;

public class Application extends Controller {

    public static void index() {
    	List<EnergySystem> energySystemList = EnergySystem.findAll();
        renderJSON(energySystemList);
    }

    public static void systemmap(Long id) {
    	EnergySystem energySystem = EnergySystem.findById(id);
        renderJSON(energySystem);
    }

    public static void show_system(Long id) {
        render(id);
    }

}
