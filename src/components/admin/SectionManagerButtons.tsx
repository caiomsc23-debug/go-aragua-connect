import { useState } from "react";
import { SectionEditModal } from "./SectionEditModal";

const sections = [
  { key: "empresas", title: "EMPRESAS" },
  { key: "qualificacao", title: "QUALIFICAÇÃO" },
  { key: "autonomo", title: "AUTÔNOMO" },
  { key: "precisa_servico", title: "PRECISA DE SERVIÇO?" },
];

export const SectionManagerButtons = () => {
  const [openModal, setOpenModal] = useState<string | null>(null);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {sections.map((section) => (
          <button
            key={section.key}
            onClick={() => setOpenModal(section.key)}
            className="bg-[#FF6B00] hover:bg-[#E56000] text-white font-bold text-xl uppercase py-6 px-8 rounded-2xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
          >
            {section.title}
          </button>
        ))}
      </div>

      {sections.map((section) => (
        <SectionEditModal
          key={section.key}
          isOpen={openModal === section.key}
          onClose={() => setOpenModal(null)}
          sectionKey={section.key}
          sectionTitle={section.title}
        />
      ))}
    </>
  );
};
