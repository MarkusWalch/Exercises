import java.util.Arrays;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Stack;

public class Postfix {
    public static void main(String args[]) {
        System.out.println("Umwandlung Infix zu Postfix Notation:");

        String beispiel = "( 1 + 2 ) * ( 3 + 4 ) / ( 5 - 6 * 7 + ( 9 - 8 ) )";
        
        System.out.println("Infix: " + beispiel);
        String postfixString = toPostfixString(beispiel);
        System.out.println("Postfix: " + postfixString);
        //Komisches Ergebnis, aber es stimmt :)
        System.out.println("Postfix-Ergebnis: " + evaluatePostfixString(postfixString));
    }

    /**
     * @param postfix "Needs a postfix String with no Brackets - already sorted."
     */
    public static double evaluatePostfixString(String postfix) {
        var stack = new Stack<Double>();

        for (String zeichen : postfix.split(" ")) {
            switch(zeichen) {
                case "+" :
                    stack.push(stack.pop() + stack.pop());
                    break;
                case "-" :
                    double subtrahend = stack.pop();
                    stack.push(stack.pop() - subtrahend);
                    break;
                case "*" :
                    stack.push(stack.pop() * stack.pop());
                    break;
                case "/" :
                    double divisor = stack.pop();
                    stack.push(stack.pop() / divisor);
                    break; 
                default :
                    stack.push(Double.parseDouble(zeichen));
                    break;
            }
        }
        return stack.pop();
    }

    /**
     * @param infix "Ein String wo alle Operatoren/Operanden getrennt sind durch ein Leerzeichen."
     * @return "Einen String in postfix Notation - alle Zeichen getrennt durch Leerzeichen."
     */
    public static String toPostfixString(String infix) {
        StringBuilder result = new StringBuilder();
        var operators = new HashSet<String>(Arrays.asList("+", "-", "*", "/"));
        var precedences = new HashMap<String, Integer>();

        precedences.put("(", 0);
        precedences.put("+", 1);
        precedences.put("-", 1);
        precedences.put("*", 2);
        precedences.put("/", 2);

        var operatorStack = new Stack<String>();

        for (String zeichen : infix.split(" ")) {
            //isOperator
            if (operators.contains(zeichen)) {
                while (!operatorStack.empty() && 
                precedences.get(operatorStack.peek()) >= precedences.get(zeichen)) {
                    result.append(operatorStack.pop() + " ");
                }
                operatorStack.push(zeichen);
            }
            //isOpenBracket
            else if (zeichen.equals("(")) {
                operatorStack.push(zeichen);
            }

            //isClosingBracket
            //Ich gehe davon aus, dass der OperatorStack nicht leer ist,
            //da bei einer schließenden Klammer mindestens eine öffnende vorher war.
            //Sonst müsse eventuell noch ein Test kommen.
            else if (zeichen.equals(")")) {
                while(!operatorStack.peek().equals("(")) {
                    result.append(operatorStack.pop() + " ");
                }
                operatorStack.pop();
            }
            //isNumber
            else result.append(zeichen + " ");
        }

        //Append rest of Stack
        while (!operatorStack.empty()) {
            result.append(operatorStack.pop());
        }

        return result.toString();
    }
}
