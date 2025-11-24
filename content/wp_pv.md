---
title: "プラグインなしでwordpressで記事のPV数を取得する方法"
description: "プラグインなしでwordpressで記事のPV数を取得する方法を解説します"
date: "2025-09-14T17:47:54.329Z"
---

インハウスでサイトのコーディング担当をしているのですが、サポートチームから wordpress の改修依頼がありました。サポートチームではお客様の悩みを解決する Q&A の記事をまとめた wordpress のサイトを運営しています。この wordpress のサイトで、検索ボックスで記事を検索したときの一覧を、ページの PV 順に並びなおしてほしいという依頼です。

## wordpress では PV 数を保持する仕組みがない

wordpress では記事の PV 数を保持してくれません。調べたところ下記の 3 つの方法があるようです。

- プラグインで対応する
- pv 数を保持する仕組みを自力で作る
- GA4 から API 連携で値を引っ張ってくる

## pv 数を保持する仕組みを自力で作る方法を選びました

プラグインでやるのが一番手っ取り早いと思ったので、最初にプラグインの導入を検討してみました。どうやら Wp-PostViews というプラグインを見つけました。

ただ調べると開発終了したプラグインで、使うと警告が出てしまうらしいです。他によさそうなプラグインが見つからなかったので、他の方法を検討することにしました。

API 連携は手間がかかりそうと思い、pv 数を保持する仕組みを自力で作ることにしました。

## function.php に pv 保持の仕組みを設置する

下記が wordpress に pv を保持するためのコードになります。

```php

// ===============================
//  PV数をカウントして保存する関数
// ===============================
function set_post_views($postID)
{
	$count_key = 'post_views_count';
	$count = get_post_meta($postID, $count_key, true);
	if ($count == '') {
		$count = 0;
		delete_post_meta($postID, $count_key);
		add_post_meta($postID, $count_key, '1');
	} else {
		$count++;
		update_post_meta($postID, $count_key, $count);
	}
}

// ===============================
//  PV数を取得する関数（テンプレートなどで表示用）
// ===============================
function get_post_views($postID)
{
	$count_key = 'post_views_count';
	$count = get_post_meta($postID, $count_key, true);
	if ($count == '') {
		delete_post_meta($postID, $count_key);
		add_post_meta($postID, $count_key, '0');
		return "0";
	}
	return $count;
}

// ===============================
//  投稿を表示したときに PV数をカウントする処理
// ===============================
function track_post_views($post_id)
{
	if (!is_single()) return; // 単一記事ページでのみ実行
	if (empty($post_id)) {
		global $post;
		$post_id = $post->ID;
	}
	set_post_views($post_id);
}
add_action('wp_head', 'track_post_views');

// ===============================
//  管理画面の投稿一覧に PV数カラムを追加
// ===============================
function add_views_column($columns)
{
	$columns['post_views'] = 'PV数';
	return $columns;
}
add_filter('manage_posts_columns', 'add_views_column');

// ===============================
// 管理画面の PV数カラムに値を表示
// ===============================
function show_views_column($column_name, $post_id)
{
	if ($column_name === 'post_views') {
		echo get_post_views($post_id);
	}
}
add_action('manage_posts_custom_column', 'show_views_column', 10, 2);

```

管理画面を見ると下記のように PV 数が表示されているのが分かります。

## 検索結果を PV 数の多い順に並べる

PV 数をとれるようになったので、今回の要件に合わせて検索ページに表示される一覧を PV 数が多い順に並べる実装も行いました。それが下記のコードになります。

```php
// ===============================
// 検索結果をPV数の多い順に並べ替える
// ===============================
function sort_search_by_views($query)
{
	// 管理画面ではなく、メインクエリ、かつ検索ページのみ実行
	if (!is_admin() && $query->is_main_query() && $query->is_search()) {
		$query->set('meta_key', 'post_views_count'); // PV数のキー
		$query->set('orderby', 'meta_value_num');    // 数値としてソート
		$query->set('order', 'DESC');                // 降順（PV多い順）
	}
}
add_action('pre_get_posts', 'sort_search_by_views');

```
