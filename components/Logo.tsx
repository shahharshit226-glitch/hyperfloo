// The intro drawing, as the HYPERFLOO logo mark.
export const LOGO_PATHS = ["M100 300A200 200 0 0 1 500 300","M500 300A200 200 0 0 1 100 300","M20 300H580","M300 40V560","M130 130L470 470","M470 130L130 470","M170 300A130 130 0 1 1 430 300"];
export default function Logo({ size = 30 }: { size?: number }) {
  return <svg viewBox="0 0 600 600" width={size} height={size} fill="none" stroke="currentColor" strokeWidth={36} strokeLinecap="round" aria-hidden>{LOGO_PATHS.map(d => <path key={d} d={d} />)}</svg>;
}
