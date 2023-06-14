export default function Toggleable({ children, show }) {
  if (show) return <>{children}</>;
}
