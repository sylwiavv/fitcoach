import React from 'react';

type ComparisonModalProps = {
  isOpen: boolean;
  onClose: () => void;
  clientA: { name: string; progress: number } | null;
  clientB: { name: string; progress: number } | null;
};

const ComparisonModal: React.FC<ComparisonModalProps> = ({ isOpen, onClose, clientA, clientB }) => {
  if (!isOpen || !clientA || !clientB) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-xl w-96">
        <h2 className="text-xl font-bold mb-4">Porównanie klientów</h2>
        <div className="flex justify-between mb-4">
          <div>
            <p className="font-semibold">{clientA.name}</p>
            <p>Postęp: {clientA.progress}%</p>
          </div>
          <div>
            <p className="font-semibold">{clientB.name}</p>
            <p>Postęp: {clientB.progress}%</p>
          </div>
        </div>
        <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={onClose}>
          Zamknij
        </button>
      </div>
    </div>
  );
};

export default ComparisonModal;
