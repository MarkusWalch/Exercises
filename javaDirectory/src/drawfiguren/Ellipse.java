package drawfiguren;

import java.awt.Graphics;

public class Ellipse extends Figur {
    int radiusA, radiusB;

    public Ellipse(int x, int y, int radiusA, int radiusB) {
        super(x, y);
        this.radiusA = radiusA;
        this.radiusB = radiusB;
    }

    @Override public void draw(Graphics g) {
        g.drawOval(x-radiusA/2, y-radiusB/2, radiusA, radiusB);
    }

    //For some reason this one does not work.
    //It does not like it using x and y. I have no clue what the problem is. 
    //Different Class Loaders, Figure and Ellipse are in 2 different Class Loaders
    @Override public String toString() {
        return ("Ellipse mit Koordinaten " + x + "/" + y + " und RadiusA = " +
        radiusA + " und RadiusB = " + radiusB);
    }

    public static void main(String[] args) {
        System.out.println("Figur : " + Figur.class.getClassLoader());
        System.out.println("Ellipse : " + Ellipse.class.getClassLoader());
        System.out.println("Rechteck : " + Rechteck.class.getClassLoader());
        Ellipse ellipse = new Ellipse(100, 200, 50, 300);
        System.out.println(ellipse);

    }
}
