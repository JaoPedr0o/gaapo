type OpcaoSelectAdocao = {
    label: string;
    valor: string;
};

type CampoSelectAdocaoProps = {
    id: string;
    label: string;
    valor: string;
    opcoes: OpcaoSelectAdocao[];
    largura?: string;
    onChange: (valor: string) => void;
};

export default function CampoSelectAdocao({
    id,
    label,
    valor,
    opcoes,
    largura = "w-full",
    onChange,
}: CampoSelectAdocaoProps) {
    return (
        <div className={`relative ${largura}`}>
            <label
                htmlFor={id}
                className="absolute -top-[10px] left-[13px] bg-white px-2 text-[12px] font-light text-[#252525]"
            >
                {label}
            </label>

            <select
                id={id}
                name={id}
                value={valor}
                onChange={(event) => onChange(event.target.value)}
                className="h-[39px] w-full appearance-none rounded-[8px] border border-[#f6a6bd] bg-white px-4 text-[13px] font-light text-[#252525] shadow-[1px_2px_3px_rgba(0,0,0,0.15)] outline-none focus:border-[#f58fab] focus:ring-2 focus:ring-[#f6a6bd]/30"
            >
                <option value="">Selecione</option>

                {opcoes.map((opcao) => (
                    <option key={opcao.valor} value={opcao.valor}>
                        {opcao.label}
                    </option>
                ))}
            </select>

            <span className="pointer-events-none absolute right-[12px] top-[11px] text-[14px] text-[#9d9d9d]">
                ˅
            </span>
        </div>
    );
}