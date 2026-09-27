import DojahLogo from "@/assets/images/brands/dojah.png";
import QuidaxLogo from "@/assets/images/brands/quidax.png";
import FlutterwaveLogo from "@/assets/images/brands/flutterwave.png";
import OndoLogo from "@/assets/images/brands/ondo.png";

// Heights are tuned per logo so wide and compact marks read at a similar
// visual weight.
const BRANDS = [
  { name: "Dojah", logo: DojahLogo, height: "h-8 lg:h-10" },
  { name: "Quidax", logo: QuidaxLogo, height: "h-8 lg:h-10" },
  { name: "Flutterwave", logo: FlutterwaveLogo, height: "h-6 lg:h-7" },
  { name: "Ondo", logo: OndoLogo, height: "h-7 lg:h-9" },
];

// One marquee cycle repeats the brand list so it is wider than the widest
// viewport; the track holds two identical cycles and slides by exactly one
// (-50%), which makes the loop seamless.
const CYCLE = [...BRANDS, ...BRANDS];
const TRACK = [...CYCLE, ...CYCLE];

export default function BrandsSection() {
  return (
    <section
      aria-labelledby="brands-heading"
      className="space-y-6 lg:space-y-8"
    >
      <h2
        className="text-center text-base lg:text-lg font-medium text-gray-600"
        id="brands-heading"
      >
        Brands We Work With:
      </h2>

      <div className="brand-wall mx-auto max-w-7xl">
        <ul className="brand-track">
          {TRACK.map((brand, index) => {
            // Only the first copy is announced; the repeats just feed the
            // mobile loop and are hidden on the static desktop row.
            const isRepeat = index >= BRANDS.length;

            return (
              <li
                key={`${brand.name}-${index}`}
                aria-hidden={isRepeat || undefined}
                className={isRepeat ? "flex md:hidden" : "flex"}
              >
                <img
                  alt={isRepeat ? "" : brand.name}
                  className={`${brand.height} w-auto opacity-80 transition-opacity duration-300 hover:opacity-100`}
                  draggable={false}
                  src={brand.logo}
                />
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
