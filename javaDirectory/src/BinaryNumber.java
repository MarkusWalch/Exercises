import java.util.Random;
import java.util.Scanner;
import java.lang.StringBuilder;

public class BinaryNumber {
    public static void main(String[] args) {
        System.out.println("Hallo Leute - Bit Darstellung ist angesagt");
        Scanner scan = new Scanner(System.in);
        System.out.println("Bitte eine ganze Dezimalzahl eingeben:");
        int n = scan.nextInt();
        System.out.println("Jetzt wird eine Zufallszahl von 1 bis 10 addiert:");
        n = addRandomNumber(n);
        scan.close();
        System.out.println("Eingabe dezimal: " + n);
        System.out.println("Eingabe binary: " + convertToBinary(n));
    }

    public static String convertToBinary(int number) {
        StringBuilder result = new StringBuilder("");

        while (number != 0) {
            result.insert(0, number % 2);
            number /= 2;
        }

        return result.toString();
    }

    public static int addRandomNumber(int number) {
        //Die Zahl ist zwar zufällig mit einem Seed,
        //aber nur einmal, ab dann nicht mehr.
        //Gleiches Seed = Gleiches Ergebnis
        Random ran = new Random(4);
        number += ran.nextInt(1,11);
        return number;
    }
}