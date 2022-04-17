package binarytree;

public class BinaryTree {
    
    //Innere Klasse
    class TreeNode {
        final int value;
        TreeNode left, right;

        public TreeNode(int value) { this.value = value; }

        public void add(int value) {
            if (value > this.value) {
                if (right == null) right = new TreeNode(value);
                else right.add(value);
            }
            else {
                if (left == null) left = new TreeNode(value);
                else left.add(value);
            }
        }

        @Override public String toString() {
            String result = "";
            if (left != null) result = left.toString();
            result += " " + value;
            if (right != null) result += right.toString();
            return result;
        }
    }

    TreeNode root = null; //Tree Root

    public void add(int value) {
        if (root == null) root = new TreeNode(value);
        else root.add(value);
    }
    
    //var-args-Parameter
    //Only one per function, always at the end
    //this.add wollte ich schreiben, add reicht aber aus.
    public void add(int ... values) {
        for (int value : values) add(value);
        
    }

    @Override public String toString() {
        String result = "";
        if (root != null) result = root.toString();
        return result;
    }

    public static void main(String[] args) {
        BinaryTree tree = new BinaryTree();
        tree.add(5);
        tree.add(3);
        tree.add(7);
        tree.add(1);
        tree.add(6);
        tree.add(4);
        tree.add(2);
        tree.add(13);
        tree.add(99);
        System.out.println(tree);

        tree.add(43,25,15,64,35);
        System.out.println(tree);

        TreeVisualizer.printDot(tree);
    }
}
