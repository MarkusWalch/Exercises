package drawfiguren;

import java.awt.Graphics;

public class Rechteck extends Figur {
    int breite, hoehe;

    public Rechteck(int x, int y, int breite, int hoehe) {
        super(x,y);
        this.breite = breite;
        this.hoehe = hoehe;
    }

    //For some reason this one does not work.
    //It does not like it using x and y. I have no clue what the problem is. 
    //Different Class Loaders, Figure and Rechteck are in 2 different Class Loaders
    @Override public String toString() {
        return "Ein Rechteck mit " + super.x + "/" + super.y + " als Mittelpunkt und einer Hoehe von "
        + hoehe + " und einer Breite von " + breite + ".";
    }

    @Override public void draw(Graphics g) {
        g.drawRect(x-breite/2, y-hoehe/2, breite, hoehe);
    }

    public static void main(String[] args) {
        System.out.println("Figur : " + Figur.class.getClassLoader());
        System.out.println("Ellipse : " + Ellipse.class.getClassLoader());
        System.out.println("Rechteck : " + Rechteck.class.getClassLoader());
        Rechteck react = new Rechteck(100, 100, 200, 50);
        System.out.println(react);
    }
}
