# node_modules'u Git geçmişinden temizleme

GitHub push reddedildi çünkü `node_modules` (özellikle 129 MB'lık Next.js dosyası) commit'e girmiş. Aşağıdaki adımları **repo kökünde** (git komutlarını çalıştırdığın klasörde) uygula.

## Adım 1: Son commit'i geri al (dosyalar staged kalır)

```bash
git reset --soft HEAD~1
```

## Adım 2: node_modules ve .next'u staging'den çıkar (repo'da silinmez, sadece takipten çıkar)

**Eğer repo `client` klasörüyse** (yani .git client içindeyse):

```bash
git rm -r --cached node_modules
git rm -r --cached .next
```

**Eğer repo NALIN köküyse** (client ve server üst klasördeyse):

```bash
git rm -r --cached client/node_modules
git rm -r --cached server/node_modules
git rm -r --cached client/.next
```

## Adım 3: Kontrol et

```bash
git status
```

`node_modules` ve `.next` "deleted" veya "to be committed" altında görünmeli; tekrar "untracked" olarak listelenmemeli (çünkü .gitignore'da).

## Adım 4: Yeni commit at

```bash
git add .
git commit -m "Initial commit (node_modules and .next excluded)"
```

## Adım 5: Push et

```bash
git push -u origin main
```

---

**Not:** `.gitignore` zaten `node_modules/` ve `.next/` içeriyor; bir daha commit'e girmeyecek.
