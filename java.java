import javax.swing.JOptionPane;

import java.awt.HeadlessException;
import java.util.Scanner;

/**
 *
 * @author Aflah
 */
public class java {
    public static void main(String[]args){
        try (Scanner in = new Scanner(System.in)) {
            String nama,kelas,nim,matkul;
            double nilai1;
            double nilai2;
            double nilai3;
            double rata_rata;
            double mid;
            double uas;
            double akhir;

            System.out.print("Masukkan nilai1 : ");
            nilai1 = in.nextInt();
            System.out.print("Masukkan nilai2 : ");
            nilai2 = in.nextInt();
            System.out.print("Masukkan nilai3 : ");
            nilai3 = in.nextInt();
            System.out.print("Masukkan mid : ");
            mid = in.nextInt();
            System.out.print("Masukkan uas : ");
            uas = in.nextInt();
            nama = JOptionPane.showInputDialog("masukkan nama : ");
            kelas = JOptionPane.showInputDialog("masukkan kelas : ");
            nim = JOptionPane.showInputDialog("masukkan nim : ");
            matkul = JOptionPane.showInputDialog("masukkan matkul : ");
            
            
            
            rata_rata =(nilai1+nilai2+nilai3)/3;
            
            akhir=(rata_rata*0.3)+(mid*0.35)+(uas*0.35);
            
            System.out.println("nama : " + nama);
            System.out.println(kelas);
            System.out.println(nim);
            System.out.println(matkul);
               
            System.out.println(nilai1);
            System.out.println(nilai2);
            System.out.println(nilai3);
            System.out.println(rata_rata);
            System.out.println(mid);
            System.out.println(uas);
            System.out.println(akhir);

            if (akhir > 85 && akhir < 100) {
                System.out.println("Grade = A");
            } else if (akhir > 70 && akhir < 84) {
                System.out.println("Grade = B");
            } else if (akhir > 55 && akhir < 71 ) {
                System.out.println("C");
            } else if (akhir > 35 && akhir < 55) {
                System.out.println("Grade = D");
            } else {
                System.out.println("Grade = E");
            }
        } catch (HeadlessException e) {
            e.printStackTrace();
        }
        
        
        
    }
    
}