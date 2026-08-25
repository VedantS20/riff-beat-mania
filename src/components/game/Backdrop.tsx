export function Backdrop() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-background">
      <div className="animate-aurora absolute -top-1/3 left-[-10%] h-[70vh] w-[70vw] rounded-full bg-primary/25 blur-[120px]" />
      <div
        className="animate-aurora absolute right-[-15%] bottom-[-20%] h-[60vh] w-[60vw] rounded-full bg-violet/25 blur-[130px]"
        style={{ animationDelay: "-6s" }}
      />
      <div
        className="animate-aurora absolute top-1/4 left-1/3 h-[45vh] w-[45vw] rounded-full bg-violet/10 blur-[140px]"
        style={{ animationDelay: "-11s" }}
      />
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />
    </div>
  );
}
