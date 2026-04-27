type CampoFormularioLoginProps = {
  id: string;
  label: string;
  tipo?: "text" | "password";
  valor: string;
  placeholder: string;
  autoComplete?: string;
  onChange: (valor: string) => void;
};

export default function CampoFormularioLogin({
  id,
  label,
  tipo = "text",
  valor,
  placeholder,
  autoComplete,
  onChange,
}: CampoFormularioLoginProps) {
  return (
    <div className="relative w-full">
      <label
        htmlFor={id}
        className="absolute -top-[10px] left-[14px] bg-white px-3 text-[14px] font-light leading-none text-[#2f2f2f]"
      >
        {label}
      </label>

      <input
        id={id}
        name={id}
        type={tipo}
        value={valor}
        placeholder={placeholder}
        autoComplete={autoComplete}
        onChange={(event) => onChange(event.target.value)}
        className="h-[55px] w-full rounded-[8px] border border-[#f5b900] bg-white px-[14px] pt-[2px] text-[14px] font-light text-[#2f2f2f] shadow-[2px_3px_4px_rgba(0,0,0,0.18)] outline-none transition placeholder:text-[#a7a7a7] focus:border-[#f0b000] focus:shadow-[0_0_0_3px_rgba(245,185,0,0.18),2px_3px_4px_rgba(0,0,0,0.18)]"
      />
    </div>
  );
}