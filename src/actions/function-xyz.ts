"use server";

import { GoogleSpreadsheet } from "google-spreadsheet";
import { JWT } from "google-auth-library";
import { sendMail } from "./send-mail";
import * as EmailValidator from "email-validator";

const serviceAccountAuth = new JWT({
  email:
    "google-spreadsheets-cron@warm-classifier-397515.iam.gserviceaccount.com",
  key: "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCzZuYfpmrnCNhr\nXPcbTHUMYnZMRU3Ojs49WefSo049HvM+diC4M9l/QvRXmQe8SreUR/OvRgHMrpeQ\nyPQ7h1g8A2tWyH5+KZAZeDG4SIoQptIZdWAmfoqIrMilt4+vlD+4UL6PB6zMcgG6\nv2S2nw6jf3B6wAD7B168ufEdM/MHxX/4v0zQW5AjmdwEKkyxjjgO6Xd2SrUq+PYh\n2M2oR1T/z4KXQSiHiEXA8HKi5mscpCkamb/219EMkDdewqdDUroQJL4+7PUXyYY0\n3PO5xafWXE1aMsKGEmYBW0gCM2WDYRSAkVXp6sgPloFf59gGzTH35tbg9UqaCbpp\naBwsaL9DAgMBAAECggEAPT7cQiLYrQ3ugFyo+ZdVAEje9PPV97X1/6jhRR4+OAyI\nYyMF0YzV7CXJ79vM8cGaQZN8xDIErEFQefu4sVfnzfkm3GYvFNgQmzlW1ABjrgKd\niFZzYEDj/3vpNfXgJkNYq45ZN9AZdGRZZc0wT04mu7dmiWliDFD8TTa3c05IYja8\nwtH1pU3KN82GpK2mc0yZfAIps4+/bxYJDWvx9tGnQhLZDQxe/gJUQLFvGZQ7ahhH\n+ttTRLAeBmnAQxeNHfRVBxgDJ20WbB3nvLcgSzriv85U8TExfyb1LVkNo3IUSQT9\nLKHtDydFsm+mCcNF1Lp9abEbKZqF501H7goZG6b7/QKBgQD8wHef0vGXHYdSQAml\n7u0UisDWY+3badMvia8QyjkULcC0kKKzqUiugFCJ6JsAVmAvA04RGD2sKcneiR/T\ngRb6rvd1G9oJ8RP87V1MpMmLI1jg+eZo9fjqu6SberCcblpg4FlQbyRi6lOV0ltb\ntaNaHbp7PSMsmuqYmcVbGSlNrwKBgQC1tR3YAluRH2KiLmYDEe8i5yGZ8NOS73od\nK+0rlvP8qbwQw1z3lwMKu04GqP2GZ0bRxe1kmUIvqIIn4CLldDFtT9pj+C4uXZN1\nJUEEuc/iBCd2kKmYW+PEvRSqULfFb8sUkVZUUJcA6/eBZ88j+m24y9j4NKK8PjA6\nyo+UzYTArQKBgQCTyy+oAz9Fr/ya+dsqbkWvh1svggtqC71zxLzbwoQR6pcOfqzF\nBa38bAesPJm2XsurcfFKSbR2YZErUV+M26VGPN1yWzDqM1AOy/WMhadcdvTXyQkU\nQxCkocilKd7v+g9bKpTPVc4fEQqDRxgozlOQtGWA/sT8pjGbvf8LP/FI/QKBgC2I\nyITD+nxAeDAaHngwe1Osxe/UuMA+gMRkqJdeyZ+MTVOKEXb+AcYjr+bdXELdCJMy\n3U1zVnGo8YzajwQe/O/ereSVYcU+r+AQSN3NTnnd/qGomMdUZ5x6oX4YoiS44hQy\nY4bXdy/E8g4cnHzwmaRQePuh/RHdJ6rj7d0lL1o1AoGBANsKAljk4wpp1ieZ8Dzt\nioPw7xOQe5ZvniHyx8rXXER0aUeROeTsoWPZct9bkPsWgCepSZCu6CD9S8a81Pge\npLKvqaY+u6aUOqesCjasmXrteWE78HyB3GzNaL4ufJ1HcuzAPPXAvQmpYlyTLY9m\nWbGVgcRvfwm5GgqdoReSM26b\n-----END PRIVATE KEY-----\n",
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

const doc = new GoogleSpreadsheet(
  // Ganti ID Google Spreadsheet
  "14avSx--KfEGdmwBcysd3XQNGfsGNTpCAHm3UppjriWU" as string,
  serviceAccountAuth
);

export async function getValues(min: number, max: number) {
  "use server";

  try {
    await doc.loadInfo();

    const sheet = doc.sheetsByTitle["WTC" as string];
    const rows = await sheet.getRows();

    for (let index = min; index <= max; index++) {
      console.log(index);
      const element = rows[index - 2];
      const status = element.get("CEK");

      console.log("Function called");

      if (!(!status || status === "")) {
        console.log("PASS 1");
        if (
          (status.toLowerCase() == "ok" || status.toLowerCase() == "send") &&
          element.get("EMAIL") != ""
        ) {
          console.log("PASS 2");
          console.log(element);

          const nama = element.get("NAMA");
          const kelasPound = element.get("KELAS POUND");
          const nomorSlot = element.get("SLOT");
          const jumlah = element.get("JML PESERTA");
          const sewa = element.get("Sewa");
          const shop = element.get("Shop Now ! Thanks later ❤️") || "-";

          const email = element.get("EMAIL");
          const subject = "Pendaftaran Sukses";

          console.log("Email : " + email);

          const html =
            "Thank Youuu kak " +
            nama +
            ",<br /><br />" +
            "Pendaftaran POUND CLASS telah diterima! .<br />" +
            "Mohon untuk datang 30 menit sebelumnya!!:<br /><br />" +
            "Kelas Pound " +
            kelasPound +
            "<br />" +
            "Nomor Slot: " +
            nomorSlot +
            "<br />" +
            "Jumlah: " +
            jumlah +
            "<br />" +
            "Sewa :  " +
            sewa +
            "<br />" +
            "Shop :  " +
            shop +
            "<br />" +
            "WAJIB!! Membawa KTP/SIM untuk penukaran Ripstix!! .<br /><br />" +
            "Jangan lupa membawa MATRAS dan AIR MINERAL!!! .<br /><br />" +
            "Untuk kelas lebih seru yuk join WA grup kita : https://chat.whatsapp.com/G0lXDPKcYYX8EiPgAkmhHp <br /><br />" +
            "Don't forget to follow Instagram @indipound <br /><br />" +
            "Untuk pertanyaan lainnya hub WA:08113377373 (chat ONLY) .<br /><br /> " +
            "See u there!<br />" +
            "Let's Get Rock Together!!!";
          // console.log(EmailValidator.validate(email));
          await sendMail(email, subject, html)
            .then(async (value) => {
              console.log("mail value");
              await sheet
                .loadCells(`K${index}`)
                .then(async () => {
                  const thisCell = sheet.getCellByA1(`K${index}`);
                  thisCell.backgroundColor = {
                    red: 0.8,
                    green: 0.98,
                    blue: 0.81,
                  };
                  // thisCell.value = "Email Terkirim";
                  element.set("SEND", "Email Terkirim");
                  await thisCell.save();
                })
                .catch(async (reason) => {
                  console.log("error sending email");
                  console.log(reason);
                  if (!EmailValidator.validate(email)) {
                    const thisCell = sheet.getCellByA1(`K${index}`);
                    thisCell.backgroundColor = {
                      red: 1.0,
                      green: 0.8,
                      blue: 0.79,
                    };
                    await thisCell.save();
                  }
                  throw new Error("Error sending email!");
                })
                .finally(async () => {
                  await element.save();
                });
            })
            .catch((error: any) => {
              throw error;
            });
        } else {
          const thisCell = sheet.getCellByA1(`K${index}`);
          thisCell.backgroundColor = {
            red: 1.0,
            green: 0.8,
            blue: 0.79,
          };
          await thisCell.save();
        }
      }
    }
  } catch (error) {
    console.log("something error!");
    console.log(error);
    throw error;
  }
}
