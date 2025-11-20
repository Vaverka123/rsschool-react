import { FC } from 'react';
import Button from '../button/Button';

interface SelectedCardsMenuProps {
  selected: number;
  removeAll: () => void;
  download: () => void;
}

const SelectedCardsMenu: FC<SelectedCardsMenuProps> = ({
  selected,
  removeAll,
  download,
}) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-zinc-900 opacity-100 p-4 shadow-lg">
      <h2 className="text-lg font-semibold text-white text-center">
        {selected} items are selected
      </h2>
      <div className="flex justify-center gap-4 mt-2">
        <Button onClick={removeAll}>Unselect all</Button>
        <Button onClick={download}>Download</Button>
      </div>
    </div>
  );
};

export default SelectedCardsMenu;
