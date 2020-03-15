/*
 * use p5.js to draw a clock on a 960x500 canvas
 */ 
function draw_clock(obj) {
    // draw your own clock here based on the values of obj:
    //    obj.hours goes from 0-23
    //    obj.minutes goes from 0-59
    //    obj.seconds goes from 0-59
    //    obj.millis goes from 0-999
    //    obj.seconds_until_alarm is:
    //        < 0 if no alarm is set
    //        = 0 if the alarm is currently going off
    //        > 0 --> the number of seconds until alarm should go off

    // YOUR MAIN CLOCK CODE GOES HERE
    background(50); //  beige
    fill(200); // dark grey
    textSize(40);
    textAlign(CENTER, CENTER);
    text("YOUR MAIN CLOCK CODE GOES HERE", width/2, height/2);
}
