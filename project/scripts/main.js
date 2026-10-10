/* Site-wide footer metadata: current year and the page's last-modified date. */

const footerMeta = document.getElementById('footer-meta');

if (footerMeta) {
  footerMeta.textContent = `© ${new Date().getFullYear()} Luiz MR Lemos · Last updated: ${document.lastModified}`;
}
