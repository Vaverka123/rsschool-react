import Input from './components/input/Input';
import Button from './components/button/Button';
import CharacterCard from './components/characterCard/CharacterCard';
import type { Character } from './types/Character';

const sampleCharacter: Character = {
  fullname: 'Harry Potter',
  nickname: 'The Boy Who Lived',
  hogwartsHouse: 'Gryffindor',
  image:
    'https://raw.githubusercontent.com/fedeperin/potterapi/main/public/images/characters/harry_potter.png',
  birthDate: 'Jul 31, 1980',
};

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6 space-y-6">
      <h1 className="mt-5 text-3xl font-bold text-center text-blue-700">
        Search for your favorite Hogwarts character to learn more about them!
      </h1>

      <div className="flex items-center space-x-9 max-w-md mx-auto">
        <Input
          placeholder="Enter name or something alike...
        "
        />
        <Button>Search</Button>
      </div>
      <div className="flex flex-wrap gap-6 mx-auto py-6">
        <CharacterCard character={sampleCharacter} />
        <CharacterCard character={sampleCharacter} />
        <CharacterCard character={sampleCharacter} />
        <CharacterCard character={sampleCharacter} />
        <CharacterCard character={sampleCharacter} />
        <CharacterCard character={sampleCharacter} />
        <CharacterCard character={sampleCharacter} />
        <CharacterCard character={sampleCharacter} />
      </div>

      <Button>Error Button</Button>
    </div>
  );
};

export default App;
