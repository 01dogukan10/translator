# Çizgi Çevirici (Android)

## Yol A: Bilgisayarda Android Studio olmadan (GitHub ile)
1. github.com'da yeni (boş) bir depo aç.
2. Bu klasördeki her şeyi (.github klasörü dahil) depoya yükle.
3. Depoda "Actions" sekmesine gir, "APK derle" işleminin bitmesini bekle (~5 dk).
4. İşlemin içindeki "cizgi-cevirici-apk" dosyasını indir, zip'ten çıkan app-debug.apk'yı telefona at ve kur
   (Ayarlar > bilinmeyen kaynaklardan kuruluma izin ver).

## Yol B: Bilgisayarında Android Studio varsa
npm install
npx cap add android
npx cap sync android
npx cap open android   # Android Studio açılır, Run ile telefona kur

## Değişiklik yapınca
www/index.html dosyasını düzenle; Yol A'da tekrar yükle, Yol B'de `npx cap sync android` çalıştır.
