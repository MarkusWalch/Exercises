/*
class name == File name!
Consequence: file names in UpperCase Letters
Und static void main ist auch Pflicht!
*/
public class Standardabweichung {
    public static void main(String[] args) {
        System.out.println("Es geht los - Standardabweichung berechnen:");

        double[] eingabe = {10, 20, 30, 40, 50};
        System.out.println("Eingabe lautet: ");

        for (double z : eingabe) System.out.println(z);
        
        System.out.println();
        System.out.println("Ergebnis:");
        System.out.println(standardabweichung(eingabe));
    }

    //Wurzel[(1/(n-1))*Summe{i=1,bis n}((xi - mittel)^2)]
    //mittel = arithmetische Mittel der Werte
    //Es gibt mehrere Arten der Standardabweichung, hab halt eine genommen.
    public static double standardabweichung(double[] values) {
        double result = 0.0;
        double mittelwert = 0.0;
        double summe = 0.0;
        double partBeforeSumme = 1.0/(values.length - 1); 
        double partUnderRoot = 0.0;

        for (double d : values) {
            mittelwert += d;
        }
        mittelwert = mittelwert / values.length;

        for (double d : values) {
            summe += Math.pow((d - mittelwert), 2.0);
        }

        partUnderRoot = partBeforeSumme*summe;
        result = Math.sqrt(partUnderRoot);

        return result;
    }
}