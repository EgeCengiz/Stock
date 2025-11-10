<img width="1286" height="834" alt="{F27B5C0A-19D8-4A8C-8F86-8B21D7F9A6D1}" src="https://github.com/user-attachments/assets/dad0227d-64c9-4cf3-a4e0-609943de2b25" /># Stok Takip Uygulaması


## Kullanılan Teknolojiler
- **Frontend:** React, Next.js, TypeScript, TailwindCSS, Framer Motion
- **Backend:** NestJS, TypeORM, PostgreSQL/MySQL
- **Authentication:** JWT
- **Diğer:** Axios, React Icons, React Hook Form

## Mimari Yapı ve Proje Dizini
Projede **monorepo** yapısı kullanıldı. Frontend ve Backend ayrı klasörlerde organize edilmiştir.


stoktakip/
├─ backend/  #Nest JS
│ ├─ src/
│ │ ├─ auth   # Jwt kısmının yapıldığı yer
│ │ ├─ exception  # Global hata kısmının yapıldığı yer
│ │ ├─ stock  # sok işlemlerinin log kayıtlarının tutulduğu yer
│ │ ├─ user  # kullanıcı kayıtlarının CRUD işlerimlerin yapıdıgı kısım
│ │ └─ products # Ürün kısmının yapıldıgı kısım
├─ frontend/ Next JS
 ├─ app
 │ ├─ componenet  # ortak kullanılan alanların yapıldıgı kısım
 │ ├─ home  # login olduktan sonraki kısım
 │ | ├─ personControl  # personel CRUD işlemlerinin ve yetkilendrilmenin yapıldıgı kısım
 │ | ├─ productEdit  # Ürün crud işlemlerinin yapıldığı kısım
 │ | ├─ stock  # stok CRUD işlemleri
 │ ├─ login  # login ekranı



## Bonus Özellikler
- Personel Yetki Kontrolü
- Log Kayıtları 
- Canva Özel Tasarımlar
- personel CRUD
- Detaylı Role ve Jwt entegrasyonu


## Kurulum Adımları
postrgosql Database name stock adında database oluşturun database şifresini ve kullanıcı adını backende ekleyin
İlk önce backend çalıştırılmalı daha sonra frontend 
backend adres : http://localhost:3000
frontend: http://localhost:3001

ilk giriş kaydı için postman kullanın postmande 
http://localhost:3000/auth/register adresine POST istegi atın 

body kısmı

{
    "name": "kullanıcı",
    "email": "email@a.com",
    "password": "password",
    "role": "Admin"
}

daha sonra

<img width="1286" height="834" alt="{F27B5C0A-19D8-4A8C-8F86-8B21D7F9A6D1}" src="https://github.com/user-attachments/assets/e5530e8e-75f4-46d7-b78a-35453ea6dead" />

<img width="1885" height="843" alt="{AD31871D-9974-4818-B254-40A517B6DC22}" src="https://github.com/user-attachments/assets/97637e26-6d7b-46ce-9131-da1ebe3d73c4" />
<img width="1902" height="965" alt="{3A1434EB-F87E-4F74-BC23-0010EEC865DF}" src="https://github.com/user-attachments/assets/dc156912-e64e-46df-97c2-a8a743d18d56" />

<img width="1792" height="851" alt="{699B9684-08E4-4EF3-AB62-9D9AE99B6819}" src="https://github.com/user-attachments/assets/e4330f62-ab98-43cc-875a-8a5f99c2e9df" />

1. Depoyu klonlayın:
```bash
git clone https://github.com/username/stok-takip.git
cd stok-takip

cd backend
npm install
npm run start:dev


cd frontend
npm install
npm run dev






