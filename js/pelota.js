class Pelota {
    constructor(x, y, radio, color) {
        this.x = x;
        this.y = y;
        this.radio = radio;
        this.color = color;
        this.velocidadX = 3; // Velocidad horizontal
        this.velocidadY = 2; // Velocidad vertical
    }

    dibujar() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radio, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }
    // dibujar() {
    //     ctx.fillStyle = this.color;
    //     ctx.fillRect(this.x - this.radio, this.y - this.radio, this.radio * 2, this.radio * 2);
    // }

    mover() {
        this.x += this.velocidadX;
        this.y += this.velocidadY;

        // Rebotar en las paredes superior e inferior
        if (this.y - this.radio < 0 || this.y + this.radio > canvas.height) {
            this.velocidadY = -this.velocidadY;
        }
    }

    reiniciar() {
        this.x = canvas.width / 2;
        this.y = canvas.height / 2;
    }
}