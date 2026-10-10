import Link from "next/link";

function LogoIcon() {
  return (
    <svg
      width="26"
      height="26"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </svg>
  );
}

function BrandingPanel() {
  return (
    <div className="relative hidden overflow-hidden lg:flex lg:flex-col lg:justify-between lg:p-14 text-white"
      style={{ background: "linear-gradient(155deg, #F6A98E 0%, #F2937A 45%, #EC7E62 100%)" }}
    >
      {/* Decorative circles */}
      <div className="absolute w-[420px] h-[420px] rounded-full top-[-140px] right-[-120px]"
        style={{ background: "rgba(255,255,255,.12)" }}
      />
      <div className="absolute w-[300px] h-[300px] rounded-full bottom-[-110px] left-[-80px]"
        style={{ background: "rgba(255,255,255,.10)" }}
      />

      {/* Logo */}
      <div className="flex items-center gap-3 relative">
        <div className="w-[46px] h-[46px] rounded-[14px] flex items-center justify-center"
          style={{ background: "rgba(255,255,255,.22)" }}
        >
          <LogoIcon />
        </div>
        <span className="font-display font-semibold text-[21px] tracking-wide">
          OpenDayCare
        </span>
      </div>

      {/* Heading */}
      <div className="relative">
        <h1 className="font-display font-semibold text-[42px] leading-[1.12] m-0 mb-[18px]">
          El día de cada niño,<br />compartido con su familia.
        </h1>
        <p className="text-[17px] leading-[1.6] m-0 max-w-[430px] text-white/90">
          Publicá momentos, gestioná las salas y mantené a las familias cerca, desde un solo lugar.
        </p>
      </div>

      {/* Footer */}
      <div className="relative text-sm text-white/90">
        🌿 Guardería Sala Soles
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen grid lg:grid-cols-[1.05fr_1fr] bg-cream">
      <BrandingPanel />

      <div className="flex items-center justify-center p-4 sm:p-6 lg:p-10">
        <div className="w-full max-w-[392px]">
          <h2 className="font-display font-semibold text-[30px] m-0 mb-1.5 text-ink">
            Iniciar sesión
          </h2>
          <p className="m-0 mb-7 text-subtle text-[15px]">
            Ingresá para ver el día de hoy.
          </p>

          {/* Email field */}
          <label className="block text-[12px] font-bold tracking-[0.7px] text-subtle mb-2">
            EMAIL
          </label>
          <input
            type="email"
            defaultValue="caro@opendaycare.com"
            className="w-full py-3.5 px-4 rounded-[14px] border-[1.5px] border-edge bg-white text-[15px] text-ink mb-[18px] outline-none"
          />

          {/* Password field */}
          <label className="block text-[12px] font-bold tracking-[0.7px] text-subtle mb-2">
            CONTRASEÑA
          </label>
          <input
            type="password"
            placeholder="••••••••"
            className="w-full py-3.5 px-4 rounded-[14px] border-[1.5px] border-edge bg-white text-[15px] text-ink mb-2.5 outline-none placeholder:text-placeholder"
          />
          <div className="text-right mb-5">
            <span className="text-accent-deep text-[13.5px] font-bold cursor-pointer">
              ¿Olvidaste tu contraseña?
            </span>
          </div>

          {/* Submit button */}
          <Link
            href="/"
            className="block text-center w-full py-[15px] rounded-[15px] text-white font-extrabold text-base cursor-pointer no-underline"
            style={{
              background: "linear-gradient(180deg, #F4977E, #EE8164)",
              boxShadow: "0 10px 22px -8px rgba(238,129,100,.7)",
            }}
          >
            Iniciar sesión
          </Link>

          {/* Activation link */}
          <p className="text-center mt-6 m-0 text-subtle text-[14.5px]">
            ¿Te invitó la guardería?{" "}
            <Link href="/activate" className="text-accent-deep font-extrabold no-underline">
              Activá tu cuenta
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
