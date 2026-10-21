# StartLite Launcher Releases

StartLite Launcher 的公開下載與版本資訊。

- 下載：[Releases](https://github.com/jkdfzx/StartLiteLauncher-releases/releases/latest)
- 版本資訊（App 檢查更新用）：https://jkdfzx.github.io/StartLiteLauncher-releases/version.json

## version.json

| 欄位 | 型別 | 說明 |
|---|---|---|
| `latest` | 整數 | 最新版的 versionCode |
| `latestName` | 字串 | 最新版的 versionName |
| `minimum` | 整數 | 最低可用的 versionCode；低於它會顯示不能略過的更新提示（不擋畫面）。必須 ≤ `latest`，0 表示不限制 |
| `downloadUrl` | 字串 | 下載網址（https） |

此檔由 StartLiteLauncher 的 GitHub Actions 自動更新，`minimum` 需要手動修改。
