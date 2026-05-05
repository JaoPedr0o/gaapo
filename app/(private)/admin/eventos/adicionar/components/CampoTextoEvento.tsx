type CampoTextoEventoProps = {
  id: string;
  label: string;
  valor: string;
  placeholder: string;
  tipo?: "text" | "date" | "time";
  largura?: string;
  onChange: (valor: string) => void;
};

export default function CampoTextoEvento({
  id,
  label,
  valor,
  placeholder,
  tipo = "text",
  largura = "w-full",
  onChange,
}: CampoTextoEventoProps) {
  return (
    <div className={`relative ${largura}`}>
      <label
        htmlFor={id}
        className="absolute -top-[10px] left-[13px] bg-white px-2 text-[12px] font-light text-[#252525]"
      >
        {label}
      </label>

      <input
        id={id}
        name={id}
        type={tipo}
        value={valor}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        className="h-[48px] w-full rounded-[8px] border border-[#52c4d7] bg-white px-4 text-[13px] font-light text-[#252525] shadow-[1px_2px_3px_rgba(0,0,0,0.15)] outline-none placeholder:text-[#9d9d9d] focus:border-[#40b8cc] focus:ring-2 focus:ring-[#52c4d7]/30"
      />
    </div>
  );
}