# Arpit Dubey — Portfolio

## Folder structure
```
index.html
style.css
script.js
resume/
  Arpit_Dubey_Resume.pdf   ← already added, from your uploaded resume
images/
  profile.jpg              ← ADD YOUR PHOTO HERE (until then, a placeholder box shows)
projects/
  retail-sales-dashboard.pdf     ← ADD (e.g. exported PDF/screenshot of your Power BI dashboard)
  customer-segmentation.pdf      ← ADD (e.g. your Jupyter notebook exported as PDF, or a GitHub link)
assets/
  (unused for now — free for any extra icons/images later)
```

## To finish setup
1. Drop a square-ish photo into `<img width="1254" height="1254" alt="Profile" src="https://github.com/user-attachments/assets/a18e395a-1f0b-43f1-a3f3-067eb4543ed2" />

2. Add your two project files into `projects/`, OR open `index.html` and change the two lines:
   ```html
   <a class="project__link" href="projects/retail-sales-dashboard.pdf">View dashboard →</a>
   <a class="project__link" href="projects/customer-segmentation.pdf">View analysis →</a>
   ```
   to point at your GitHub repo links instead, e.g. `href="https://github.com/arpitdub/retail-dashboard"`.
3. Double check your GitHub username in `index.html` (currently set to `arpitdub` — update the
   `href="https://github.com/arpitdub"` link if that's not right).

## To publish on GitHub Pages
1. Push this folder to a GitHub repo (e.g. `arpitdub.github.io` for a root URL, or any repo name for a project page).
2. Repo Settings → Pages → Source: `main` branch, `/ (root)`.

3. Your site goes live at `https://<username>.github.io/` (or `/<repo-name>/`).

## Notes on the design
- Font pairing: Space Grotesk (headings) + Inter (body) + JetBrains Mono (data/labels) —
  a "data report" feel that fits a Business Analyst brand.
- The KPI strip on the hero animates up on page load, pulling real numbers from your resume
  (12,000+ transactions, 50,000+ records, 18%→48% revenue, 8.46 CGPA).
- No fake "skill %" progress bars — skills are grouped exactly as on your resume (Tools / SQL / Python / Excel / Soft Skills), which is more honest and matches how a Business Analyst would actually present it.
