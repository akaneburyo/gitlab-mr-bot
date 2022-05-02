# Gitlab MR Bot

Notify Teams when merged

## 概要

Gitlab 上で MR がマージされると、Teams 上に通知を送ります。  
その際以下の情報を GitlabAPI から取得し、通知に含めます。

- MR の ID
- MR のタイトル
- Open したユーザー名(メンションします)
- Merge したユーザー名(メンションします)
- 変更されたファイルの数
- コミットの数とメッセージ、ID

## アーキテクチャ

![architecture.svg](doc/architecture.svg)

## 利用の流れ

0. 事前準備  
   通知を行いたいチャネルに IncomingWebhook のコネクタを追加し、WebhookURL を取得する  
   GitlabAPI へのアクセスに使用するアクセストークンを取得する

1. 本サービスへの登録  
   前の手順で取得した WebhookURL を本サービスへ登録する

2. リポジトリへの WebhookURL の追加  
   登録時に発行された WebhookURL を、通知を行いたいリポジトリの`Settings > Integrations`から追加する  
   ※ `Secret Token`には前の手順で取得したトークンを入力し、`Merge request events`にチェックをつけた上で登録

3. MR をマージする  
   Teams に通知が発行されることを確認する

## 制限

- Gitlab 10.7.2
- Gitlab の URL が不変(`{env.GITLAB_URL}`)
- Teams 1.5
- メンション先ユーザーのメールアドレスが@`{env.EMAIL_DOMAIN}`で終わること
