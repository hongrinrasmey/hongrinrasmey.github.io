# My Portfolio Website

A simple one-page portfolio. Plain HTML, CSS and JavaScript: no framework, no build step, nothing to install.

## Open the site
Double-click `index.html`. It opens in your browser.

## Files
```
index.html        all the text, projects and links
css/style.css     all the styles (colors and fonts are at the top)
js/main.js        theme toggle, mobile menu, scroll animations, copy-email button
assets/images/    your photo and project screenshots
assets/resume.pdf your résumé (optional)
favicon.svg       the small icon in the browser tab
```

## Edit your text
Open `index.html` in a text editor (VS Code is good). Each part of the page has a comment like
`<!-- ===== PROJECTS ===== -->` so you can find it. Replace every `[TODO: ...]` with your own words.
Search the file for `TODO` to find them all.

Do not forget the `<title>` and `<meta name="description">` near the top. They show in Google and in the browser tab.

## Add or change a project
1. In `index.html`, find `<!-- ===== PROJECTS ===== -->`.
2. Copy one whole `<article class="project"> ... </article>` block and paste it below the others.
3. Change the name, description and tech tags.
4. Links: put your URL in `href="..."` for **Live** and **Code**. If a project has no live site or no code, leave `href="#"`. That button is then hidden automatically.

Use 2 to 4 projects. They sit in 1 column on phones and 2 columns on bigger screens.

## Add images
1. Save the image in `assets/images/`. WebP is best. Keep each file under about 300 KB. Squoosh (https://squoosh.app) can shrink them for free.
2. **Project screenshot:** in the project block, replace
   `<div class="project-shot placeholder-box">Screenshot coming soon</div>` with
   ```html
   <img class="project-shot" src="assets/images/my-project.webp" alt="Screenshot of My Project" width="1200" height="750" loading="lazy">
   ```
   Set `width` and `height` to the image's real size.
3. **Your photo:** save it as `assets/images/me.jpg`. In the ABOUT section, remove the `<!--` and `-->` around the `<img class="about-photo" ...>` line.

## Résumé, GitHub, LinkedIn, email
- **Email:** in the CONTACT section, change `TODO-your-email` in both `mailto:` links, and change the visible text.
- **GitHub / LinkedIn:** put your profile URL in `href="..."`. While it is `href="#"`, the icon stays hidden.
- **Résumé:** save it as `assets/resume.pdf`, then change that button's `href="#"` to `href="assets/resume.pdf"`.

## Experience section (optional)
In `index.html`, find `<!-- ===== EXPERIENCE (optional) =====`. Remove the comment marks around the section to show it.
Also uncomment the Experience link in the header.

## Change colors or fonts
Open `css/style.css`. The variables at the very top control everything:
- `--bg`, `--text`, `--accent` and the rest, once for dark mode and once for light mode.
- `--font-heading` and `--font-body`. If you change fonts, also update the Google Fonts `<link>` in `index.html`.

## Deploy (free)

### GitHub Pages
1. Create a new repository on GitHub. Push this folder to it:
   ```
   git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO.git
   git push -u origin main
   ```
2. On GitHub, open the repo, then go to **Settings → Pages**.
3. Under "Build and deployment", choose **Deploy from a branch**. Pick `main` and `/ (root)`, then click Save.
4. After about a minute the site is live at `https://YOUR-USERNAME.github.io/YOUR-REPO/`.

### Netlify or Vercel
1. Sign in with GitHub at netlify.com or vercel.com.
2. Choose "Add new site / New project", then import your repository.
3. Leave the build command empty and the output folder as the root. Click Deploy.

Every time you push a change to GitHub, the site updates by itself.

### Custom domain (optional)
1. Buy a domain (Namecheap, Cloudflare, Porkbun...).
2. **GitHub Pages:** Settings → Pages → Custom domain. Type your domain and save. At your domain provider, add the DNS records GitHub shows you.
3. **Netlify / Vercel:** open the project → Domains → Add domain. Then follow the DNS steps they show.
4. HTTPS turns on by itself after the DNS works. This can take up to a day.

## Old version
The folder `_old-astro-version/` holds an earlier Astro build of this site. It is not used and is not uploaded to git.
Delete it when you no longer need it.
