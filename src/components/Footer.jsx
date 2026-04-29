export default function Footer(props) {
  return (
    <footer class="shell-footer" role="contentinfo">
      <span class="footer-meta">Hostliday Orbit · v1 · pre-seed demo</span>
      <div class="footer-links">
        <button class="footer-link" onClick={() => props.onSurface("navigate")}>
          Navigate (preview)
        </button>
        <span class="footer-sep">·</span>
        <button class="footer-link" onClick={() => props.onSurface("components")}>
          Design system reference
        </button>
      </div>
    </footer>
  );
}
