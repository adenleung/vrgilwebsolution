import Image from "next/image";
export function Brand({ light = false }: { light?: boolean }) {
  return (
    <span className={`brand-mark${light ? " brand-light" : ""}`}>
      <Image
        src="/vrgil-logo.png"
        alt="VRGIL Web Solutions"
        width={646}
        height={386}
        sizes="184px"
        priority
      />
    </span>
  );
}
