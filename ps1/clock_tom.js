/*
 * us p5.js to draw a clock on a 960x500 canvas
 */ 

/* size of square */
const s = 24

let numbers = [
  // 0
  [
    [2, 1],
    [3, 1],
    [1, 2],
    [4, 2],
    [1, 3],
    [4, 3],
    [1, 4],
    [4, 4],
    [2, 5],
    [3, 5],
  ],
  // 1
  [
    [2, 2],
    [3, 1],
    [3, 2],
    [3, 3],
    [3, 4],
    [3, 5]
  ],
  // 2
  [
    [1, 1],
    [2, 1],
    [3, 1],
    [4, 2],
    [4, 3],
    [3, 3],
    [2, 4],
    [1, 5],
    [2, 5],
    [3, 5],
    [4, 5]
  ],
  [ // 3
    [1, 1],
    [2, 1],
    [3, 1],
    [4, 2],
    [3, 3],
    [2, 3],
    [4, 4],
    [3, 5],
    [2, 5],
    [1, 5]
  ],
  [ // 4
    [1, 1],
    [3, 1],
    [1, 2],
    [3, 2],
    [1, 3],
    [2, 3],
    [3, 3],
    [4, 3],
    [3, 4],
    [3, 5]
  ],
  [ // 5
    [1, 1],
    [2, 1],
    [3, 1],
    [4, 1],
    [1, 2],
    [1, 3],
    [2, 3],
    [3, 3],
    [4, 4],
    [3, 5],
    [2, 5],
    [1, 5]
  ],
  [ // 6
    [2, 1],
    [3, 1],
    [4, 1],
    [1, 2],
    [1, 3],
    [2, 3],
    [3, 3],
    [1, 4],
    [4, 4],
    [2, 5],
    [3, 5],
  ], //7
  [
    [1, 1],
    [2, 1],
    [3, 1],
    [4, 1],
    [4, 2],
    [3, 3],
    [3, 4],
    [3, 5],
  ],
  [ // 8
    [2, 1],
    [3, 1],
    [1, 2],
    [4, 2],
    [2, 3],
    [3, 3],
    [1, 4],
    [4, 4],
    [2, 5],
    [3, 5],
  ],
  [ // 9
    [2, 1],
    [3, 1],
    [4, 1],
    [1, 2],
    [4, 2],
    [2, 3],
    [3, 3],
    [4, 3],
    [4, 4],
    [4, 5]
  ],
]

function draw_number(num, x, y) {
  /* this resets any previous translations */
  resetMatrix();
  translate(x, y);
  var pixels = numbers[num%numbers.length];
  for(var i=0; i<13; i++) {
    var cur_pixel = pixels[i%pixels.length];
    rect(cur_pixel[0] * s, cur_pixel[1] * s, s, s);
  }
}

function draw_number_interp(frac, num1, num2, x, y) {
  /* this resets any previous translations */
  resetMatrix();
  translate(x, y);
  var pixels1 = numbers[num1%numbers.length];
  var pixels2 = numbers[num2%numbers.length];
  for(var i=0; i<13; i++) {
    var cur_pixel1 = pixels1[i%pixels1.length];
    var cur_pixel2 = pixels2[i%pixels2.length];
    var pos_x = map(frac, 0.0, 1.0, cur_pixel1[0], cur_pixel2[0]);
    var pos_y = map(frac, 0.0, 1.0, cur_pixel1[1], cur_pixel2[1]);
    rect(pos_x * s, pos_y * s, s, s);
  }
}

function digits_from_num(num) {
  let digits = []
  if (num < 10) {
    digits.push(0);
  }
  else {
    n1 = Math.floor(num / 10);
    digits.push(n1);
  }
  n2 = Math.floor(num % 10);
  digits.push(n2);
  return digits;
}

