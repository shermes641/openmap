package models;

import javax.persistence.Entity;
import play.db.jpa.Model;

@Entity(name = "energy_system")
public class EnergySystem extends Model {
    
    public String location;
    public String about;
    public Double latitude;
    public Double longitude;
	
}
