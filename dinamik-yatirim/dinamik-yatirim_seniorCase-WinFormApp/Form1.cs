using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Data.SqlClient;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace dinamik_yatirim_seniorCase_WinFormApp
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
        }

        SqlConnection conn = new SqlConnection("Data Source=MSI;Initial Catalog=WordsDB;Integrated Security=True");
        private void btnStart_Click(object sender, EventArgs e)
        {
            validateInput();
        }

        private void btnStop_Click(object sender, EventArgs e)
        {
            if (conn.State.ToString() == "Open")
            {
                timer3Secs.Stop();
                conn.Close();
                MessageBox.Show("Bağlantı Kapatıldı !");
            }
            else
            {
                MessageBox.Show("Bağlantı ZATEN Kapalı !");
            }
        }

        private void btnStatus_Click(object sender, EventArgs e)
        {
            if (conn.State.ToString() == "Open")
            {
                MessageBox.Show("Bağlantı Açık !");
            }
            else
            {
                MessageBox.Show("Bağlantı Kapalı !");
            }
        }
        private string textGenerator(int textLength)
        {
            Random random = new Random();
            var result = new StringBuilder();
            const string charS = "abcçdefgğhıijklmnoöprsştuüvyz";
            const string firstChar = "ABCÇDEFGĞHIİJKLMNOÖPRSŞTUÜVYZ";
            char c;
            for (var i = 0; i < textLength; i++)
            {
                if (i == 0)
                {
                    c = firstChar[random.Next(0, firstChar.Length)];
                }
                else
                {
                    c = charS[random.Next(0, charS.Length)];
                }
                result.Append(c);
            }
            return result.ToString();
        }
        private void validateInput()
        {
            var userInput = textBox.Text;
            int distance;
            try
            {
                if (userInput.Length == 0)
                {
                    throw new Exception("Girdi boş, Lütfen bir Rakam giriniz !");
                }
                else if (!(int.TryParse(userInput, out distance)))
                {
                    throw new Exception("Lütfen Metin yerine Rakam giriniz !");
                }
                else
                {
                    int userInputInt = Convert.ToInt32(userInput);
                    if (userInputInt <= 0)
                    {
                        throw new Exception("Sayı 1'den Küçük olamaz !");
                    }
                    else if (userInputInt > 9)
                    {
                        throw new Exception("Rakam 9'dan Büyük olamaz !");
                    }
                    else
                    {
                        if (conn.State.ToString() == "Closed")
                        {
                            conn.Open();
                            timer3Secs = new Timer();
                            timer3Secs.Tick += new EventHandler(timer3Secs_Tick);
                            timer3Secs.Interval = 3000; // in miliseconds
                            timer3Secs.Start();
                            MessageBox.Show("Başarılı bir Şekilde Veritabanına Bağlanıldı, ve Veri aktarılmaya başlandı !!");
                        }
                        else
                        {
                            MessageBox.Show("Bağlantı ZATEN Açık !");
                        }

                    }

                }
            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.Message);
            }

        }
        private void timer3Secs_Tick(object sender, EventArgs e)
        {
            addToDb();
        }
        private void addToDb()
        {
            var userInput = textBox.Text;
            int userInputInt = Convert.ToInt32(userInput);

            SqlCommand cmd = new SqlCommand("INSERT INTO Words (Length,Text) VALUES (@WordLength,@WordText)", conn);
            cmd.Parameters.AddWithValue("@WordLength", userInputInt);
            cmd.Parameters.AddWithValue("@WordText", textGenerator(userInputInt));
            cmd.ExecuteNonQuery();

        }
    }
}
