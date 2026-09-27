import PhoneMockup from "@/assets/images/phones_mockup.png";
import Ethereum from "@/assets/images/orbit/ethereum.png";
import Google from "@/assets/images/orbit/google.png";
import Amazon from "@/assets/images/orbit/amazon.png";
import Nvidia from "@/assets/images/orbit/nvidia.png";
import Tesla from "@/assets/images/orbit/tesla.png";
import Dangote from "@/assets/images/orbit/dangote.png";
import Meta from "@/assets/images/orbit/meta.png";
import Fcmb from "@/assets/images/orbit/fcmb.png";
import Doge from "@/assets/images/orbit/doge.png";
import Bitcoin from "@/assets/images/orbit/bitcoin.png";

const ORBIT_LOGOS = [
  { name: "Ethereum", src: Ethereum },
  { name: "Google", src: Google },
  { name: "Amazon", src: Amazon },
  { name: "Nvidia", src: Nvidia },
  { name: "Tesla", src: Tesla },
  { name: "Dangote", src: Dangote },
  { name: "Meta", src: Meta },
  { name: "FCMB", src: Fcmb },
  { name: "Dogecoin", src: Doge },
  { name: "Bitcoin", src: Bitcoin },
];

const STEP = 360 / ORBIT_LOGOS.length;

/**
 * Asset logos on an evenly spaced ring that slowly rotates around the phone
 * mockup, hugging their edges. The ring sits slightly below the phones'
 * centre, so logos pass behind the phones at the top and come into full view
 * along the sides and bottom.
 */
export default function AssetOrbit() {
  return (
    <div className="relative mx-auto mb-8 aspect-square w-full max-w-[14.25rem] sm:mb-10 sm:max-w-[18rem] lg:mx-0 lg:mb-[3.125rem] lg:ml-auto lg:mr-16 lg:max-w-[22.5rem]">
      {/* Dropped by about one logo height (14% of the stage) so the top arc
          runs behind the phones; the stage's bottom margin reserves the same
          drop so the lowest logos are never clipped. */}
      <div
        aria-hidden="true"
        className="orbit-spin absolute left-[6%] top-[20%] aspect-square w-[88%]"
      >
        {ORBIT_LOGOS.map((logo, index) => {
          const angle = STEP * index;

          return (
            <div
              key={logo.name}
              className="absolute inset-0"
              style={{ transform: `rotate(${angle}deg)` }}
            >
              <div className="absolute left-1/2 top-0 w-[13%] -translate-x-1/2 -translate-y-1/2">
                {/* Undo the slot's angle, then the ring's spin, so each logo
                    stays upright as it travels. */}
                <div style={{ transform: `rotate(${-angle}deg)` }}>
                  <img
                    alt=""
                    className="orbit-counter-spin block w-full select-none drop-shadow-sm"
                    draggable={false}
                    src={logo.src}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <img
        alt="Lisah app screens"
        className="absolute left-1/2 top-1/2 z-10 w-[85%] -translate-x-1/2 -translate-y-1/2 drop-shadow-xl"
        src={PhoneMockup}
      />
    </div>
  );
}
