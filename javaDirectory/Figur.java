import java.awt.Graphics;

public abstract class Figur {
    int x,y;

    public Figur(int x, int y) {
        this.x = x;
        this.y = y;
    }

    public abstract void draw(Graphics g);
}
