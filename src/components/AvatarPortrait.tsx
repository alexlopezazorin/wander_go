import { type CityProfile } from "@/lib/avatars";

interface Props {
  profile: CityProfile;
  talking: boolean;
}

export function AvatarPortrait({ profile, talking }: Props) {
  return (
    <div className="relative w-44 h-44 sm:w-56 sm:h-56">
      {/* halo */}
      <div
        className="absolute -inset-3 rounded-full"
        style={{
          background:
            "radial-gradient(circle, oklch(0.99 0.005 240 / 0.9), oklch(0.86 0.05 245 / 0.4) 60%, transparent 70%)",
          filter: "blur(2px)",
        }}
      />
      <div
        className={`relative w-full h-full rounded-full overflow-hidden border border-border bg-white shadow-[0_20px_60px_-20px_oklch(0.45_0.13_255_/_0.5)] ${
          talking ? "avatar-talking" : "avatar-bob"
        }`}
      >
        <img
          src={profile.avatar}
          alt={profile.character}
          className="w-full h-full object-cover object-top"
          width={768}
          height={768}
        />
        <span className="mouth-overlay" />
      </div>
    </div>
  );
}
