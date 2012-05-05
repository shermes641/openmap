
import play.Play;
import play.jobs.Job;
import play.jobs.OnApplicationStart;
import play.test.Fixtures;

import java.security.Security;

@OnApplicationStart
public class Bootstrap extends Job {

   public void doJob() {
     
      Fixtures.load("initial-data.yml");
      
   }

}