function draw_clock(obj) {
  let hour = obj.hours;
  let minute = obj.minutes;
  let second = obj.seconds;
  let millis = obj.millis;
  let alarm = obj.seconds_until_alarm;

  var hour_pos = [40, height/2 - 3.5 * s];

  // DEBUG CODE TO TEST HOUR ROLLOVER
  // minute = minute + 35; // change based on current time
  // if (minute == 60) {
  //   minute = 0;
  //   hour = 0;
  // }

  // is alarm going off?
  if (alarm == 0) {
    if (second % 2 == 0) {
      background(0,0,100);      
    }
    else {
      background(100,100,0);      
    }
  }
  else {
    background(50);
  }

  noStroke();
  // is alarm going off in next 15 seconds
  if (alarm > 0) {
    fill(100);
    rect(width-50, height-50, 40, 40);
    if (alarm < 15.0) {
      var box_w = map(alarm, 0, 15, width, 0);
      var box_h = map(alarm, 0, 15, height, 0);
      rect(width/2-box_w/2, height/2-box_h/2, box_w, box_h);
    }
  }
  fill(255);

  // HOURS
  next_hour = (hour + 1) % 24;
  digits1 = digits_from_num(hour);
  digits2 = digits_from_num(next_hour);
  if(second >= 50 && minute == 59 && 
      (hour == 9 || hour == 19 || hour == 23)) {
    // minute_fraction_tens = millis  / 1000.0;
    seconds_left = (second - 50) + millis / 1000.0;
    hour_fraction_tens = seconds_left  / 10.0;
  }
  else {
    hour_fraction_tens = 0;
  }
  draw_number_interp(hour_fraction_tens, digits1[0], digits2[0], hour_pos[0] + 0.0 * 5 * s, hour_pos[1]);
  // draw_number(digits1[0], hour_pos[0], hour_pos[1]);

  if(second >= 55 && minute == 59) {
    // minute_fraction_tens = millis  / 1000.0;
    seconds_left = (second - 55) + millis / 1000.0;
    hour_fraction_ones = seconds_left  / 5.0;
  }
  else {
    hour_fraction_ones = 0;
  }
  draw_number_interp(hour_fraction_ones, digits1[1], digits2[1], hour_pos[0] + 1.0 * 5 * s, hour_pos[1]);
  // draw_number(digits1[1], hour_pos[0] + 1.0 * 5 * s, hour_pos[1]);

  // MINUTES
  next_minute = (minute + 1) % 60;
  digits1 = digits_from_num(minute);
  digits2 = digits_from_num(next_minute);
  if(second >= 58 && digits1[1] === 9) {
    // minute_fraction_tens = millis  / 1000.0;
    seconds_left = (second - 58) + millis / 1000.0;
    minute_fraction_tens = seconds_left  / 2.0;
  }
  else {
    minute_fraction_tens = 0;
  }
  draw_number_interp(minute_fraction_tens, digits1[0], digits2[0], hour_pos[0] + 2.5 * 5 * s, hour_pos[1]);

  if(second === 59) {
    minute_fraction_ones = millis  / 1000.0;
  }
  else {
    minute_fraction_ones = 0;
  }
  draw_number_interp(minute_fraction_ones, digits1[1], digits2[1], hour_pos[0] + 3.5 * 5 * s, hour_pos[1]);
  // draw_number(digits1[1], hour_pos[0] + 3.5 * 5 * s, hour_pos[1]);


  // SECONDS
  next_second = (second + 1) % 60;
  second_fraction = millis / 1000.0;
  digits1 = digits_from_num(second);
  digits2 = digits_from_num(next_second);
  // print(digits1);


  if(digits1[1] === 9 && millis > 500) {
    second_fraction_tens = (millis - 500) / 500.0;
  }
  else {
    second_fraction_tens = 0;
  }
  // draw the 10 second position
  draw_number_interp(second_fraction_tens, digits1[0], digits2[0], hour_pos[0] + 5.0 * 5 * s, hour_pos[1]);

  if(millis > 900) {
    second_fraction_ones = (millis-900) / 100.0;
  }
  else {
    second_fraction_ones = 0;
  }
  // draw the 1 second position
  draw_number_interp(second_fraction_ones, digits1[1], digits2[1], hour_pos[0] + 6.0 * 5 * s, hour_pos[1]);
}
