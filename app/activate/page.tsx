import Link from "next/link";

function LogoIcon() {
  return (
    <svg
      width="30"
      height="30"
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

function CheckIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

interface ActivateAccountPageProps {
  searchParams: Promise<{
    code?: string;
    email?: string;
    kidName?: string;
    roomName?: string;
  }>;
}

export default async function ActivateAccountPage({
  searchParams,
}: ActivateAccountPageProps) {
  const params = await searchParams;
  const code = params.code || "7K4P9";
  const email = params.email || "lucia.fernandez@gmail.com";
  const kidName = params.kidName || "Mateo";
  const roomName = params.roomName || "Sala Soles";
  const initial = kidName.charAt(0).toUpperCase();

  return (
    <div className="min-h-screen flex items-center justify-center bg-cream p-10">
      <div className="w-full max-w-[440px]">
        {/* Logo */}
        <div
          className="w-[58px] h-[58px] rounded-[18px] flex items-center justify-center mb-[22px] text-white"
          style={{
            background: "linear-gradient(155deg, #F8C3A8, #F2937A)",
            boxShadow: "0 12px 26px -10px rgba(238,129,100,.65)",
          }}
        >
          <LogoIcon />
        </div>

        {/* Title */}
        <h1 className="font-display font-semibold text-[32px] leading-[1.15] m-0 mb-2 text-ink">
          Bienvenida a OpenDayCare
        </h1>
        <p className="m-0 mb-[26px] text-subtle text-[15.5px] leading-[1.55]">
          Te invitaron a seguir el día de tu hijo. Creá tu contraseña para activar la cuenta.
        </p>

        {/* Invitation card */}
        <div className="flex items-center gap-[14px] bg-white border-[1.5px] border-edge rounded-[16px] p-[14px_16px] mb-[22px]">
          <div className="w-[44px] h-[44px] rounded-full bg-sky text-sky-ink font-display font-semibold text-[19px] flex items-center justify-center flex-shrink-0">
            {initial}
          </div>
          <div>
            <div className="text-[13px] text-subtle">Te invitaron a seguir a</div>
            <div className="font-display font-semibold text-[17px] text-ink">
              {kidName} · {roomName}
            </div>
          </div>
        </div>

        {/* Invitation code */}
        <label className="block text-[12px] font-bold tracking-[0.7px] text-subtle mb-2">
          CÓDIGO DE INVITACIÓN
        </label>
        <input
          type="text"
          defaultValue={code}
          readOnly
          className="w-full py-3.5 px-4 rounded-[14px] border-[1.5px] border-edge bg-white text-[18px] tracking-[3px] font-bold text-ink mb-[18px] outline-none font-display"
        />

        {/* Email */}
        <label className="block text-[12px] font-bold tracking-[0.7px] text-subtle mb-2">
          EMAIL
        </label>
        <input
          type="email"
          defaultValue={email}
          readOnly
          className="w-full py-3.5 px-4 rounded-[14px] border-[1.5px] border-edge bg-white text-[15px] text-ink mb-[18px] outline-none"
        />

        {/* Password */}
        <label className="block text-[12px] font-bold tracking-[0.7px] text-subtle mb-2">
          CREAR CONTRASEÑA
        </label>
        <input
          type="password"
          placeholder="••••••••"
          className="w-full py-3.5 px-4 rounded-[14px] border-[1.5px] border-edge bg-white text-[15px] text-ink mb-[18px] outline-none placeholder:text-placeholder"
        />

        {/* Authorization checkbox */}
        <label className="flex items-start gap-3 bg-[#FBF1D6] rounded-[14px] p-[14px_16px] mb-6 cursor-pointer">
          <span className="w-6 h-6 rounded-lg bg-achievement flex items-center justify-center mt-[1px] flex-shrink-0">
            <CheckIcon />
          </span>
          <span className="text-[14px] text-[#8A7234] leading-[1.45]">
            Autorizo a la guardería a tomar y compartir fotos de mi hijo dentro de la app.
          </span>
        </label>

        {/* Submit button */}
        <Link
          href="/"
          className="block text-center w-full py-[15px] rounded-[15px] text-white font-extrabold text-base no-underline"
          style={{
            background: "linear-gradient(180deg, #F4977E, #EE8164)",
            boxShadow: "0 10px 22px -8px rgba(238,129,100,.7)",
          }}
        >
          Activar mi cuenta
        </Link>

        {/* Login link */}
        <p className="text-center mt-[22px] m-0 text-subtle text-[14.5px]">
          ¿Ya tenés cuenta?{" "}
          <Link href="/login" className="text-accent-deep font-extrabold no-underline">
            Iniciar sesión
          </Link>
        </p>
      </div>
    </div>
  );
}
