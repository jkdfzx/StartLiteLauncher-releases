// 由下載頁 index.html 的翻譯產生各語言 README：修改 index.html 的文字後執行 node gen-readme.mjs index.html .
import fs from 'node:fs'
const [src, out] = process.argv.slice(2)
const html = fs.readFileSync(src, 'utf8')
const TEXT = new Function(html.slice(html.indexOf('const TEXT ='), html.indexOf('const LANG_KEY')) + '; return TEXT')()
const EXTRA = {
  'zh-TW': ['這個儲存庫只提供 Android App 的安裝檔，不包含原始碼。', '下載頁（依語言顯示安裝說明）'],
  'zh-CN': ['这个仓库只提供 Android App 的安装文件，不包含源代码。', '下载页面（按语言显示安装说明）'],
  en: ["This repository only hosts the Android app's installation files; it contains no source code.", 'Download page (instructions in your language)'],
  ja: ['このリポジトリは Android アプリのインストールファイルのみを提供しており、ソースコードは含まれていません。', 'ダウンロードページ（言語別の説明）'],
  ko: ['이 저장소는 Android 앱 설치 파일만 제공하며 소스 코드는 포함되어 있지 않습니다.', '다운로드 페이지(언어별 안내)'],
  de: ['Dieses Repository stellt nur die Installationsdateien der Android-App bereit; es enthält keinen Quellcode.', 'Download-Seite (Anleitung in Ihrer Sprache)'],
  fr: ["Ce dépôt ne fournit que les fichiers d'installation de l'appli Android ; il ne contient pas de code source.", 'Page de téléchargement (instructions dans votre langue)'],
  es: ['Este repositorio solo aloja los archivos de instalación de la app para Android; no contiene código fuente.', 'Página de descarga (instrucciones en tu idioma)'],
  'pt-BR': ['Este repositório hospeda apenas os arquivos de instalação do app para Android; não contém código-fonte.', 'Página de download (instruções no seu idioma)'],
  vi: ['Kho này chỉ chứa tệp cài đặt ứng dụng Android, không có mã nguồn.', 'Trang tải xuống (hướng dẫn theo ngôn ngữ của bạn)'],
  th: ['ที่เก็บนี้มีเฉพาะไฟล์ติดตั้งแอป Android ไม่มีซอร์สโค้ด', 'หน้าดาวน์โหลด (คำแนะนำตามภาษาของคุณ)'],
  id: ['Repositori ini hanya berisi file pemasangan aplikasi Android; tidak berisi kode sumber.', 'Halaman unduhan (petunjuk dalam bahasa Anda)'],
}
const APK = 'https://github.com/jkdfzx/StartLiteLauncher-releases/releases/latest/download/StartLiteLauncher.apk'
const PAGE = 'https://jkdfzx.github.io/StartLiteLauncher-releases/'
const ALL = 'https://github.com/jkdfzx/StartLiteLauncher-releases/releases'
const fileOf = (code) => (code === 'en' ? 'README.md' : `README.${code}.md`)
const langBar = Object.entries(TEXT).map(([code, t]) => `[${t.name}](${fileOf(code)})`).join(' · ')
for (const [code, t] of Object.entries(TEXT)) {
  const [repoNote, pageLabel] = EXTRA[code]
  // 句尾標點：中日文用全形句號，泰文用空格，其他用英文句點
  const cjk = /^(zh|ja)/.test(code)
  const end = cjk ? '。' : code === 'th' ? ' ' : '. '
  const md = `# StartLite Launcher

${langBar}

${t.tagline}${end}${repoNote}

**[${t.download}](${APK})** · [${pageLabel}](${PAGE}) · [${t.allVersions}](${ALL})

${t.requires}

## ${t.installTitle}

1. ${t.step1}
2. ${t.step2}
3. ${t.step3}
4. ${t.step4}

## ${t.updateTitle}

${t.updateText}

## ${t.faqTitle}

- **${t.conflictQ}**：${t.conflictA}
- **${t.defaultQ}**：${t.defaultA}
- **${t.internetQ}**：${t.internetA}
`
  fs.writeFileSync(`${out}/${fileOf(code)}`, md.replaceAll('**：', cjk ? '**：' : '**: '))
}
console.log(Object.keys(TEXT).map(fileOf).join(' '))
