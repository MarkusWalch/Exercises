import javax.swing.JFrame;
import java.awt.Graphics;
import java.util.Scanner;

//Die Datei Ellipse.java muss kompiliert im selben Verzeichnis sein.

public class FigurenJFrame extends JFrame {
    public FigurenJFrame() {
        setSize(400, 400);
        setVisible(true);
    }

    @Override public void paint(Graphics g) {
        //Das ist cool, das ich hier in ein Array mehrere
        //Objekte verschiedenen Typs gleich mit einer Schleife
        //anreden kann. Muss ich mir für andere Sprachen auch merken.
        Figur[] figuren = {
            new Ellipse(100, 150, 50, 70),
            new Rechteck(60,100,60,90),
            new Ellipse(60, 170, 70, 50),
            new Rechteck(170, 140, 50, 50)
         };
        
        for (Figur figur : figuren) {
            figur.draw(g);
        }
    }

    public static void main(String[] args) {
        var f = new FigurenJFrame();
        //Damit er nicht gleich schließt
        //Vielleicht finde ich mal elegantere Lösung
        System.out.println(new Rechteck(100, 100, 50, 50).toString());
        Scanner sc = new Scanner(System.in);
        sc.next();
        sc.close();
        System.exit(0);
    }
}
