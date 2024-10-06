import { Robot } from "./local_modules/robot";
import { FlyingRobot } from "./local_modules/flying_robots";

const robot = new Robot("John", 5);

robot.greet();

console.log("From getter:", robot.name, robot.legs);

const flyingRobot = new FlyingRobot("Teo", 2, 5);

console.log(flyingRobot.legs, flyingRobot.wings);
flyingRobot.greet();
flyingRobot.doFlying();

console.log(flyingRobot instanceof Robot, flyingRobot instanceof FlyingRobot);
