import requests
from bs4 import BeautifulSoup
import json
from datetime import datetime
from dateutil import parser

url = "https://www.republika.co.id/"
page = requests.get(url)
soup = BeautifulSoup(page.text, 'html.parser')
search_results = soup.find_all('li', class_='list-group-item list-border conten1')
data = []

for result in search_results:
    waktu_publish = result.find('div', class_="date").text.strip()
    kategori = result.find('span', class_="kanal-info").text.strip()
    judul = result.find('h3').text.strip()
    link = result.find('a')['href'].strip()

    # Konversi waktu
    waktu_rilis = None
    try:
        waktu_rilis = parser.parse(waktu_publish, fuzzy=True)
    except ValueError:
        print(f"Could not parse date: {waktu_publish}")
        continue

    scraped_time = datetime.now().strftime('%d/%B/%Y %H:%M:%S')
    data_item = {
        "Kategori": kategori,
        "Judul": judul,
        "Link Berita": link,
        "Waktu Rilis": waktu_rilis.strftime('%d/%B/%Y %H:%M:%S') if waktu_rilis else 'Unknown',
        "Waktu Scraping": scraped_time
    }
    data.append(data_item)

with open('news_data.json', 'w') as json_file:
    json.dump(data, json_file, indent=4)

print("Data telah disimpan di news_data.json")