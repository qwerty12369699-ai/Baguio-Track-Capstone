from pathlib import Path

hotline_html = '''  <section class="card">
      <h3>Emergency Hotlines</h3>
      <ul class="info-list">
        <li><strong>CDRRMO:</strong> 0927-628-0498</li>
        <li><strong>EMS:</strong> 442-1911 · 0905-555-1911 · 426-1901 · 0921-320-8052</li>
        <li><strong>BCPO:</strong> (074) 661-1471 · 0998-598-7739 · 0917-575-8993</li>
        <li><strong>Fire Station:</strong> 442-2222 · 0912-409-6114 · 443-7089</li>
      </ul>
    </section>\n'''

base = Path(__file__).parent
files = [p for p in base.glob('*.html') if p.name not in ('index.html', 'home.html', 'tourist.html', 'jeepterminal.html', 'admin.html', 'adminlogin.html')]

for path in files:
    text = path.read_text(encoding='utf-8')
    if 'Baguio City Risk Reduction Management Office' in text:
        print(f'skipped already updated: {path.name}')
        continue
    marker = '<div id="imgPopup">'
    if marker in text:
        updated = text.replace(marker, hotline_html + marker, 1)
        if updated != text:
            path.write_text(updated, encoding='utf-8')
            print(f'updated {path.name}')
    else:
        print(f'marker not found in {path.name}')
