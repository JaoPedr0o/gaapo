type CampoAreaTextoEventoProps = {
  id: string;
  label: string;
  valor: string;
  placeholder: string;
  onChange: (valor: string) => void;
};

export default function CampoAreaTextoEvento({
  id,
  label,
  valor,
  placeholder,
  onChange,
}: CampoAreaTextoEventoProps) {
  return (
    <div className="relative w-full">
      <label
        htmlFor={id}
        className="absolute -top-[10px] left-[13px] bg-white px-2 text-[12px] font-light text-[#252525]"
      >
        {label}
      </label>

      <textarea
        id={id}
        name={id}
        value={valor}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        className="h-[82px] w-full resize-none rounded-[8px] border border-[#52c4d7] bg-white px-4 py-5 text-[13px] font-light text-[#252525] shadow-[1px_2px_3px_rgba(0,0,0,0.15)] outline-none placeholder:text-[#9d9d9d] focus:border-[#40b8cc] focus:ring-2 focus:ring-[#52c4d7]/30"
      />
    </div>
  );
}