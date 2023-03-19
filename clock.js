/* Function Logic for Canvas Content: */

let canvas, ctx;

function init () {                              // Init Function.
    canvas = document.getElementById('clock');  // Founding Element Get.
    canvas.width = canvas.height = 300;         // Canvas Dimensions.
    ctx = canvas.getContext('2d');              // Canvas Content Type.

    setInterval(draw, 10);                      // Intervals for repeated paining every 10 micro seconds.
}

init();  // Init

// Painting Function (and painting manually without adding .png files):
function draw () {

    // Current Time:
    // Im taking away actual time i mili-seconds to midnight:
    let time = (function () {

        let midnight = new Date();                          // Object Date set as variable representing midnight. 

        // Actual time measuring units added to it
        midnight.setHours(0);                               // All from hours to mili-seconds algn to 0.
        midnight.setMinutes(0);
        midnight.setSeconds(0);
        midnight.setMilliseconds(0);

            return Date.now() - midnight.getTime();         //  Catching of actual world time.
        })(),

        hours = time / (60 * 60 * 1000),                    // For hours.
        minutes = hours * 60 % 60,                          // For minutes per hour.
        seconds = minutes * 60 % 60,                        // For seconds per minute.
        c = {x: canvas.width / 2, y: canvas.height / 2};    // c (canvas centar) and with 2 separate canvas dimensions, by horizontal (width) and vertical (height).

    ctx.clearRect(0, 0, canvas.width, canvas.height);       // Cyclic erasing of space (forwarded x and y coordinates of the same canvas dimension).
    ctx.lineCap = 'round';                                  // Circle type.            

        secondsHand();                                  // Seconds Arrow.
        minutesHand();                                  // Minute Arrow.
        hoursHand();                                    // Hour Arrow.
        clockCircle();                                  // Circle (body) of clock.

    // Clock Body:
    function clockCircle () {                           // Function for Clock Circle. 
        
        // Crtanje Ruba kružnice na satu:
        ctx.lineWidth = 5;                              // Debljina linije ruba.
        ctx.strokeStyle = 'silver';                     // Boja linije ruba.
        ctx.beginPath();                                //  Početna putanja.
        ctx.arc(c.x, c.y, 140, 0, Math.PI * 2);         // Luk kružnice.
        // c for canvas center, 
        // x for horizontal, // y for vertical,     
        // 140 magnitude for pixels, 
        // 0 for radius (due to being full circle) and PI for full circle.

        ctx.stroke();                                   // Drawing.

        // Lines on the edges for seconds on the clock:
        ctx.lineWidth = 3;                              // Line width.

            // 'For' loop for them (there are 60 sekundi on the clock).
            for (let i = 0; i < 60; i++) {

                let r = 135,                            // Radius im je 135.
                    l = 5;                              // Length (per 5 between taller lines).

            ctx.strokeStyle = 'rgba(0, 0, 0, 0.25)';    // Line color (with alpha opacity like that last parameter).

            // Svako peta crtica.
            if (i % 5 === 0)
                r -= l,
                l *= 2,

            ctx.strokeStyle = 'rgba(150, 0, 0, 0.5)';   // Color for every fifth line (also lighter opacity).

        let v = new Vector(r, Math.PI * 2 * (i / 60) - Math.PI / 2);    // Another vector.
        //  r for radius, then circle angle (with iteration to 60 segments on he arrow) and PI for full circle.
            
            // Crtež:
            ctx.beginPath();                               // Path starting.
            ctx.moveTo(v.getX() + c.x, v.getY() + c.y);    // From - 
            v.setMag(r + l);                               // for lines along the outer edge (radius magnitude + length for coming from starting point to the next).
            ctx.lineTo(v.getX() + c.x, v.getY() + c.y);    // - To (same content).
            ctx.stroke();                                  // Drawing.

            }

            // Numbers on the Clock:
            ctx.font = '18px Noto Sans';                    // Font for numbers.
            ctx.fillStyle = 'black';                        // Text Color for numbers.
            ctx.textAlign = 'center';                       // Drawing alignment for numbers.
            ctx.textBaseline = 'middle';                    // Baseline drawing for numbers.

            // Loop ('i' representing each number here:
            for (let i = 1; i <= 12; i++) {

                // For x and y special vector:
                let v = new Vector(113, Math.PI * 2 * (i / 12) - Math.PI / 2);  
                // 113 pixels for how far will it go. 
                // For angle - math.PI (with iteration for each number divided to 12 alike the upper with 'v' vector).

                ctx.fillText(i, v.getX() + c.x, v.getY() + c.y);    // Ispuna teksta.
                // (Podešenost koordinatnog položaja ispisa brojki na kazaljki).
            }

            // Clock Arrows Binding Circle:
            ctx.beginPath();                                // Starting Angle.
            ctx.arc(c.x, c.y, 3.75, 0, Math.PI * 2);        // Arch (center a for x an for y, radius, starting angle 0, and PI for full circle).
            ctx.fillStyle = 'silver';                       // Filling of Arrow binding circle.
            ctx.strokeStyle = 'black';                      // Line color (margins) for central arrow binding circle.
            ctx.lineWidth = 2.5;                            // For Line weight.
            ctx.fill();                                     // For color fill.
            ctx.stroke();                                   // For Drawing.
    }

    // Clock Seconds Arrow:
    function secondsHand () {                               // Function for Clock Minute Arrow

        ctx.lineWidth = 1.5;                                // Heavy Lines for 'Seconds' Arrow.
        ctx.strokeStyle = 'red';                            // Seconds Arrow Line Colors (without margins color filling ).
        ctx.beginPath();                                    // Starting Trajectory. 
        let a = Math.PI * 2 * (seconds / 60) - Math.PI / 2; // Vectors: Vector - (a - for angle).
                                                            // (For full circle in radiants, fractions of that are seconds (60 per sec) taking away '- Math.PI / 2' because 0 is in JS for the right and 0 on clock is up). 
        let v = new Vector(95, a);                          // Vectors - first parameter magnitude of 95 px length, a for the second parameter is angle.
        let v2 = new Vector(-20, a);                        // Making of 'tail' on the clock seconds arrow - Same thing for this vector, only difference in in pixel length.
                       // * -20 due to 'rep' moving anti-clockwise.
        ctx.moveTo(v2.getX() + c.x, v2.getY() + c.y);       // Drawing line from -
                       //  Clock Arrow Tail
        ctx.lineTo(v.getX() + c.x, v.getY() + c.y);         // - to.
        
        ctx.stroke();                                       // Drawing.
    }

    // Clock Minute Arrow:
    function minutesHand () {                               // Clock Minute Arrow.
        ctx.lineWidth = 4;                                  // Clock Arrow Line Weight
        ctx.strokeStyle = 'gray';                           // Color.
        ctx.beginPath();                                    // Starting trajectory.
        let a = Math.PI * 2 * (minutes / 60) - Math.PI / 2; // Angle (60 minutes per circular cycle).
        let v = new Vector(95, a);                          // Magnitude Vector (95).
        ctx.moveTo(c.x, c.y);                               // Drawing line from -
        ctx.lineTo(v.getX() + c.x, v.getY() + c.y);         // - to.
        ctx.stroke();                                       // Drawing.
    }

    // Clock Hour Arrow:
    function hoursHand () {                                 // Clock Arrow.
        ctx.lineWidth = 4;                                  // Clock Arrow Line Weight.
        ctx.strokeStyle = 'black';                          // Clock Arrow Color.
        ctx.beginPath();                                    // Starting trajectory.

        let a = Math.PI * 2 * (hours / 12) - Math.PI / 2;   // Clock Angle and separation into full circle 12 parts for arrow pointers.
        let v = new Vector(60, a);                          // Magnitude vector per 60 px length and angle.

        ctx.moveTo(c.x, c.y);                               // Line from - 
        ctx.lineTo(v.getX() + c.x, v.getY() + c.y);         // - to.

        ctx.stroke();                                       // Drawing.
    }
}
