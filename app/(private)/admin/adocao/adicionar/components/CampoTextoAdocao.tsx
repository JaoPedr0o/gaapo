type CampoTextoAdocaoProps = {
    id: string;
    label: string;
    valor: string;
    placeholder: string;
    tipo?: "text" | "number";
    largura?: string;
    onChange: (valor: string) => void;
};

export default function CampoTextoAdocao({
    id,
    label,
    valor,
    placeholder,
    tipo = "text",
    largura = "w-full",
    onChange,
}: CampoTextoAdocaoProps) {
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
                className="h-[48px] w-full rounded-[8px] border border-[#f6a6bd] bg-white px-4 text-[13px] font-light text-[#252525] shadow-[1px_2px_3px_rgba(0,0,0,0.15)] outline-none placeholder:text-[#9d9d9d] focus:border-[#f58fab] focus:ring-2 focus:ring-[#f6a6bd]/30"
            />
        </div>
    );
}