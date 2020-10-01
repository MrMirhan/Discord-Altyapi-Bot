# discord-altyapi-bot
Bu altyapı Discord.js v11.6.4 ile yapıldı. v12'ye göre daha basit olan v11 üzerinde botlarınızı bu altyapıyla yapmak çok daha basit.
Botun yapımcısı benim. Discord adresim `Button#6666`
Lütfen kendiniz yapmışsınız gibi paylaşmayınız. Emeğe az da olsa saygı gösteriniz.

Bot tamamen boştur, tek fonksiyonu yetki sistemidir. Altyapıya göre kendi komutlarınızı oluşturabilirsiniz.
Rahat oluşturmanız için `komutlar/test.js` komutunu boş olarak koydum. Burada oluşturup yeni bir `js` dosyasına koyabilirsiniz.

# İndirme

`$ git clone https://github.com/MrMirhan/discord-altyapi-bot`

`cd discord-altyapi-bot`

`npm install`

Şimdi sıra `config` düzenlemekte.
Ana klasörde bulunan `config.json` dosyasını açın.

`TOKEN` kısmına kendi botunuzun tokenini yazın.
`PREFIX` kısmına istediğiniz prefixi yazın.

# Discord v11 sorunu çözümü
Discord v11 yerine botunuzda v12 kuruluysa bunu uygulayın:

Terminali botunuzun bulunduğu klasörde açın ve

`npm remove discord.js`

`npm install discord.js@v11.6.4 --save`

Artık v11 kurulu olacak.

# Oynuyor değiştirme
Botunuzun oynuyor kısmını değiştirmek için öncelikle `/events/ready.js` dosyasını açın. `client.user.setActivity(`${PREFIX}yardım`);` bölümünde `${PREFIX}yardım` kısmını değiştirdiğinizde oynuyor kısmı değişecek.

# Botu başlatmak
Botunuzu `node app.js` yazarak başlatabilirsiniz.

Veya `baslat.bat` üzerine 2 kere tıklayarak da başlatabilirsiniz.
