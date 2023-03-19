/* Matematička logika za klase/module vektora i uglove: */

function Vector (magnitude, angle) {
    var m, a;                           // 'm' za magnitudu, 'a' za ugao. 

    //  Dobavljanja i postavljanja osobina za funkcije:

    //  For X property:
    this.getX = function () {
        return m * Math.cos(a);             // Angle measured in radiants
                                            // cos - for angle trajectory. 
    };

    this.setX = function (x) {
        var y = m * Math.sin(a);            // Sinus measured in radiants.
                                            // sin - for number sinus.

        m = Math.sqrt((x * x) + (y * y));   // Bringing back root angle.
        a = Math.atan2(y, x);               // Bringing axis angle in radiants.
    };

    // For Y property:
    this.getY = function () {
        return m * Math.sin(a);
    };

    this.setY = function (y) {
        var x = m * Math.cos(a);
        m = Math.sqrt((x * x) + (y * y));
        a = Math.atan2(y, x);
    };

    // For magnitude:
    this.getMag = function () {
        return m;
    };

    this.setMag = function (magnitude) {
        m = magnitude;
    };

    // For angle:
    this.getAngle = function () {
        return a;
    };

    this.setAngle = function (angle) {
        a = angle;
    };

    // Za adding:
    this.add = function (v) {
        return Vector.add(this, v);
    };

    // For subtract:
    this.subtract = function (v) {
        return Vector.subtract(this, v);
    };

    // Forwarding parameters  to functions of magnitude and angle.
    this.setMag(magnitude); 
    this.setAngle(angle);
}

// Binding methods fpr vector class:
// For rectangle:
Vector.rectangular = function (x, y) {
    var m = Math.sqrt(x * x + y * y),
        a = Math.atan2(y, x);
    return new Vector(m, a);
};

// Fpr magnitude and angles:
Vector.polar = function (m, a) {
    return new Vector(m, a);
};

// Function of adding for v1 and v2 vectors (ie. vectors for hour circle and clock arrows):
Vector.add = function (v1, v2) {
    return Vector.rectangular(v1.getX() + v2.getX(), v1.getY() + v2.getY());
};

// Function of subtracting for v1 and v2 vectors: 
Vector.subtract = function (v1, v2) {
    return Vector.rectangular(v1.getX() - v2.getX(), v1.getY() - v2.getY());
};
