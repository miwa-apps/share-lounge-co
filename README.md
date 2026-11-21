# Share Lounge Co.

沖縄県本部町のコワーキングスペースを案内する、日本語の静的1ページサイトです。ビルドやパッケージのインストールは不要です。

## ローカルで確認する

リポジトリのルートで次を実行します。

```sh
python3 -m http.server 8000 --bind 127.0.0.1
```

ブラウザーで [http://127.0.0.1:8000/](http://127.0.0.1:8000/) を開きます。画面幅を変えて、モバイルメニュー、利用案内・会議室予約への移動、車とバスの案内、準備中の予約ボタンを確認できます。

## GitHub Pages で公開する

1. 公開する変更を `main` ブランチに反映します。
2. リポジトリの **Settings → Pages** を開きます。
3. **Build and deployment** の **Source** で **Deploy from a branch** を選び、`main` と `/(root)` を指定して保存します。
4. デプロイ完了後、Pages の設定画面に表示される URL を開きます。

[GitHub Pages の公開元を設定する](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)

## 確定後の更新

- `index.html` の施設名テキストにロゴを添える場合も、サイト上の施設名は「Share Lounge Co.」と表記します。
- 利用シーンに写真を追加するときは、各 `.scene-media` の `hidden` を外し、画像パスと代替テキストを指定した `img` を中に追加します。
- 施設写真が届いたら、`index.html` の `.facility-photo` 内の案内文を `<img src="./assets/facility.jpg" alt="写真の内容を表す説明">` に差し替えます。ヒーローの海は CSS の装飾です。
- ヒーローの背景写真を差し替える場合は、`style.css` の `--hero-photo` に画像パスを指定します。
- アクセスの準備中の表示を、確定した住所、車の経路、バス停などの情報に差し替えます。
- Google フォームの URL が確定したら、会議室予約セクションの無効ボタンを、公式フォームを指すリンクに置き換えます。リンクには `class="button secondary"` を使用できます。準備中の文言を外し、スタッフ確認後に予約が確定する旨の案内は残します。

GitHub Pages公開確認中
