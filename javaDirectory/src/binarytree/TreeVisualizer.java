package binarytree;

public class TreeVisualizer {
    
    public static void printDot(BinaryTree tree) {
        System.out.println("digraph G {");
        printSubTree(tree.root, 0);
        System.out.println("}");
    }

    private static int printSubTree(BinaryTree.TreeNode node, int empties) {
        if (node.left == null && node.right == null) {
            System.out.println("  \"" + node.value + "\" [shape=rectangle];");
            return empties;
        }
        if (node.left != null) {
            printNode(node.value, node.left.value);
            empties = printSubTree(node.left, empties);
        }
        else if (node.right != null) {
            empties = printTerminatingNode(node.value, empties);
        }
        if (node.right != null) {
            printNode(node.value, node.right.value);
            empties = printSubTree(node.right, empties);
        }
        else if (node.left != null) {
            empties = printTerminatingNode(node.value, empties);
        }
        return empties;
    }

    private static void printNode(int rootValue, int childValue) {
        System.out.println("  \"" + rootValue + "\" -> \"" + childValue + "\"");
    }

    private static int printTerminatingNode(int value, int empties) {
        System.out.println("empty" + empties + "[label=\"\", style=invis];");
        System.out.println("  \"" + value + "\" -> empty" + empties);
        return empties + 1;
    }
}
