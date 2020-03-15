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

    background(0);
    const ballWidth = 100;

    fill(255, 255, 0);
    let secs = obj.seconds;
    let millis = obj.millis;
    let exactSeconds = secs + millis / 1000.0;

    posX = map(exactSeconds, 0, 60, ballWidth/2, width-ballWidth/2);
    posY = map(60, 0, 100, 0, height);
    ellipse(posX, posY, ballWidth);

    fill(255);
    posX = map(obj.minutes, 0, 59, ballWidth/2, width-ballWidth/2);
    posY = map(40, 0, 100, 0, height);
    ellipse(posX, posY, ballWidth);

    posX = map(obj.hours, 0, 23, ballWidth/2, width-ballWidth/2);
    posY = map(20, 0, 100, 0, height);
    ellipse(posX, posY, ballWidth);
}
