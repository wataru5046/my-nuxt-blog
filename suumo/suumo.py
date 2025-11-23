import requests
from bs4 import BeautifulSoup
import csv

URL = "https://suumo.jp/chintai/saitama/city-11201/"  # 川越市の賃貸トップ

response = requests.get(URL, headers={"User-Agent": "Mozilla/5.0"})
soup = BeautifulSoup(response.text, "html.parser")

items = soup.select(".cassetteitem")

rows = []
for item in items:
    title = item.select_one(".cassetteitem_content-title")
    address = item.select_one(".cassetteitem_detail-col1")
    rent = item.select_one(".cassetteitem_other-emphasis")

    rows.append([
        title.get_text(strip=True) if title else "",
        address.get_text(strip=True) if address else "",
        rent.get_text(strip=True) if rent else "",
    ])

with open("kawagoe.csv", "w", newline="", encoding="utf-8") as f:
    writer = csv.writer(f)
    writer.writerow(["物件名", "住所", "賃料"])
    writer.writerows(rows)

print("CSV を出力しました → kawagoe.csv")
